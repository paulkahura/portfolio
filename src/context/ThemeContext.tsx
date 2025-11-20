import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = {
  name: string;
  accent: string;
  bg: string;
  surface: string;
  text: string;
  glass: string;
};

const themes: Theme[] = [
  { 
    name: 'Modern Light', 
    accent: '#ff4d4d', 
    bg: '#f5f5f7', 
    surface: '#ffffff', 
    text: '#1d1d1f',
    glass: 'rgba(255, 255, 255, 0.8)'
  },
  { 
    name: 'Ocean Blue', 
    accent: '#00aaff', 
    bg: '#e8f4f8', 
    surface: '#ffffff', 
    text: '#0a2540',
    glass: 'rgba(232, 244, 248, 0.8)'
  },
  { 
    name: 'Sunset', 
    accent: '#ff6b35', 
    bg: '#fff5f0', 
    surface: '#ffffff', 
    text: '#2d1b2e',
    glass: 'rgba(255, 245, 240, 0.8)'
  },
  { 
    name: 'Dark Mode', 
    accent: '#ff4d4d', 
    bg: '#1a1a1a', 
    surface: '#2a2a2a', 
    text: '#f5f5f5',
    glass: 'rgba(26, 26, 26, 0.8)'
  },
];

type ThemeContextType = {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Set default to Sunset (index 2)
  const [currentTheme, setCurrentTheme] = useState(themes[2]); 

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-accent', currentTheme.accent);
    root.style.setProperty('--color-bg', currentTheme.bg);
    root.style.setProperty('--color-surface', currentTheme.surface);
    root.style.setProperty('--color-text', currentTheme.text);
    
    document.body.style.backgroundColor = currentTheme.bg;
    document.body.style.color = currentTheme.text;

    document.body.className = `theme-${currentTheme.name.toLowerCase().replace(/\s+/g, '-')}`;

  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
