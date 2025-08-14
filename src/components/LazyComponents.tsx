// Simplified lazy loading for code splitting optimization
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'

// Reusable loading component with consistent styling
const LoadingSpinner = ({ height = '400px' }: { height?: string }) => {
  const { t } = useTranslation();
  
  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height,
        background: 'var(--color-background-alt)',
        borderRadius: 'var(--radius-2xl)',
        color: 'var(--color-text-muted)'
      }}
      aria-live="polite"
      aria-label="Loading content"
    >
      <div style={{ textAlign: 'center' }}>
        <div 
          style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid var(--color-border)', 
            borderTop: '3px solid var(--color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}
          aria-hidden="true"
        />
        <p>{t('common.loading')}</p>
      </div>
    </div>
  )
}

// Lazy loaded components with clean imports
const LazyHero = lazy(() => import('./Hero'))
const LazyProjects = lazy(() => import('./Projects'))
const LazyAbout = lazy(() => import('./About'))
const LazyContact = lazy(() => import('./Contact'))

// Suspense wrappers with proper fallbacks
export const HeroWithSuspense = () => (
  <Suspense fallback={<LoadingSpinner height="100vh" />}>
    <LazyHero />
  </Suspense>
)

export const ProjectsWithSuspense = () => (
  <Suspense fallback={<LoadingSpinner height="80vh" />}>
    <LazyProjects />
  </Suspense>
)

export const AboutWithSuspense = () => (
  <Suspense fallback={<LoadingSpinner height="80vh" />}>
    <LazyAbout />
  </Suspense>
)

export const ContactWithSuspense = () => (
  <Suspense fallback={<LoadingSpinner height="80vh" />}>
    <LazyContact />
  </Suspense>
)