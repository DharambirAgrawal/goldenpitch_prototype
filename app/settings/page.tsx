'use client';

import { motion } from 'framer-motion';
import { 
  Home as HomeIcon, 
  Building, 
  Volume2, 
  Vibrate, 
  Eye, 
  MessageSquare, 
  Type, 
  Contrast 
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';

export default function SettingsPage() {
  const { settings, updateSettings, speakText } = useApp();

  const handleModeChange = (mode: 'home' | 'outdoor') => {
    updateSettings({ mode });
    speakText(`Switched to ${mode} mode`);
  };

  const handleToggle = (setting: keyof typeof settings) => {
    const newValue = !settings[setting];
    updateSettings({ [setting]: newValue });
    speakText(`${setting.replace(/([A-Z])/g, ' $1').trim()} ${newValue ? 'enabled' : 'disabled'}`);
  };

  const handleFontSizeChange = (fontSize: 'small' | 'medium' | 'large') => {
    updateSettings({ fontSize });
    speakText(`Font size set to ${fontSize}`);
  };

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
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your experience
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Detection Mode */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Building className="w-5 h-5" aria-hidden="true" />
              Detection Mode
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Choose the environment for optimal detection sensitivity
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleModeChange('home')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.mode === 'home'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
                aria-pressed={settings.mode === 'home'}
              >
                <HomeIcon className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Home Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Indoor navigation, shorter range (&lt;5m)
                </p>
              </button>

              <button
                onClick={() => handleModeChange('outdoor')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.mode === 'outdoor'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
                aria-pressed={settings.mode === 'outdoor'}
              >
                <Building className="w-8 h-8 mb-2 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Outdoor Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Outdoor navigation, extended range (&lt;10m)
                </p>
              </button>
            </div>
          </motion.section>

          {/* Feedback Options */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Feedback Options
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Choose how you want to be notified of obstacles
            </p>

            <div className="space-y-4">
              <ToggleSwitch
                icon={<Volume2 className="w-5 h-5" />}
                label="Audio Beep"
                description="Play a beep sound when obstacle is detected"
                checked={settings.audioFeedback}
                onChange={() => handleToggle('audioFeedback')}
              />

              <ToggleSwitch
                icon={<Vibrate className="w-5 h-5" />}
                label="Vibration"
                description="Vibrate device when obstacle is detected"
                checked={settings.vibrationFeedback}
                onChange={() => handleToggle('vibrationFeedback')}
              />

              <ToggleSwitch
                icon={<Eye className="w-5 h-5" />}
                label="Visual Indicator"
                description="Show on-screen alert for detections"
                checked={settings.visualIndicator}
                onChange={() => handleToggle('visualIndicator')}
              />
            </div>
          </motion.section>

          {/* Accessibility Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Accessibility
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Enhance usability with accessibility features
            </p>

            <div className="space-y-6">
              <ToggleSwitch
                icon={<MessageSquare className="w-5 h-5" />}
                label="Text-to-Speech"
                description="Speak status updates and obstacle information"
                checked={settings.textToSpeech}
                onChange={() => handleToggle('textToSpeech')}
              />

              <ToggleSwitch
                icon={<Contrast className="w-5 h-5" />}
                label="High Contrast Mode"
                description="Increase contrast for better visibility"
                checked={settings.highContrast}
                onChange={() => handleToggle('highContrast')}
              />

              {/* Font Size */}
              <div>
                <label className="flex items-center gap-2 text-gray-900 dark:text-white font-medium mb-3">
                  <Type className="w-5 h-5" />
                  Font Size
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Adjust text size for comfortable reading
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleFontSizeChange(size)}
                      className={`py-3 px-4 rounded-lg border-2 transition-all font-medium capitalize ${
                        settings.fontSize === size
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400'
                      }`}
                      aria-pressed={settings.fontSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Speak All Settings Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <button
              onClick={() => {
                const summary = `Current settings: ${settings.mode} mode, 
                  audio feedback ${settings.audioFeedback ? 'enabled' : 'disabled'}, 
                  vibration ${settings.vibrationFeedback ? 'enabled' : 'disabled'}, 
                  visual indicator ${settings.visualIndicator ? 'enabled' : 'disabled'}, 
                  text to speech ${settings.textToSpeech ? 'enabled' : 'disabled'}, 
                  font size ${settings.fontSize}, 
                  high contrast ${settings.highContrast ? 'enabled' : 'disabled'}`;
                speakText(summary);
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Hear All Settings
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function ToggleSwitch({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3 flex-1">
        <div className="text-blue-600 dark:text-blue-400 mt-1">
          {icon}
        </div>
        <div>
          <label className="text-gray-900 dark:text-white font-medium block">
            {label}
          </label>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
        </div>
      </div>
      
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <motion.span
          className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
          animate={{ x: checked ? 30 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}
