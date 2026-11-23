import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../../weddingData';

export default function FinaleSection({ onReplay }) {
  const triggerConfettiBlast = () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FCEEE9', '#E5C378', '#FF9999', '#FFF7D6'],
    });
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#D4AF37', '#E5C378', '#FFC0CB'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#D4AF37', '#E5C378', '#FFC0CB'],
      });
    }, 250);
  };

  return (
    <div className="section-scroll-content">
      <div className="chapter-crest-wrap">
        <span className="sub-flourish">Duaon Aur Pyar Ke Sath</span>
      </div>

      <h2 className="section-title">
        <span className="title-pre">Tumhara Intezaar Rahega</span>
        <span className="title-main">With All My Love ❤️</span>
      </h2>

      {/* Romantic handwritten style card note (NO generic AI/barcode badges) */}
      <div className="finale-love-card">
        <div className="finale-heart-crest">
          <Heart size={28} className="fill-blush text-blush" />
        </div>
        
        <h3 className="finale-recipient-name">Meri Pyaari Hadia Noor</h3>
        
        <p className="finale-letter-body">
          "Yeh shaadi toh ek shuruwaat hai... Asal khushi aur intezaar toh mujhe uss din ka hai jab tum Ahmed ke ghar meri dulhan ban kar aogi. Tumhari hansi, tumhari muskurahat, aur tumhara sath meri zindagi ka sab se bara tohfa hai."
        </p>

        <div className="finale-promise-line">
          <span>Ahmed hamesha tumhara hai aur rahega. ❤️💍</span>
        </div>
      </div>

      {/* Signature Section */}
      <div className="signature-box">
        <p className="sig-pre">Aapke aane ke muntazir,</p>
        <div className="signature-text">
          <span className="sig-name">Ahmed</span>
          <span className="sig-amp">&</span>
          <span className="sig-name">Hadia</span>
        </div>
        <p className="family-note">Along with Ayesha Sadiqa & Muhammad Faizan</p>
      </div>

      {/* Interactive Celebration Buttons */}
      <div className="finale-actions-grid">
        <button
          onClick={triggerConfettiBlast}
          className="gold-cta-btn celebratory-btn"
        >
          <span className="btn-emoji">🌸</span>
          <span>Phool Aur Confetti Barsayein</span>
        </button>

        <button onClick={onReplay} className="secondary-gold-btn replay-experience-btn">
          <RotateCcw size={16} />
          <span>Shuru Se Dobara Kholiye</span>
        </button>
      </div>

      <div className="footer-blessing">
        <p>Allah hum dono ko hamesha khush aur sath rakhay. Ameen. ❤️</p>
      </div>
    </div>
  );
}
