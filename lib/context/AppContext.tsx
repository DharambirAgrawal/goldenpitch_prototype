'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppState, Settings, DetectionEvent, ConnectionStatus, DetectionStatus } from '../types';
import { generateMockDetection } from '../data/mockData';

interface AppContextType extends AppState {
  updateSettings: (settings: Partial<Settings>) => void;
  toggleConnection: () => void;
  toggleDetection: () => void;
  clearRecentDetections: () => void;
  speakText: (text: string) => void;
}

const defaultSettings: Settings = {
  mode: 'home',
  audioFeedback: true,
  vibrationFeedback: true,
  visualIndicator: true,
  textToSpeech: true,
  fontSize: 'medium',
  highContrast: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>('idle');
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [currentDetection, setCurrentDetection] = useState<DetectionEvent | null>(null);
  const [recentDetections, setRecentDetections] = useState<DetectionEvent[]>([]);

  // Text-to-speech function
  const speakText = useCallback((text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && settings.textToSpeech) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  }, [settings.textToSpeech]);

  // Update settings
  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Toggle connection
  const toggleConnection = useCallback(() => {
    if (connectionStatus === 'disconnected') {
      setConnectionStatus('connecting');
      speakText('Connecting to device');
      setTimeout(() => {
        setConnectionStatus('connected');
        speakText('Device connected');
      }, 2000);
    } else if (connectionStatus === 'connected') {
      setConnectionStatus('disconnected');
      setDetectionStatus('idle');
      speakText('Device disconnected');
    }
  }, [connectionStatus, speakText]);

  // Toggle detection
  const toggleDetection = useCallback(() => {
    if (connectionStatus !== 'connected') {
      speakText('Please connect device first');
      return;
    }

    if (detectionStatus === 'idle') {
      setDetectionStatus('active');
      speakText(`Detection started in ${settings.mode} mode`);
    } else {
      setDetectionStatus('idle');
      setCurrentDetection(null);
      speakText('Detection stopped');
    }
  }, [connectionStatus, detectionStatus, settings.mode, speakText]);

  // Clear recent detections
  const clearRecentDetections = useCallback(() => {
    setRecentDetections([]);
  }, []);

  // Simulate detection events when active
  useEffect(() => {
    if (detectionStatus === 'active' && connectionStatus === 'connected') {
      const interval = setInterval(() => {
        // Random chance of detection (30% per interval)
        if (Math.random() < 0.3) {
          const detection = generateMockDetection(settings.mode);
          setCurrentDetection(detection);
          setRecentDetections(prev => [detection, ...prev].slice(0, 10));

          // Provide feedback
          if (settings.textToSpeech) {
            speakText(`Obstacle detected ${detection.direction}, ${Math.round(detection.distance)} meters`);
          }

          // Play beep sound
          if (settings.audioFeedback && typeof window !== 'undefined') {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.value = 0.3;
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
          }

          // Trigger vibration
          if (settings.vibrationFeedback && typeof window !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(200);
          }

          // Clear current detection after 2 seconds
          setTimeout(() => {
            setCurrentDetection(null);
          }, 2000);
        }
      }, 3000); // Check every 3 seconds

      return () => clearInterval(interval);
    }
  }, [detectionStatus, connectionStatus, settings, speakText]);

  // Apply high contrast mode
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (settings.highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    }
  }, [settings.highContrast]);

  // Apply font size
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('font-small', 'font-medium', 'font-large');
      document.documentElement.classList.add(`font-${settings.fontSize}`);
    }
  }, [settings.fontSize]);

  const value: AppContextType = {
    connectionStatus,
    detectionStatus,
    settings,
    currentDetection,
    recentDetections,
    updateSettings,
    toggleConnection,
    toggleDetection,
    clearRecentDetections,
    speakText,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
