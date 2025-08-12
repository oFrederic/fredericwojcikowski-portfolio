import { useTheme as useThemeContext } from '../contexts/ThemeContext';
import type { ThemeMode } from '../contexts/ThemeContext';

/**
 * Enhanced theme hook with additional utilities
 */
export const useTheme = () => {
  const context = useThemeContext();
  
  // Helper functions
  const toggleTheme = () => {
    const newTheme: ThemeMode = context.isDark ? 'light' : 'dark';
    context.setTheme(newTheme);
  };

  const setLightTheme = () => context.setTheme('light');
  const setDarkTheme = () => context.setTheme('dark');
  const setSystemTheme = () => context.setTheme('system');

  return {
    ...context,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
  };
};
