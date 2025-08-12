import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
  isSystem: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// LocalStorage key
const THEME_STORAGE_KEY = 'portfolio-theme';

// Get system theme preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Get stored theme or default to system
const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return (stored as ThemeMode) || 'system';
};

// Apply theme to document
const applyTheme = (theme: ThemeMode) => {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const isDark = theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark');
  
  // Remove existing theme classes
  root.classList.remove('theme-light', 'theme-dark');
  
  // Add new theme class
  root.classList.add(isDark ? 'theme-dark' : 'theme-light');
  
  // Also set data attribute for alternative CSS targeting
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  
  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#0f172a' : '#2563eb');
  }
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(getStoredTheme);
  const [isDark, setIsDark] = useState(false);
  const [isSystem, setIsSystem] = useState(theme === 'system');

  // Update theme state and apply to document
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    setIsSystem(newTheme === 'system');
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
    
    // Apply theme
    applyTheme(newTheme);
    
    // Update isDark state
    const actualTheme = newTheme === 'system' ? getSystemTheme() : newTheme;
    setIsDark(actualTheme === 'dark');
  };

  // Initialize theme on mount
  useEffect(() => {
    applyTheme(theme);
    const actualTheme = theme === 'system' ? getSystemTheme() : theme;
    setIsDark(actualTheme === 'dark');
    setIsSystem(theme === 'system');
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        const newSystemTheme = getSystemTheme();
        setIsDark(newSystemTheme === 'dark');
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    isDark,
    isSystem,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
