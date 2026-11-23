import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { weddingData } from '../weddingData';

export default function AudioPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Play audio reliably on user interaction
  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log('Audio autoplay prevented or waiting for interaction:', err);
        });
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      startAudio();
    }
  };

  // Trigger auto-start as soon as user opens the envelope
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      startAudio();
    }
  }, [autoPlayTrigger]);

  return (
    <div className="audio-control-bar">
      {/* HTML5 Audio with both mp3 and webm formats of the YouTube song */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={weddingData.music.localAudio} type="audio/mp3" />
        <source src={weddingData.music.localAudioFallback} type="audio/webm" />
      </audio>

      {/* Floating Vinyl Record Controller */}
      <button
        onClick={toggleMusic}
        className={`audio-disc-btn ${isPlaying ? 'spinning' : ''}`}
        aria-label={isPlaying ? 'Pause wedding song' : 'Play wedding song'}
        title={isPlaying ? 'Pause Romantic Song' : 'Play Romantic Song (YouTube)'}
      >
        <div className="disc-outer">
          <Disc size={20} className="disc-icon" />
          <span className="disc-center-dot"></span>
        </div>

        <div className="audio-text-group">
          <span className="audio-track-title">Playing Song</span>
          <span className="audio-waves" aria-hidden="true">
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </span>
        </div>

        <div className="audio-speaker-icon">
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </div>
      </button>
    </div>
  );
}
