import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Play, ChevronRight, Film } from 'lucide-react';
import { weddingData } from '../../weddingData';

export default function DateScenesSection({ onNext }) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const currentScene = weddingData.dateScenes[activeSceneIndex];
  const videoRef = useRef(null);

  const handleSceneChange = (idx) => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveSceneIndex(idx);
  };

  return (
    <div className="section-scroll-content">
      <div className="chapter-crest-wrap">
        <span className="sub-flourish">Faizan & Hadia Ka Safar</span>
      </div>

      <h2 className="section-title">
        <span className="title-pre">Humari Khaas Yaadein</span>
        <span className="title-main">{currentScene.title}</span>
      </h2>

      {/* Scene Selector Stepper */}
      <div className="scene-tabs-bar" role="tablist">
        {weddingData.dateScenes.map((scene, i) => (
          <button
            key={scene.id}
            onClick={() => handleSceneChange(i)}
            className={`scene-tab-pill ${activeSceneIndex === i ? 'active' : ''}`}
            role="tab"
            aria-selected={activeSceneIndex === i}
          >
            {i === 0 && '❤️ First Date'}
            {i === 1 && '🎬 Second Date'}
            {i === 2 && '🌹 Red Dress Scene'}
          </button>
        ))}
      </div>

      {/* Main Scene Display Area */}
      <div className="scene-display-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            className="scene-media-card"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="scene-media-frame">
              {currentScene.type === 'image' ? (
                <img
                  src={currentScene.src}
                  alt={currentScene.title}
                  className="scene-image-element"
                  onError={(e) => {
                    e.currentTarget.src = 'assets/H1.jpeg';
                  }}
                />
              ) : (
                <div className="scene-video-wrapper">
                  <video
                    ref={videoRef}
                    key={currentScene.src}
                    src={currentScene.src}
                    controls
                    playsInline
                    preload="metadata"
                    className="scene-video-element"
                  >
                    Your browser does not support video playback.
                  </video>
                </div>
              )}

              <div className="scene-tag-badge">
                <Sparkles size={12} className="text-gold mr-1" />
                <span>{currentScene.tag}</span>
              </div>
            </div>

            {/* Scene Story Note */}
            <div className="scene-story-box">
              <p className="scene-story-text">"{currentScene.story}"</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next Card CTA */}
      <div className="section-bottom-action">
        <button className="gold-cta-btn" onClick={onNext}>
          <span>Agla Card Paltein</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

