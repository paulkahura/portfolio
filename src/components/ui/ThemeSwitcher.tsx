import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Palette } from 'lucide-react';
import { useState } from 'react';

export const ThemeSwitcher = () => {
  const { themes, currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all"
        title="Change Theme"
      >
        <Palette size={24} style={{ color: currentTheme.accent }} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="absolute top-16 left-0 bg-white/95 backdrop-blur-xl border border-gray-200 p-4 rounded-2xl flex flex-col gap-3 min-w-[180px] shadow-2xl"
        >
          <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-1">Theme</h4>
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => {
                setTheme(theme);
                setIsOpen(false);
              }}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100 transition-colors text-left group"
            >
              <div 
                className="w-5 h-5 rounded-full shadow-sm ring-2 ring-gray-200" 
                style={{ backgroundColor: theme.accent }}
              />
              <span className={`text-sm ${currentTheme.name === theme.name ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {theme.name}
              </span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};
