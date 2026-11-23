import React, { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Particle items: combination of soft pink petals and golden shimmer dust
    const PARTICLE_COUNT = Math.min(32, Math.floor((width * height) / 30000));
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 5,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.45 + 0.25,
        isGoldDust: Math.random() > 0.6,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.wobble += 0.02;
        p.x += Math.sin(p.wobble) * 0.5 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.isGoldDust) {
          // Golden sparkle star / dot
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 185, 114, ${p.opacity * 0.8})`;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
          ctx.shadowBlur = 6;
          ctx.fill();
        } else {
          // Romantic soft blush rose petal shape
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size, -p.size * 0.8, p.size * 1.2, p.size * 0.5, 0, p.size * 1.4);
          ctx.bezierCurveTo(-p.size * 1.2, p.size * 0.5, -p.size, -p.size * 0.8, 0, 0);
          ctx.fillStyle = `rgba(242, 195, 195, ${p.opacity * 0.65})`;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ambient-canvas"
      aria-hidden="true"
    />
  );
}

