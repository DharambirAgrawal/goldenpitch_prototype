'use client';

import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Volume2, 
  Vibrate, 
  Eye, 
  Home as HomeIcon, 
  Building, 
  Bluetooth,
  Info,
  MessageCircle
} from 'lucide-react';
import { useApp } from '@/lib/context/AppContext';

export default function HelpPage() {
  const { speakText } = useApp();

  const helpSections = [
    {
      title: 'Getting Started',
      icon: <Info className="w-6 h-6" />,
      content: [
        {
          question: 'How do I connect my device?',
          answer: 'Tap the "Connect Device" button on the Dashboard. The app will simulate a connection to your wearable device via Bluetooth Low Energy.'
        },
        {
          question: 'How do I start detection?',
          answer: 'Once connected, tap the main circular button to start detection. The button will turn green and show "Stop Detection" when active.'
        }
      ]
    },
    {
      title: 'Detection Modes',
      icon: <Building className="w-6 h-6" />,
      content: [
        {
          question: 'What is Home Mode?',
          answer: 'Home Mode is optimized for indoor navigation with a detection range of up to 5 meters. It provides more sensitive detection for navigating tight spaces and furniture.'
        },
        {
          question: 'What is Outdoor Mode?',
          answer: 'Outdoor Mode extends the detection range up to 10 meters for outdoor environments. It helps you navigate sidewalks, crossings, and outdoor obstacles.'
        }
      ]
    },
    {
      title: 'Feedback Types',
      icon: <MessageCircle className="w-6 h-6" />,
      content: [
        {
          question: 'Audio Feedback',
          answer: 'When enabled, the app plays a beep sound whenever an obstacle is detected. The beep helps you quickly recognize nearby obstacles.',
          icon: <Volume2 className="w-5 h-5 text-blue-600" />
        },
        {
          question: 'Vibration Feedback',
          answer: 'Your device will vibrate when an obstacle is detected, providing tactile feedback. This is useful in noisy environments or when audio feedback is not preferred.',
          icon: <Vibrate className="w-5 h-5 text-green-600" />
        },
        {
          question: 'Visual Indicator',
          answer: 'A visual alert appears on screen showing obstacle distance and direction. This is helpful for users with partial vision or for demonstrating the app.',
          icon: <Eye className="w-5 h-5 text-purple-600" />
        }
      ]
    },
    {
      title: 'Accessibility Features',
      icon: <HelpCircle className="w-6 h-6" />,
      content: [
        {
          question: 'Text-to-Speech',
          answer: 'When enabled, the app speaks status updates, obstacle information, and navigation instructions aloud. This is the primary way visually impaired users interact with the app.'
        },
        {
          question: 'Font Size Adjustment',
          answer: 'Choose from small, medium, or large text sizes to make the app comfortable to read for users with partial vision or visual preferences.'
        },
        {
          question: 'High Contrast Mode',
          answer: 'Increases color contrast throughout the app for better visibility. This helps users with low vision or in bright outdoor conditions.'
        }
      ]
    },
    {
      title: 'Safety Tips',
      icon: <Bluetooth className="w-6 h-6" />,
      content: [
        {
          question: 'Important Safety Notice',
          answer: 'This assistive device is designed to supplement, not replace, traditional mobility aids like canes or guide dogs. Always use caution and follow established safety practices when navigating.'
        },
        {
          question: 'Battery and Connection',
          answer: 'Ensure your wearable device is charged and properly connected before starting your journey. The app will alert you if the connection is lost.'
        }
      ]
    }
  ];

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
            Help & Information
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Learn how to use SafePath effectively
          </p>
        </motion.div>

        {/* Quick Help Audio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Quick Audio Guide
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Listen to a quick overview of how to use the app
          </p>
          <button
            onClick={() => {
              const guide = `Welcome to SafePath, your assistive navigation companion. 
                To get started, connect your wearable device from the Dashboard. 
                Then tap the main button to start detection. 
                You can choose between Home mode for indoor navigation up to 5 meters, 
                or Outdoor mode for outdoor navigation up to 10 meters. 
                The app provides three types of feedback: audio beeps, vibrations, and visual alerts. 
                You can customize all settings in the Settings page. 
                Your journey history is saved in the Journey Log. 
                For detailed help, continue reading the help topics below.`;
              speakText(guide);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
          >
            <Volume2 className="w-5 h-5" />
            Play Quick Guide
          </button>
        </motion.div>

        {/* Help Sections */}
        <div className="space-y-6">
          {helpSections.map((section, sectionIndex) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + sectionIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400">{section.icon}</span>
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-l-4 border-blue-600 dark:border-blue-400 pl-4">
                    <div className="flex items-start gap-2 mb-2">
                      {item.icon && <span className="mt-1">{item.icon}</span>}
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.question}
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                    <button
                      onClick={() => speakText(`${item.question}. ${item.answer}`)}
                      className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      aria-label={`Listen to ${item.question}`}
                    >
                      <Volume2 className="w-4 h-4" />
                      Listen
                    </button>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Contact/Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Need More Help?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            This is a prototype demonstration. In a production app, you would find contact information and support resources here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Watch Tutorials
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
