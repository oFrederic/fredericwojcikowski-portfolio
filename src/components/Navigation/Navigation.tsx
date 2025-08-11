import React, { useState, useEffect, useRef } from 'react';
import styles from './Navigation.module.css';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'device'>('device');
  const [currentLanguage, setCurrentLanguage] = useState<'english' | 'japanese' | 'french'>('english');
  
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleThemeMenu = () => setIsThemeMenuOpen(!isThemeMenuOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);

  const handleThemeChange = (theme: 'light' | 'dark' | 'device') => {
    setCurrentTheme(theme);
    setIsThemeMenuOpen(false);
  };

  const handleLanguageChange = (language: 'english' | 'japanese' | 'french') => {
    setCurrentLanguage(language);
    setIsLanguageMenuOpen(false);
  };

  // Function to get the appropriate theme icon
  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'light':
        return (
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
        );
      case 'dark':
        return (
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
        );
      case 'device':
      default:
        return (
          <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
        );
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.navigation} ${className || ''}`}>
      <div className={styles.navContainer}>
        {/* Logo/Brand */}
        <div className={styles.brand}>
          <a href="#hero" onClick={() => scrollToSection('hero')}>
            <span className={styles.brandText}>Frederic</span>
            <span className={styles.brandAccent}>Wojcikowski</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className={styles.navLinks}>
          <a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a>
          <a href="#about" onClick={() => scrollToSection('about')}>About</a>
          <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
        </div>

        {/* Action Buttons */}
        <div className={styles.navActions}>
          {/* Theme Toggle */}
          <div className={styles.dropdownContainer} ref={themeDropdownRef}>
                         <button
               className={styles.actionButton}
               onClick={toggleThemeMenu}
               aria-label="Toggle theme"
               aria-expanded={isThemeMenuOpen}
             >
               <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                 {getThemeIcon()}
               </svg>
             </button>
            
            {isThemeMenuOpen && (
                             <div className={styles.dropdown}>
                 <button 
                   className={`${styles.dropdownItem} ${currentTheme === 'light' ? styles.selected : ''}`}
                   onClick={() => handleThemeChange('light')}
                 >
                   <svg viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                   </svg>
                   Light
                 </button>
                 <button 
                   className={`${styles.dropdownItem} ${currentTheme === 'dark' ? styles.selected : ''}`}
                   onClick={() => handleThemeChange('dark')}
                 >
                   <svg viewBox="0 0 24 24" fill="currentColor">
                     <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
                   </svg>
                   Dark
                 </button>
                 <button 
                   className={`${styles.dropdownItem} ${currentTheme === 'device' ? styles.selected : ''}`}
                   onClick={() => handleThemeChange('device')}
                 >
                   <svg viewBox="0 0 24 24" fill="currentColor">
                     <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
                   </svg>
                   Device
                 </button>
               </div>
            )}
          </div>

          {/* Language Toggle */}
          <div className={styles.dropdownContainer} ref={languageDropdownRef}>
            <button
              className={styles.actionButton}
              onClick={toggleLanguageMenu}
              aria-label="Change language"
              aria-expanded={isLanguageMenuOpen}
            >
              <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM18.92 8h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zM5.08 16h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.91-4.33-3.56zM8.03 8l2.95-2.95c-.32-1.25-.78-2.45-1.38-3.56-1.84.63-3.37 1.91-4.33 3.56h2.76zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zM14.59 19.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
              </svg>
            </button>
            
                         {isLanguageMenuOpen && (
               <div className={styles.dropdown}>
                 <button 
                   className={`${styles.dropdownItem} ${currentLanguage === 'english' ? styles.selected : ''}`}
                   onClick={() => handleLanguageChange('english')}
                 >
                   🇺🇸 English
                 </button>
                 <button 
                   className={`${styles.dropdownItem} ${currentLanguage === 'japanese' ? styles.selected : ''}`}
                   onClick={() => handleLanguageChange('japanese')}
                 >
                   🇯🇵 日本語
                 </button>
                 <button 
                   className={`${styles.dropdownItem} ${currentLanguage === 'french' ? styles.selected : ''}`}
                   onClick={() => handleLanguageChange('french')}
                 >
                   🇫🇷 Français
                 </button>
               </div>
             )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuButton}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <a href="#about" onClick={() => scrollToSection('about')}>About</a>
          <a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a>
          <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
