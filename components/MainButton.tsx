'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/lib/context/AppContext';

interface MainButtonProps {
  onClick: () => void;
  label: string;
  isActive?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export default function MainButton({
  onClick,
  label,
  isActive = false,
  disabled = false,
  variant = 'primary',
  icon,
}: MainButtonProps) {
  const { settings } = useApp();

  const baseClasses = 'relative flex flex-col items-center justify-center rounded-full font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all';
  
  const variantClasses = variant === 'primary'
    ? isActive
      ? 'bg-gradient-to-br from-green-500 to-green-600 text-white focus:ring-green-400'
      : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white focus:ring-blue-400'
    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gray-400';

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer hover:scale-105 active:scale-95';

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64`}
      whileTap={disabled ? {} : { scale: 0.95 }}
      whileHover={disabled ? {} : { scale: 1.05 }}
      disabled={disabled}
      aria-label={label}
      aria-pressed={isActive}
    >
      {icon && (
        <motion.div
          className="mb-3"
          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          {icon}
        </motion.div>
      )}
      <span className={`${settings.fontSize === 'large' ? 'text-2xl' : settings.fontSize === 'small' ? 'text-lg' : 'text-xl'} text-center px-4`}>
        {label}
      </span>
      
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-white"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.button>
  );
}
