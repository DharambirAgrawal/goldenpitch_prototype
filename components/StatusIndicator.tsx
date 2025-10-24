'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Bluetooth, BluetoothConnected, BluetoothSearching } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';

export default function StatusIndicator() {
  const { connectionStatus, detectionStatus, settings, currentDetection } = useApp();

  const connectionIcon = {
    connected: <BluetoothConnected className="w-6 h-6" />,
    connecting: <BluetoothSearching className="w-6 h-6" />,
    disconnected: <Bluetooth className="w-6 h-6" />,
  };

  const connectionColor = {
    connected: 'text-green-600 dark:text-green-400',
    connecting: 'text-yellow-600 dark:text-yellow-400',
    disconnected: 'text-gray-400 dark:text-gray-600',
  };

  const detectionColor = detectionStatus === 'active'
    ? 'text-green-600 dark:text-green-400'
    : 'text-gray-400 dark:text-gray-600';

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4" role="status" aria-live="polite">
      {/* Connection Status */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <motion.div
            className={connectionColor[connectionStatus]}
            animate={connectionStatus === 'connecting' ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            {connectionIcon[connectionStatus]}
          </motion.div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Device Status
            </p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
              {connectionStatus}
            </p>
          </div>
        </div>
      </div>

      {/* Detection Status */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center gap-3 flex-1">
          <motion.div
            className={`w-4 h-4 rounded-full ${
              detectionStatus === 'active'
                ? 'bg-green-500'
                : 'bg-gray-400'
            }`}
            animate={
              detectionStatus === 'active'
                ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Detection
            </p>
            <p className={`text-lg font-semibold capitalize ${detectionColor}`}>
              {detectionStatus}
            </p>
          </div>
        </div>
        
        {detectionStatus === 'active' && (
          <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300 capitalize">
              {settings.mode} Mode
            </p>
          </div>
        )}
      </div>

      {/* Current Detection Alert */}
      <AnimatePresence>
        {currentDetection && settings.visualIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 dark:border-red-400 rounded-lg shadow-lg"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-start gap-3">
              <motion.div
                className="w-12 h-12 flex-shrink-0 bg-red-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <span className="text-white text-2xl font-bold" aria-hidden="true">!</span>
              </motion.div>
              <div className="flex-1">
                <p className="font-bold text-red-900 dark:text-red-100 text-lg">
                  Obstacle Detected
                </p>
                <p className="text-red-800 dark:text-red-200 mt-1">
                  <span className="capitalize">{currentDetection.direction}</span> • 
                  {' '}{Math.round(currentDetection.distance)} meters
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
