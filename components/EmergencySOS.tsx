'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, X, MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface EmergencySOSProps {
  onEmergencyCall?: () => void;
}

export function EmergencySOS({ onEmergencyCall }: EmergencySOSProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [location, setLocation] = useState<string>('Getting location...');

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      handleEmergencyActivated();
    }
  }, [countdown]);

  const handleSOSClick = () => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        () => {
          setLocation('Location unavailable');
        }
      );
    }
    
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setCountdown(5); // 5 second countdown
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setCountdown(null);
  };

  const handleEmergencyActivated = () => {
    // Trigger emergency actions
    if (onEmergencyCall) {
      onEmergencyCall();
    }
    
    // In a real app, this would:
    // 1. Call emergency services
    // 2. Send SMS with location to emergency contacts
    // 3. Start recording audio/video
    // 4. Send notification to nearby users
    
    alert('🚨 EMERGENCY SERVICES CONTACTED\n\n' +
          'Your location has been shared with:\n' +
          '• Emergency Services (911/112)\n' +
          '• Emergency Contacts\n' +
          '• Nearby Dwips users\n\n' +
          `Location: ${location}\n` +
          `Time: ${new Date().toLocaleString()}`);
    
    setShowConfirmation(false);
    setCountdown(null);
  };

  return (
    <>
      {/* Floating SOS Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSOSClick}
        className="fixed bottom-24 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-2xl flex items-center justify-center group hover:shadow-red-500/50 transition-all"
        aria-label="Emergency SOS Button"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <AlertTriangle className="w-8 h-8 text-white" />
        </motion.div>
        
        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-red-600"
          animate={{
            scale: [1, 1.4],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.button>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                {/* Close button */}
                <button
                  onClick={handleCancel}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Cancel"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                  {countdown !== null ? '🚨 CALLING EMERGENCY SERVICES' : 'Emergency SOS'}
                </h2>

                {/* Countdown */}
                {countdown !== null && (
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-6xl font-bold text-center text-red-600 dark:text-red-400 my-6"
                  >
                    {countdown}
                  </motion.div>
                )}

                {/* Description */}
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  {countdown !== null
                    ? 'Contacting emergency services and notifying your emergency contacts...'
                    : 'This will call emergency services and share your location with emergency contacts. Use only in real emergencies.'}
                </p>

                {/* Location Info */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span className="font-mono">{location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Actions sent */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
                    The following will be notified:
                  </p>
                  <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                    <li className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      Emergency Services (911/112)
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      Emergency Contacts (SMS + Call)
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      Nearby Dwips users (Alert)
                    </li>
                  </ul>
                </div>

                {/* Buttons */}
                {countdown === null ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-6 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-500/50"
                    >
                      Confirm Emergency
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleCancel}
                    className="w-full px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  >
                    CANCEL
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
