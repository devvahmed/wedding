import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import WelcomeSection from './sections/WelcomeSection';
import BrideSection from './sections/BrideSection';
import ScratchGameSection from './sections/ScratchGameSection';
import DateScenesSection from './sections/DateScenesSection';
import NikkahGameSection from './sections/NikkahGameSection';
import DetailsSection from './sections/DetailsSection';
import MemoriesSection from './sections/MemoriesSection';
import FinaleSection from './sections/FinaleSection';

export default function CardStage({ onReplay, onOpenVideo }) {
  const [activeSection, setActiveSection] = useState(0);
  const [direction, setDirection] = useState(1);

  const cardTitles = [
    "Faizan Ka Paighaam",
    "Dulhan Ayesha Sadiqa",
    "Hadia Ka Surprise",
    "Humari Dates & Videos",
    "Nikkah Promise Game",
    "Shaadi Ki Details",
    "Humari Yaadein & RSVP",
    "Forever Love"
  ];

  const TOTAL_SECTIONS = cardTitles.length;

  const goToSection = (index) => {
    if (index === activeSection) return;
    setDirection(index > activeSection ? 1 : -1);
    setActiveSection(index);
  };

  const handlePrev = () => {
    if (activeSection > 0) {
      setDirection(-1);
      setActiveSection((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeSection < TOTAL_SECTIONS - 1) {
      setDirection(1);
      setActiveSection((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  // Framer motion variants for physical card slide & lift turn
  const pageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 35 : -35,
      opacity: 0,
      rotateY: dir > 0 ? 8 : -8,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1], // easeOutQuart for ultra buttery feel
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -35 : 35,
      opacity: 0,
      rotateY: dir > 0 ? -8 : 8,
      scale: 0.97,
      transition: {
        duration: 0.3,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <motion.div
      className="card-stage"
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Physical Card Stacking illusion layers in the background */}
      <div className="card-stack-back-layer card-stack-layer-2" aria-hidden="true" />
      <div className="card-stack-back-layer card-stack-layer-1" aria-hidden="true" />

      {/* Main Luxury Physical Card Shell */}
      <div className="invitation-card-shell">
        {/* Real Card Spine crease on left edge */}
        <div className="card-book-spine" aria-hidden="true" />

        {/* Ornate Gold Corner SVGs */}
        <div className="card-corner corner-tl" aria-hidden="true">
          <svg viewBox="0 0 40 40">
            <path d="M2,38 L2,10 A8,8 0 0,1 10,2 L38,2" fill="none" stroke="#D4AF37" strokeWidth="2" />
            <circle cx="10" cy="10" r="3" fill="#D4AF37" />
          </svg>
        </div>
        <div className="card-corner corner-tr" aria-hidden="true">
          <svg viewBox="0 0 40 40">
            <path d="M38,38 L38,10 A8,8 0 0,0 30,2 L2,2" fill="none" stroke="#D4AF37" strokeWidth="2" />
            <circle cx="30" cy="10" r="3" fill="#D4AF37" />
          </svg>
        </div>
        <div className="card-corner corner-bl" aria-hidden="true">
          <svg viewBox="0 0 40 40">
            <path d="M2,2 L2,30 A8,8 0 0,0 10,38 L38,38" fill="none" stroke="#D4AF37" strokeWidth="2" />
            <circle cx="10" cy="30" r="3" fill="#D4AF37" />
          </svg>
        </div>
        <div className="card-corner corner-br" aria-hidden="true">
          <svg viewBox="0 0 40 40">
            <path d="M38,2 L38,30 A8,8 0 0,1 30,38 L2,38" fill="none" stroke="#D4AF37" strokeWidth="2" />
            <circle cx="30" cy="30" r="3" fill="#D4AF37" />
          </svg>
        </div>

        {/* Real Physical Card Header (NO generic AI badges) */}
        <header className="card-top-nav">
          <div className="card-deck-indicator">
            <Layers size={13} className="text-gold mr-1" />
            <span className="deck-text">Card {activeSection + 1} of {TOTAL_SECTIONS}</span>
          </div>

          <div className="card-topic-title">
            <span>{cardTitles[activeSection]}</span>
          </div>

          {/* Dots Indicator */}
          <div className="dots-container" role="tablist" aria-label="Invitation cards">
            {cardTitles.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSection(idx)}
                className={`dot-btn ${activeSection === idx ? 'active' : ''}`}
                role="tab"
                aria-selected={activeSection === idx}
                aria-label={`Go to card ${idx + 1}`}
              />
            ))}
          </div>
        </header>

        {/* Animated Main Section Viewport with 3D Page Turn */}
        <div className="card-sections-viewport">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeSection}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="card-page-motion-wrapper"
              style={{ perspective: 1200 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -100 || offset.x < -60) handleNext();
                else if (swipe > 100 || offset.x > 60) handlePrev();
              }}
            >
              {activeSection === 0 && <WelcomeSection onNext={() => goToSection(1)} />}
              {activeSection === 1 && <BrideSection onNext={() => goToSection(2)} />}
              {activeSection === 2 && <ScratchGameSection onNext={() => goToSection(3)} />}
              {activeSection === 3 && <DateScenesSection onNext={() => goToSection(4)} />}
              {activeSection === 4 && <NikkahGameSection onNext={() => goToSection(5)} />}
              {activeSection === 5 && <DetailsSection onNext={() => goToSection(6)} />}
              {activeSection === 6 && <MemoriesSection onNext={() => goToSection(7)} />}
              {activeSection === 7 && <FinaleSection onReplay={onReplay} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Side Arrow Navigation */}
        {activeSection > 0 && (
          <button
            onClick={handlePrev}
            className="nav-arrow nav-arrow-prev"
            aria-label="Pichla Card"
            title="Pichla Card (Left arrow)"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {activeSection < TOTAL_SECTIONS - 1 && (
          <button
            onClick={handleNext}
            className="nav-arrow nav-arrow-next"
            aria-label="Agla Card"
            title="Agla Card (Right arrow)"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
