import type { ThemeMode } from '../contexts/ThemeContext';

// Theme constants
export const THEME_STORAGE_KEY = 'portfolio-theme';
export const THEME_MODES: ThemeMode[] = ['light', 'dark', 'system'];

// Theme labels for UI
export const THEME_LABELS: Record<ThemeMode, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

// Theme icons (SVG paths)
export const THEME_ICONS: Record<ThemeMode, string> = {
  light: 'M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z',
  dark: 'M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z',
  system: 'M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z',
};

// Theme colors for meta tags
export const THEME_COLORS: Record<ThemeMode, string> = {
  light: '#2563eb',
  dark: '#0f172a',
  system: '#2563eb', // Default to light theme color
};

// Utility functions
export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return (stored as ThemeMode) || 'system';
};

export const isValidTheme = (theme: string): theme is ThemeMode => {
  return THEME_MODES.includes(theme as ThemeMode);
};

// Get the actual theme being applied (resolves 'system' to actual light/dark)
export const getActualTheme = (theme: ThemeMode): 'light' | 'dark' => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
};

// Get theme color for meta tags
export const getThemeColor = (theme: ThemeMode): string => {
  const actualTheme = getActualTheme(theme);
  return THEME_COLORS[actualTheme];
};
