'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';
import { DetectionEvent, RiskLevel } from '@/lib/types';

interface CollisionRiskMeterProps {
  currentDetection: DetectionEvent | null;
  recentDetections: DetectionEvent[];
}

export default function CollisionRiskMeter({ currentDetection, recentDetections }: CollisionRiskMeterProps) {
  // Calculate overall risk from all recent detections
  const calculateOverallRisk = (): { level: RiskLevel; score: number; closestObject: DetectionEvent | null } => {
    if (recentDetections.length === 0 || !currentDetection) {
      return { level: 'safe', score: 0, closestObject: null };
    }

    // Find closest detection
    const closest = recentDetections.reduce((prev, curr) => 
      curr.distance < prev.distance ? curr : prev
    );

    // Calculate risk score (0-100)
    let score = 0;
    
    if (closest.distance < 1.5) {
      score = 90;
    } else if (closest.distance < 3) {
      score = 60;
    } else if (closest.distance < 5) {
      score = 30;
    } else {
      score = 10;
    }

    // Adjust for speed
    if (closest.speed && closest.speed > 2) {
      score += 20;
    }

    score = Math.min(100, score);

    let level: RiskLevel = 'safe';
    if (score >= 70) level = 'danger';
    else if (score >= 40) level = 'caution';

    return { level, score, closestObject: closest };
  };

  const { level, score, closestObject } = calculateOverallRisk();

  const getRiskConfig = (risk: RiskLevel) => {
    switch (risk) {
      case 'danger':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-300 dark:border-red-700',
          icon: <AlertTriangle className="w-6 h-6" />,
          label: 'DANGER',
          message: 'Immediate attention required',
        };
      case 'caution':
        return {
          color: 'bg-yellow-500',
          textColor: 'text-yellow-600 dark:text-yellow-400',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-300 dark:border-yellow-700',
          icon: <AlertCircle className="w-6 h-6" />,
          label: 'CAUTION',
          message: 'Potential hazard detected',
        };
      case 'safe':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-300 dark:border-green-700',
          icon: <Shield className="w-6 h-6" />,
          label: 'SAFE',
          message: 'All clear, no immediate threats',
        };
    }
  };

  const config = getRiskConfig(level);

  const getRecommendation = (): string => {
    if (!closestObject) return 'Continue monitoring';
    
    if (level === 'danger') {
      return `Stop or change direction - ${closestObject.objectType.replace('_', ' ')} very close`;
    } else if (level === 'caution') {
      return `Reduce speed - ${closestObject.objectType.replace('_', ' ')} approaching`;
    } else {
      return 'Maintain current pace';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full max-w-2xl mx-auto p-6 rounded-lg border-2 ${config.bgColor} ${config.borderColor}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={config.textColor}>
            {config.icon}
          </span>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Collision Risk Assessment
          </h3>
        </div>
        <motion.div
          animate={level === 'danger' ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: level === 'danger' ? Infinity : 0 }}
          className={`px-3 py-1 rounded-full font-bold text-sm ${config.textColor}`}
        >
          {config.label}
        </motion.div>
      </div>

      {/* Risk Meter Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Risk Level</span>
          <span className="font-semibold">{score}%</span>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${config.color} flex items-center justify-end pr-2`}
          >
            {score > 15 && (
              <span className="text-xs font-bold text-white">
                {score}%
              </span>
            )}
          </motion.div>
        </div>
      </div>

      {/* Details */}
      {closestObject && (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Closest Object:</span>
            <span className="font-semibold text-gray-900 dark:text-white capitalize">
              {closestObject.objectType.replace('_', ' ')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Distance:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {closestObject.distance.toFixed(1)}m {closestObject.direction}
            </span>
          </div>
          {closestObject.timeToContact && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Time to Contact:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {closestObject.timeToContact.toFixed(1)}s
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {closestObject.confidence}%
            </span>
          </div>
        </div>
      )}

      {/* Message & Recommendation */}
      <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
        <p className={`text-sm font-medium ${config.textColor} mb-1`}>
          {config.message}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          → {getRecommendation()}
        </p>
      </div>
    </motion.div>
  );
}
