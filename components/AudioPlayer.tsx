'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  text: string;
  label?: string;
  autoPlay?: boolean;
}

export default function AudioPlayer({ text, label = 'Play audio', autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      if (!isPlaying) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      }
    }
  };

  return (
    <motion.button
      onClick={speak}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isPlaying
          ? 'bg-green-600 text-white focus:ring-green-500'
          : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
      }`}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Stop audio' : label}
      aria-pressed={isPlaying}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-5 h-5" aria-hidden="true" />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5" aria-hidden="true" />
          <span>Hear Summary</span>
        </>
      )}
    </motion.button>
  );
}
