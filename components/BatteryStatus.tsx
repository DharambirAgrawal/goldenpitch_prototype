"use client";

import {
  Battery,
  BatteryCharging,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";

interface BatteryStatusProps {
  batteryLevel: number; // 0-100
  isCharging: boolean;
}

export default function BatteryStatus({
  batteryLevel,
  isCharging,
}: BatteryStatusProps) {
  const getBatteryIcon = () => {
    if (isCharging) return <BatteryCharging className="w-5 h-5" />;
    if (batteryLevel >= 80) return <BatteryFull className="w-5 h-5" />;
    if (batteryLevel >= 40) return <BatteryMedium className="w-5 h-5" />;
    if (batteryLevel >= 20) return <BatteryLow className="w-5 h-5" />;
    return <Battery className="w-5 h-5" />;
  };

  const getBatteryColor = () => {
    if (isCharging) return "text-blue-600 dark:text-blue-400";
    if (batteryLevel >= 40) return "text-green-600 dark:text-green-400";
    if (batteryLevel >= 20) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getEstimatedTime = () => {
    if (isCharging) {
      const timeToFull = ((100 - batteryLevel) / 100) * 2; // ~2 hours to full charge
      return `${Math.round(timeToFull * 60)} min to full`;
    }

    // Estimate based on typical usage (12-24 hours on full charge)
    const hoursRemaining = (batteryLevel / 100) * 18;
    if (hoursRemaining < 1) {
      return `${Math.round(hoursRemaining * 60)} min left`;
    }
    return `${Math.round(hoursRemaining)}h left`;
  };

  const getBatteryBarColor = () => {
    if (isCharging) return "bg-blue-500";
    if (batteryLevel >= 40) return "bg-green-500";
    if (batteryLevel >= 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <motion.div
        animate={
          isCharging
            ? {
                scale: [1, 1.1, 1],
              }
            : {}
        }
        transition={{
          duration: 1,
          repeat: isCharging ? Infinity : 0,
        }}
        className={getBatteryColor()}
      >
        {getBatteryIcon()}
      </motion.div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Device Battery
          </p>
          <span className={`text-sm font-bold ${getBatteryColor()}`}>
            {batteryLevel}%
          </span>
        </div>

        {/* Battery bar */}
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${batteryLevel}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${getBatteryBarColor()}`}
          />
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400">
          {isCharging ? "⚡ Charging" : "🔋"} {getEstimatedTime()}
        </p>
      </div>

      {batteryLevel < 20 && !isCharging && (
        <AlertTriangle className="w-5 h-5 text-red-500" />
      )}
    </div>
  );
}
