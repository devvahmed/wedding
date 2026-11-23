import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { weddingData } from '../weddingData';

export default function EnvelopeStage({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <motion.div
      className="envelope-stage"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Intro Salutation in natural Roman Urdu */}
      <div className="intro-heading-wrap">
        <motion.div
          className="romantic-top-flourish"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="flourish-heart-tag">Faizan Ki Taraf Se ❤️</span>
        </motion.div>

        <motion.h1
          className="intro-title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          A Special Wedding Invitation
        </motion.h1>

        <motion.p
          className="intro-for-guest"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Sirf Meri <span className="highlight-guest">{weddingData.guest.name}</span> Ke Liye
        </motion.p>
      </div>

      {/* 3D Physical Sealed Envelope */}
      <div className="envelope-outer">
        <motion.div
          className="envelope-shadow"
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.32, 0.42, 0.32],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="envelope"
          animate={
            isOpening
              ? { y: 20, transition: { duration: 0.5 } }
              : {
                  y: [0, -6, 0],
                  transition: {
                    duration: 3.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
          }
          onClick={handleEnvelopeClick}
          role="button"
          tabIndex={0}
          aria-label="Tap to open your wedding invitation envelope"
        >
          <div className="envelope-back" />

          {/* Letter Card Insert that slides out upon opening */}
          <motion.div
            className="envelope-card-insert"
            animate={
              isOpening
                ? {
                    y: -140,
                    scale: 1.04,
                    opacity: 1,
                    transition: { duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                  }
                : { y: 0, opacity: 0.95 }
            }
          >
            <div className="insert-ornament-header">
              <span className="insert-hearts">❤️ ✨ ❤️</span>
              <h3>Wedding Invitation</h3>
              <p className="insert-recipient">Sirf Hadia Ke Liye</p>
            </div>
            <div className="insert-seal-preview">
              <Sparkles size={16} className="text-gold" />
            </div>
          </motion.div>

          <div className="envelope-flap-left" />
          <div className="envelope-flap-right" />
          <div className="envelope-pocket" />

          {/* 3D Top Flap with realistic fold */}
          <motion.div
            className="envelope-flap-top"
            style={{ transformOrigin: 'top center' }}
            animate={
              isOpening
                ? {
                    rotateX: 180,
                    zIndex: 0,
                    transition: { duration: 0.6, ease: 'easeInOut' },
                  }
                : { rotateX: 0 }
            }
          >
            <div className="flap-triangle" />
          </motion.div>

          {/* Wax Seal */}
          <motion.div
            className="wax-seal"
            animate={
              isOpening
                ? {
                    scale: [1, 1.25, 0],
                    opacity: [1, 1, 0],
                    rotate: [0, 15, 30],
                    transition: { duration: 0.45 },
                  }
                : {
                    scale: [1, 1.06, 1],
                    transition: {
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }
            }
          >
            <div className="wax-glow" />
            <div className="wax-inner">
              <svg className="seal-crest-svg" viewBox="0 0 50 50" width="38" height="38">
                <circle cx="25" cy="25" r="21" stroke="#FCE79A" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
                <circle cx="25" cy="25" r="17" fill="#8E141D" />
                <text x="25" y="30" fontFamily="'Great Vibes', cursive" fontSize="20" fill="#FCE79A" textAnchor="middle">
                  F&H
                </text>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gentle action hint */}
      <motion.div
        className="envelope-action-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Sparkles size={16} className="text-gold" />
        <p className="pulse-text">Wax seal par tap kar ke card kholiye</p>
      </motion.div>
    </motion.div>
  );
}
