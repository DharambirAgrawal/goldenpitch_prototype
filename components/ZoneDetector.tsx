'use client';

import { motion } from 'framer-motion';
import { DetectionEvent, Direction, RiskLevel } from '@/lib/types';

interface ZoneDetectorProps {
  recentDetections: DetectionEvent[];
}

export default function ZoneDetector({ recentDetections }: ZoneDetectorProps) {
  // Get the most recent detection for each direction
  const getZoneStatus = (direction: Direction): { distance: number | null; risk: RiskLevel; object: string } => {
    const zoneDetections = recentDetections.filter(d => d.direction === direction);
    if (zoneDetections.length === 0) {
      return { distance: null, risk: 'safe', object: 'Clear' };
    }
    
    const latest = zoneDetections[0];
    return {
      distance: latest.distance,
      risk: latest.riskLevel,
      object: latest.objectType.replace('_', ' ')
    };
  };

  const front = getZoneStatus('front');
  const right = getZoneStatus('right');
  const back = getZoneStatus('back');
  const left = getZoneStatus('left');

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case 'danger': return 'bg-red-500 text-white border-red-600';
      case 'caution': return 'bg-yellow-400 text-gray-900 border-yellow-500';
      case 'safe': return 'bg-green-500 text-white border-green-600';
    }
  };

  const getRiskIcon = (risk: RiskLevel) => {
    switch (risk) {
      case 'danger': return '🔴';
      case 'caution': return '🟡';
      case 'safe': return '🟢';
    }
  };

  const formatDistance = (distance: number | null) => {
    if (distance === null) return 'Clear';
    return `${distance.toFixed(1)}m`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            360° Zone Detection
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Live proximity monitoring
          </p>
        </div>

        {/* Radar-style visualization */}
        <div className="grid grid-cols-3 gap-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {/* Top row - FRONT */}
          <div className="col-span-3">
            <ZoneCard
              label="FRONT"
              distance={front.distance}
              risk={front.risk}
              object={front.object}
              icon={getRiskIcon(front.risk)}
              colorClass={getRiskColor(front.risk)}
            />
          </div>

          {/* Middle row - LEFT, CENTER, RIGHT */}
          <div>
            <ZoneCard
              label="LEFT"
              distance={left.distance}
              risk={left.risk}
              object={left.object}
              icon={getRiskIcon(left.risk)}
              colorClass={getRiskColor(left.risk)}
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-20 h-20 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-blue-400 dark:bg-blue-500"
              />
              <span className="relative text-2xl">📍</span>
            </div>
          </div>

          <div>
            <ZoneCard
              label="RIGHT"
              distance={right.distance}
              risk={right.risk}
              object={right.object}
              icon={getRiskIcon(right.risk)}
              colorClass={getRiskColor(right.risk)}
            />
          </div>

          {/* Bottom row - BACK */}
          <div className="col-span-3">
            <ZoneCard
              label="BACK"
              distance={back.distance}
              risk={back.risk}
              object={back.object}
              icon={getRiskIcon(back.risk)}
              colorClass={getRiskColor(back.risk)}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span>🟢</span>
            <span className="text-gray-600 dark:text-gray-400">Safe</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🟡</span>
            <span className="text-gray-600 dark:text-gray-400">Caution</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🔴</span>
            <span className="text-gray-600 dark:text-gray-400">Danger</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface ZoneCardProps {
  label: string;
  distance: number | null;
  risk: RiskLevel;
  object: string;
  icon: string;
  colorClass: string;
}

function ZoneCard({ label, distance, risk, object, icon, colorClass }: ZoneCardProps) {
  const formatDistance = (d: number | null) => {
    if (d === null) return 'Clear';
    return `${d.toFixed(1)}m`;
  };

  return (
    <motion.div
      animate={risk === 'danger' ? {
        scale: [1, 1.05, 1],
      } : {}}
      transition={{
        duration: 0.5,
        repeat: risk === 'danger' ? Infinity : 0,
      }}
      className={`p-3 rounded-lg border-2 ${colorClass} transition-all`}
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-2xl">{icon}</span>
          <p className="font-bold text-sm">{label}</p>
        </div>
        <p className="text-lg font-semibold">{formatDistance(distance)}</p>
        <p className="text-xs opacity-90 capitalize">{object}</p>
      </div>
    </motion.div>
  );
}
