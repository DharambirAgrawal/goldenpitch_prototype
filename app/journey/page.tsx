'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, TrendingUp } from 'lucide-react';
import { mockJourneyLogs, getAudioSummaryMessage, getTodaySummary } from '@/lib/data/mockData';
import AudioPlayer from '@/components/AudioPlayer';
import { JourneyLog } from '@/lib/types';

export default function JourneyPage() {
  const totalJourneys = mockJourneyLogs.length;
  const totalObstacles = mockJourneyLogs.reduce((sum, log) => sum + log.obstacleCount, 0);
  const totalDuration = mockJourneyLogs.reduce((sum, log) => sum + log.duration, 0);

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-8 px-4 py-8">
      <main className="flex-1 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Journey Log
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your navigation history
          </p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <StatCard
            icon={<Calendar className="w-6 h-6" />}
            label="Total Journeys"
            value={totalJourneys}
            color="blue"
          />
          <StatCard
            icon={<MapPin className="w-6 h-6" />}
            label="Obstacles Detected"
            value={totalObstacles}
            color="red"
          />
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            label="Total Time"
            value={`${totalDuration} min`}
            color="green"
          />
        </motion.div>

        {/* Audio Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-8"
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Today's Summary
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Listen to an audio summary of your recent journeys
              </p>
            </div>
            <AudioPlayer text={getTodaySummary(mockJourneyLogs)} />
          </div>
        </motion.div>

        {/* Journey List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Journeys
          </h2>
          
          {mockJourneyLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <JourneyCard log={log} />
            </motion.div>
          ))}
        </div>

        {/* Simple Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Weekly Activity
          </h2>
          <div className="space-y-3">
            {mockJourneyLogs.map((log) => {
              const maxObstacles = Math.max(...mockJourneyLogs.map(l => l.obstacleCount));
              const width = (log.obstacleCount / maxObstacles) * 100;
              
              return (
                <div key={log.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">
                      {log.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {log.obstacleCount} obstacles
                    </span>
                  </div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <motion.div
                      className={`h-full rounded-lg ${
                        log.mode === 'outdoor' 
                          ? 'bg-gradient-to-r from-green-500 to-green-600' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-500 to-blue-600" />
              <span className="text-gray-700 dark:text-gray-300">Home Mode</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-green-500 to-green-600" />
              <span className="text-gray-700 dark:text-gray-300">Outdoor Mode</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function StatCard({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number; 
  color: 'blue' | 'red' | 'green';
}) {
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    red: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
    green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

function JourneyCard({ log }: { log: JourneyLog }) {
  const date = log.date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  const time = log.date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit' 
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {date}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{time}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
          log.mode === 'outdoor'
            ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
            : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
        }`}>
          {log.mode}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{log.duration} minutes</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{log.obstacleCount} obstacles</span>
        </div>
      </div>

      <AudioPlayer 
        text={getAudioSummaryMessage(log)}
        label="Hear journey details"
      />
    </div>
  );
}
