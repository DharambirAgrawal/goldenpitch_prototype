'use client';

import { Mic, Power, Bluetooth } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import MainButton from '@/components/MainButton';
import StatusIndicator from '@/components/StatusIndicator';
import { motion } from 'framer-motion';

export default function Home() {
  const { 
    connectionStatus, 
    detectionStatus, 
    toggleConnection, 
    toggleDetection,
    speakText,
    recentDetections 
  } = useApp();

  const handleMainAction = () => {
    if (connectionStatus !== 'connected') {
      toggleConnection();
    } else {
      toggleDetection();
    }
  };

  const getMainButtonLabel = () => {
    if (connectionStatus === 'disconnected') return 'Connect Device';
    if (connectionStatus === 'connecting') return 'Connecting...';
    if (detectionStatus === 'active') return 'Stop Detection';
    return 'Start Detection';
  };

  const handleVoiceCommand = () => {
    speakText('Voice commands coming soon. You can start or stop detection, change modes, or hear status updates.');
  };

  const handleSpeakStatus = () => {
    const status = connectionStatus === 'connected' 
      ? `Device connected. Detection is ${detectionStatus}.`
      : `Device is ${connectionStatus}.`;
    speakText(status);
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-8">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="w-full max-w-2xl mb-8 text-center md:text-left">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Dashboard
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Your assistive navigation companion
          </motion.p>
        </div>

        {/* Status Indicators */}
        <motion.div 
          className="mb-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatusIndicator />
        </motion.div>

        {/* Main Action Button */}
        <motion.div 
          className="my-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
        >
          <MainButton
            onClick={handleMainAction}
            label={getMainButtonLabel()}
            isActive={detectionStatus === 'active'}
            disabled={connectionStatus === 'connecting'}
            icon={connectionStatus !== 'connected' ? <Bluetooth className="w-12 h-12" /> : <Power className="w-12 h-12" />}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={handleVoiceCommand}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            whileTap={{ scale: 0.95 }}
            aria-label="Voice command (coming soon)"
          >
            <Mic className="w-5 h-5" aria-hidden="true" />
            <span>Voice</span>
          </motion.button>

          <motion.button
            onClick={handleSpeakStatus}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            whileTap={{ scale: 0.95 }}
            aria-label="Speak current status"
          >
            Speak Status
          </motion.button>
        </motion.div>

        {/* Recent Detections Counter */}
        {recentDetections.length > 0 && (
          <motion.div
            className="mt-8 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-blue-900 dark:text-blue-100 text-center">
              <span className="font-bold text-2xl">{recentDetections.length}</span>
              <span className="ml-2">recent detection{recentDetections.length !== 1 ? 's' : ''}</span>
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
