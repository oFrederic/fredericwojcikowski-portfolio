import { useEffect } from 'react';
import { Navigation } from './components';
import {
  HeroWithSuspense,
  ProjectsWithSuspense,
  AboutWithSuspense,
  ContactWithSuspense
} from './components/LazyComponents';
import { preloadCriticalResources, addResourceHints, measureWebVitals } from './utils/performance';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  useEffect(() => {
    // Initialize performance optimizations
    preloadCriticalResources();
    addResourceHints();
    
    // Measure Web Vitals in development
    if (import.meta.env.DEV) {
      measureWebVitals();
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        {/* Navigation - Fixed at top */}
        <Navigation />
        
        {/* Hero Section - Critical above-the-fold content */}
        <HeroWithSuspense />
        

        
        {/* Below-the-fold sections - lazy loaded */}
        <ProjectsWithSuspense />
        <AboutWithSuspense />
        <ContactWithSuspense />
      </div>
    </ThemeProvider>
  );
}

export default App;
