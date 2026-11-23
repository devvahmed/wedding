import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Film } from 'lucide-react';
import { weddingData } from '../weddingData';

export default function VideoModal({ isOpen, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="custom-modal" role="dialog" aria-modal="true">
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="modal-dialog"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="modal-header">
            <div className="modal-title-group">
              <Film size={18} className="text-gold mr-2" />
              <h3 className="modal-title">{weddingData.videoReel.title}</h3>
            </div>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close video reel">
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="video-container">
              <video
                ref={videoRef}
                controls
                playsInline
                autoPlay
                preload="metadata"
                className="modal-video-element"
              >
                <source src={weddingData.videoReel.source} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>
          </div>

          <div className="modal-footer">
            <p className="modal-caption">{weddingData.videoReel.description}</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

