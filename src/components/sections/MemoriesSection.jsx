import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle, Heart } from 'lucide-react';
import { weddingData } from '../../weddingData';

export default function MemoriesSection({ onNext }) {
  const [activeMemoryIdx, setActiveMemoryIdx] = useState(0);

  const memories = weddingData.memories;
  const currentMem = memories[activeMemoryIdx];

  const handlePrev = () => {
    setActiveMemoryIdx((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveMemoryIdx((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };

  const whatsappUrl = `https://wa.me/${weddingData.rsvp.whatsappNumber}?text=${encodeURIComponent(
    weddingData.rsvp.prefilledMessage
  )}`;

  return (
    <div className="section-scroll-content">
      <div className="chapter-crest-wrap">
        <span className="sub-flourish">Khaas Lamhaat</span>
      </div>

      <h2 className="section-title">
        <span className="title-pre">Hadia Ke Sath</span>
        <span className="title-main">Humari Pyaari Yaadein</span>
      </h2>

      <p className="memories-intro">
        Hadia, tumhare sath bitaya hua har ek pal bohot anmol hai:
      </p>

      {/* Swipeable Memory Card Single */}
      <div className="memory-deck-wrapper">
        <div className="memory-deck-stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMem.id}
              className="memory-card-single"
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.4}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -100 || offset.x < -60) handleNext();
                else if (swipe > 100 || offset.x > 60) handlePrev();
              }}
            >
              <div className="mem-img-wrap">
                <img
                  src={currentMem.image}
                  alt={currentMem.title}
                  className="mem-img"
                  onError={(e) => {
                    e.currentTarget.src = 'assets/H1.jpeg';
                  }}
                />
                <span className="mem-badge-tag">{currentMem.title}</span>
              </div>

              <div className="mem-caption">
                <p className="mem-quote">"{currentMem.caption}"</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Memory Navigation Buttons */}
        <div className="memory-controls">
          <button onClick={handlePrev} className="mem-nav-btn" aria-label="Pichli yaad">
            <ChevronLeft size={20} />
          </button>

          <div className="mem-dots">
            {memories.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveMemoryIdx(i)}
                className={`mem-dot ${activeMemoryIdx === i ? 'active' : ''}`}
                aria-label={`Yaad ${i + 1}`}
              />
            ))}
          </div>

          <button onClick={handleNext} className="mem-nav-btn" aria-label="Agli yaad">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Direct RSVP Box */}
      <div className="rsvp-card-box">
        <div className="rsvp-badge">
          <Heart size={14} className="fill-blush text-blush mr-1" />
          <span>Faizan Ko Batayein</span>
        </div>
        <h3 className="rsvp-title">Hadia, kya tum iss shaadi mein aogi?</h3>
        <p className="rsvp-text">Ek tap kar ke Faizan ko WhatsApp par reply karein:</p>

        <div className="rsvp-btn-group">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-cta-btn"
          >
            <MessageCircle size={20} />
            <span>WhatsApp Par Reply Bhejein ❤️</span>
          </a>
        </div>
      </div>

      {/* Next CTA to Finale */}
      <div className="section-bottom-action">
        <button className="gold-cta-btn" onClick={onNext}>
          <span>Aakhri Card Paltein</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
