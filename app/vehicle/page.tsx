'use client';

import { motion } from 'framer-motion';
import { Car, AlertTriangle, Navigation, Gauge, Eye } from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';
import ZoneDetector from '@/components/ZoneDetector';
import CollisionRiskMeter from '@/components/CollisionRiskMeter';

export default function VehiclePage() {
  const { connectionStatus, detectionStatus, recentDetections, currentDetection, settings, speakText } = useApp();

  // Get blind spot warnings
  const hasLeftBlindSpot = recentDetections.some(d => d.direction === 'left' && d.distance < 5);
  const hasRightBlindSpot = recentDetections.some(d => d.direction === 'right' && d.distance < 5);
  const hasRearWarning = recentDetections.some(d => d.direction === 'back' && d.distance < 3);

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-8 px-4 py-8">
      <main className="flex-1 max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Car className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Vehicle Mode
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Enhanced situational awareness for drivers and riders
          </p>
        </motion.div>

        {connectionStatus !== 'connected' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                Connect your DWIPS device to enable vehicle monitoring
              </p>
            </div>
          </motion.div>
        )}

        {/* HUD-Style Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Blind Spot Monitor */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Blind Spot Monitor
            </h2>

            <div className="relative h-64 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
              {/* Vehicle representation */}
              <div className="relative w-32 h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                <Car className="w-16 h-16 text-gray-400" />
              </div>

              {/* Left blind spot indicator */}
              <motion.div
                animate={hasLeftBlindSpot ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                } : {}}
                transition={{ duration: 0.5, repeat: hasLeftBlindSpot ? Infinity : 0 }}
                className={`absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center ${
                  hasLeftBlindSpot 
                    ? 'bg-red-500 border-4 border-red-600' 
                    : 'bg-green-500 border-4 border-green-600'
                }`}
              >
                <span className="text-2xl">
                  {hasLeftBlindSpot ? '⚠️' : '✓'}
                </span>
              </motion.div>

              {/* Right blind spot indicator */}
              <motion.div
                animate={hasRightBlindSpot ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                } : {}}
                transition={{ duration: 0.5, repeat: hasRightBlindSpot ? Infinity : 0 }}
                className={`absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center ${
                  hasRightBlindSpot 
                    ? 'bg-red-500 border-4 border-red-600' 
                    : 'bg-green-500 border-4 border-green-600'
                }`}
              >
                <span className="text-2xl">
                  {hasRightBlindSpot ? '⚠️' : '✓'}
                </span>
              </motion.div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className={`p-3 rounded ${hasLeftBlindSpot ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
                <p className="font-semibold text-gray-900 dark:text-white">Left Blind Spot</p>
                <p className={hasLeftBlindSpot ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                  {hasLeftBlindSpot ? 'Vehicle Detected!' : 'Clear'}
                </p>
              </div>
              <div className={`p-3 rounded ${hasRightBlindSpot ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
                <p className="font-semibold text-gray-900 dark:text-white">Right Blind Spot</p>
                <p className={hasRightBlindSpot ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                  {hasRightBlindSpot ? 'Vehicle Detected!' : 'Clear'}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Rear Collision Warning */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Rear Collision Warning
            </h2>

            <div className={`p-8 rounded-lg text-center ${
              hasRearWarning 
                ? 'bg-red-100 dark:bg-red-900/30 border-4 border-red-500' 
                : 'bg-green-100 dark:bg-green-900/30 border-4 border-green-500'
            }`}>
              <motion.div
                animate={hasRearWarning ? {
                  rotate: [0, 10, -10, 0],
                } : {}}
                transition={{ duration: 0.5, repeat: hasRearWarning ? Infinity : 0 }}
              >
                <AlertTriangle className={`w-24 h-24 mx-auto mb-4 ${
                  hasRearWarning ? 'text-red-600' : 'text-green-600'
                }`} />
              </motion.div>
              <h3 className={`text-2xl font-bold mb-2 ${
                hasRearWarning ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'
              }`}>
                {hasRearWarning ? 'OBJECT BEHIND!' : 'CLEAR'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {hasRearWarning 
                  ? 'Check mirrors before reversing' 
                  : 'Safe to reverse'}
              </p>
            </div>

            {/* Vehicle Type Selector */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vehicle Type
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                defaultValue={settings.vehicleType || 'car'}
              >
                <option value="car">🚗 Car</option>
                <option value="motorcycle">🏍️ Motorcycle</option>
                <option value="scooter">🛴 E-Scooter</option>
                <option value="bicycle">🚲 Bicycle</option>
              </select>
            </div>
          </motion.section>
        </div>

        {/* Zone Detection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <ZoneDetector recentDetections={recentDetections} />
        </motion.section>

        {/* Collision Risk */}
        {detectionStatus === 'active' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CollisionRiskMeter 
              currentDetection={currentDetection} 
              recentDetections={recentDetections} 
            />
          </motion.section>
        )}

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <StatCard
            icon={<Gauge />}
            label="Speed Adaptive"
            value="Active"
            color="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            icon={<Eye />}
            label="Coverage"
            value="360°"
            color="text-purple-600 dark:text-purple-400"
          />
          <StatCard
            icon={<AlertTriangle />}
            label="Today's Alerts"
            value={recentDetections.length.toString()}
            color="text-orange-600 dark:text-orange-400"
          />
          <StatCard
            icon={<Car />}
            label="Drive Mode"
            value="Active"
            color="text-green-600 dark:text-green-400"
          />
        </motion.section>
      </main>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
      <div className={`${color} mb-2`}>
        {icon}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}
