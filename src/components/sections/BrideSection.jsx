import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Sparkles, Heart } from 'lucide-react';
import { weddingData } from '../../weddingData';

export default function BrideSection({ onNext }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const currentPhoto = weddingData.bride.photos[selectedPhotoIndex] || weddingData.bride.fallbackPhoto;

  return (
    <div className="section-scroll-content">
      <div className="chapter-crest-wrap">
        <span className="sub-flourish">The Couple • Ayesha & Faizan</span>
      </div>

      <h2 className="section-title">
        <span className="title-pre">Faizan Ki Dulhan</span>
        <span className="title-main">{weddingData.bride.fullName}</span>
      </h2>

      {/* Main Bride Arch Gallery */}
      <div className="bride-arch-gallery">
        <div className="bride-main-frame">
          <div className="arch-border-accent" />
          
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto}
              src={currentPhoto}
              alt={`${weddingData.bride.name} portrait`}
              className="bride-main-img"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              onError={(e) => {
                e.currentTarget.src = 'assets/A2.jpeg';
              }}
            />
          </AnimatePresence>

          <div className="frame-shimmer" />

          <div className="frame-floating-badge">
            <Sparkles size={13} className="text-gold mr-1" />
            <span>The Beautiful Bride</span>
          </div>
        </div>

        {/* Thumbnail Selector for A2, A3, A4, A5, A6 */}
        <div className="bride-thumbs-strip" role="group" aria-label="Bride portraits gallery">
          {weddingData.bride.photos.map((photoSrc, idx) => (
            <button
              key={photoSrc}
              onClick={() => setSelectedPhotoIndex(idx)}
              className={`thumb-btn ${selectedPhotoIndex === idx ? 'active' : ''}`}
              aria-label={`View photo ${idx + 1}`}
            >
              <img
                src={photoSrc}
                alt={`Bride thumbnail ${idx + 1}`}
                className="thumb-img"
                onError={(e) => {
                  e.currentTarget.src = 'assets/A2.jpeg';
                }}
              />
              {selectedPhotoIndex === idx && <span className="thumb-active-dot" />}
            </button>
          ))}
        </div>
      </div>

      {/* Bride Note in natural Roman Urdu */}
      <div className="bride-love-quote">
        <p className="quote-text">
          "Duaon aur khushiyon bhara naya aaghaz... Hadia, tumhare aane se yeh mehfil aur bhi khoobsurat ho jayegi!"
        </p>
        <div className="couple-union-pill">
          <Heart size={14} className="fill-blush text-blush" />
          <span>Ayesha Sadiqa & Muhammad Faizan</span>
        </div>
      </div>

      {/* Next CTA */}
      <div className="section-bottom-action">
        <button className="gold-cta-btn" onClick={onNext}>
          <span>Hadia Ka Surprise Game</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
