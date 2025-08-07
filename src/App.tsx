import { useEffect } from 'react';
import {
  HeroWithSuspense,
  ProjectsWithSuspense,
  AboutWithSuspense,
  ContactWithSuspense
} from './components/LazyComponents';
import { preloadCriticalResources, addResourceHints, measureWebVitals } from './utils/performance';

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
    <div className="App">
      {/* Hero Section - Critical above-the-fold content */}
      <HeroWithSuspense />
      
      {/* Below-the-fold sections - lazy loaded */}
      <ProjectsWithSuspense />
      <AboutWithSuspense />
      <ContactWithSuspense />
    </div>
  );
}

export default App;
