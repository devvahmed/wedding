import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Video, Sparkles, ChevronRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../../weddingData';

export default function ScratchGameSection({ onNext }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawingRef = useRef(false);
  const scratchCounterRef = useRef(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width || 280;
    const height = rect.height || 310;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    ctx.globalCompositeOperation = 'source-over';

    // Rich luxury champagne gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#E8C779');
    grad.addColorStop(0.25, '#D4AF37');
    grad.addColorStop(0.5, '#F9E4A9');
    grad.addColorStop(0.75, '#C59B27');
    grad.addColorStop(1, '#DDB856');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle gold glitter specks
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 1, 0, Math.PI * 2);
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(180, 130, 20, 0.3)';
      ctx.fill();
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.fillStyle = '#6E4E10';
    ctx.font = 'bold 15px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ SCRATCH KARO HADIA ✨', width / 2, height / 2 - 12);

    ctx.fillStyle = '#8B6A26';
    ctx.font = 'italic 13px "Cormorant Garamond", serif';
    ctx.fillText('Ungli se rub kar ke surprise kholiye', width / 2, height / 2 + 14);

    setIsScratched(false);
    setScratchPercent(0);
  }, []);

  useEffect(() => {
    initCanvas();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const preventDefaultTouch = (e) => {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
    };

    canvas.addEventListener('touchstart', preventDefaultTouch, { passive: false });
    canvas.addEventListener('touchmove', preventDefaultTouch, { passive: false });
    canvas.addEventListener('touchend', preventDefaultTouch, { passive: false });

    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => {
      canvas.removeEventListener('touchstart', preventDefaultTouch);
      canvas.removeEventListener('touchmove', preventDefaultTouch);
      canvas.removeEventListener('touchend', preventDefaultTouch);
      window.removeEventListener('resize', handleResize);
    };
  }, [initCanvas]);

  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentPixels = 0;
      const totalSampledPixels = pixels.length / 16;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) transparentPixels++;
      }

      const percent = Math.round((transparentPixels / totalSampledPixels) * 100);
      setScratchPercent(Math.min(100, percent));

      if (percent >= 50 && !isScratched) {
        triggerSuccessReveal();
      }
    } catch (e) {}
  }, [isScratched]);

  const triggerSuccessReveal = () => {
    setIsScratched(true);
    setScratchPercent(100);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FCEEE9', '#E5C378', '#FF7F7F', '#FFFFFF'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#D4AF37', '#FF708F'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#D4AF37', '#FF708F'],
        });
      }, 250);
    } catch (err) {}
  };

  const scratchAtPoint = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26 * dpr, 0, Math.PI * 2);
    ctx.fill();

    scratchCounterRef.current += 1;
    if (scratchCounterRef.current % 10 === 0) {
      checkScratchPercentage();
    }
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDrawingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}
    scratchAtPoint(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    if (!isDrawingRef.current) return;
    scratchAtPoint(e.clientX, e.clientY);
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    isDrawingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}
    checkScratchPercentage();
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();
    if (e.touches && e.touches[0]) {
      isDrawingRef.current = true;
      scratchAtPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
    if (!isDrawingRef.current) return;
    if (e.touches && e.touches[0]) {
      scratchAtPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    isDrawingRef.current = false;
    checkScratchPercentage();
  };

  return (
    <div className="section-scroll-content">
      <div className="chapter-crest-wrap">
        <span className="sub-flourish">Secret Surprise</span>
      </div>

      <h2 className="section-title">
        <span className="title-pre">A Surprise For You</span>
        <span className="title-main">Scratch For Hadia Noor</span>
      </h2>

      <p className="scratch-instruction-text">
        Gold foil par ungli rub kar ke apna secret photo surprise kholiye!
      </p>

      {/* Scratch Frame Container */}
      <div className="scratch-game-card">
        <div className="scratch-frame-wrap" ref={containerRef}>
          <div className="scratch-underlay">
            <img
              src={weddingData.guest.heroPhoto}
              alt="Revealed Hadia Noor"
              className="scratch-reveal-img"
              onError={(e) => {
                e.currentTarget.src = 'assets/H1.jpeg';
              }}
            />
            <div className="scratch-underlay-overlay">
              <span className="guest-star-pill">❤️ Meri Hadia Noor ❤️</span>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            className={`scratch-canvas ${isScratched ? 'scratched-done' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            aria-label="Gold scratch layer"
          />

          {isScratched && (
            <motion.div
              className="scratch-success-overlay"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="success-banner">
                <span className="success-icon">💍</span>
                <h3 className="success-title">Surprise Revealed!</h3>
                <p className="success-desc">
                  Meri Hadia! Tum Ahmed ki zindagi ki sab se haseen dua ho. Yeh mehfil tumhare baghair bilkul adhuri hai!
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Scratch Progress Bar */}
        <div className="scratch-progress-wrap">
          <div className="progress-bar-track">
            <motion.div
              className="progress-bar-fill"
              animate={{ width: `${scratchPercent}%` }}
              transition={{ ease: 'easeOut', duration: 0.2 }}
            />
          </div>
          <div className="progress-labels">
            <span className="progress-text">Revealed: {scratchPercent}%</span>
            <span className="scratch-target-hint">50% par auto-reveal ✨</span>
          </div>
        </div>

        {/* Reset button */}
        <div className="scratch-action-row">
          <button onClick={initCanvas} className="secondary-gold-btn" title="Reset foil and scratch again">
            <RotateCcw size={15} />
            <span>Dobara Scratch Karein</span>
          </button>
        </div>
      </div>

      {/* Next CTA to Date Scenes & Videos */}
      <div className="section-bottom-action">
        <button className="gold-cta-btn" onClick={onNext}>
          <span>Humari Dates & Videos Dekhein</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
