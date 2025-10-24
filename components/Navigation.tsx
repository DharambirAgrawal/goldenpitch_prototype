'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, Settings, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/journey', label: 'Journey', icon: Clock },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help', icon: HelpCircle },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile bottom navigation */}
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden z-50 safe-area-bottom"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full relative"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <motion.div
                  className={`flex flex-col items-center ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </motion.div>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop side navigation */}
      <nav
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col p-6 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            SafePath
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Assistive Navigation
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
