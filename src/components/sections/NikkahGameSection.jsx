import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../../weddingData';

export default function NikkahGameSection({ onNext }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelect = (answerKey) => {
    setSelectedAnswer(answerKey);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E89898', '#D4AF37', '#FF708F', '#FFFFFF', '#FCEEE9'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#D4AF37', '#FF708F'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#D4AF37', '#FF708F'],
        });
      }, 300);
    } catch (e) {}
  };

  return (
    <div className="section-scroll-content">
      <div className="chapter-crest-wrap">
        <span className="sub-flourish">Dil Ki Baat • Ahmed & Hadia</span>
      </div>

      <h2 className="section-title">
        <span className="title-pre">Ek Pyaara Sawaal</span>
        <span className="title-main">Will You Say "Qubool Hai"?</span>
      </h2>

      {/* Romantic Question Box */}
      <div className="nikkah-game-card">
        <div className="nikkah-ring-icon">
          <span className="glowing-ring">💍</span>
        </div>

        <p className="nikkah-question-text">
          "Hadia, aaj hum Faizan aur Ayesha ki shaadi ki khushiyan mana rahe hain... Lekin meri har dua tumse shuru hoti hai. In shaa Allah bohot jald humara apna Nikkah hoga! <strong>Will you be Ahmed's forever bride?</strong>"
        </p>

        {/* Interactive Choice Buttons */}
        {!selectedAnswer ? (
          <div className="nikkah-choices-wrap">
            <button
              onClick={() => handleSelect('yes')}
              className="nikkah-choice-btn btn-choice-heart"
            >
              <Heart size={18} className="fill-blush text-blush" />
              <span>Hazaar Baar Qubool Hai! ❤️</span>
            </button>

            <button
              onClick={() => handleSelect('nakhray')}
              className="nikkah-choice-btn btn-choice-nakhray"
            >
              <Sparkles size={18} className="text-gold" />
              <span>Haan, Lekin Saari Umar Nakhray Uthanay Hon Gay 🙈</span>
            </button>
          </div>
        ) : (
          /* Revealed Romantic Nikkah Promise Certificate */
          <AnimatePresence>
            <motion.div
              className="nikkah-certificate"
              initial={{ scale: 0.88, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 18 }}
            >
              <div className="cert-seal">
                <CheckCircle2 size={24} className="text-gold" />
              </div>

              <span className="cert-subtitle">Forever Promise</span>
              <h3 className="cert-title">Nikkah Promise Locked! 💍</h3>

              <div className="cert-names">
                <span className="cert-name-groom">Muhammad Ahmed</span>
                <span className="cert-amp">&</span>
                <span className="cert-name-bride">Hadia Noor</span>
              </div>

              <p className="cert-vow">
                "Wada raha Hadia, Ahmed ka har nakhra sar ankhon par aur har qadam par be-inteha mohabbat. Agli baari humari hogi In Shaa Allah!"
              </p>

              <div className="cert-badge">
                <span>❤️ Officially Locked Forever In Shaa Allah ❤️</span>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Next CTA to Wedding Details */}
      <div className="section-bottom-action">
        <button className="gold-cta-btn" onClick={onNext}>
          <span>Shaadi Ki Timing & Venue Dekhein</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
