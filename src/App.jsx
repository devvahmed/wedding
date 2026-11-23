import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AmbientBackground from './components/AmbientBackground';
import AudioPlayer from './components/AudioPlayer';
import EnvelopeStage from './components/EnvelopeStage';
import CardStage from './components/CardStage';
import VideoModal from './components/VideoModal';

export default function App() {
  const [stage, setStage] = useState('envelope'); // 'envelope' | 'card'
  const [hasStartedAudio, setHasStartedAudio] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setHasStartedAudio(true);
    setStage('card');
  };

  const handleReplay = () => {
    console.log('HANDLE REPLAY CALLED IN APP');
    setStage('envelope');
  };

  return (
    <div className="royal-app-wrapper">
      {/* 60fps Ambient Rose Petals & Golden Shimmer */}
      <AmbientBackground />

      {/* Floating Audio Controls */}
      <AudioPlayer autoPlayTrigger={hasStartedAudio} />

      {/* Main Experience Router */}
      <main id="app-container">
        {stage === 'envelope' ? (
          <EnvelopeStage key="envelope" onOpen={handleOpenEnvelope} />
        ) : (
          <CardStage
            key="card"
            onReplay={handleReplay}
            onOpenVideo={() => setIsVideoModalOpen(true)}
          />
        )}
      </main>

      {/* Video Reel Modal (HV5.mp4) */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
}

