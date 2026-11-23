import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, Sparkles } from 'lucide-react';
import { weddingData } from '../../weddingData';

export default function WelcomeSection({ onNext }) {
  return (
    <div className="section-scroll-content">
      {/* Chapter Crest */}
      <div className="chapter-crest-wrap">
        <span className="sub-flourish">Faizan Ke Dil Se...</span>
      </div>

      {/* Hadia's Portrait with Soft Glowing Halo */}
      <motion.div
        className="guest-hero-avatar-wrap"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 140 }}
      >
        <div className="avatar-ring-glow" />
        <div className="avatar-ring">
          <img
            src={weddingData.guest.heroPhoto}
            alt={weddingData.guest.name}
            className="guest-hero-img"
            onError={(e) => {
              e.currentTarget.src = 'assets/H1.jpeg';
            }}
          />
        </div>
        <div className="avatar-badge">
          <Heart size={13} className="fill-blush text-blush mr-1" />
          <span>Meri Hadia Noor</span>
        </div>
      </motion.div>

      {/* Salutation Title */}
      <h2 className="section-title welcome-heading">
        <span className="title-pre">Welcome Meri Jaan</span>
        <span className="title-main">{weddingData.guest.name} ❤️</span>
      </h2>

      <div className="divider-gold">
        <span>❧</span>
      </div>

      {/* Romantic personal letter from Faizan to Hadia */}
      <div className="personal-message-box">
        <div className="romantic-tag-pill">
          <Sparkles size={13} className="text-gold" />
          <span>Faizan Ka Special Paighaam</span>
        </div>

        <p className="personal-note-text">
          "{weddingData.guest.personalMessage}"
        </p>

        <div className="couple-promise-sub">
          <span>In shaa Allah, agli baari humari hai! 💍</span>
        </div>
      </div>

      {/* Next CTA */}
      <div className="section-bottom-action">
        <button className="gold-cta-btn" onClick={onNext}>
          <span>Dulhan Se Miliye</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
