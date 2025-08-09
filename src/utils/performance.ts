// Performance utilities for Core Web Vitals optimization
import type { IntersectionConfig, WebVitalMetric } from '../types'

// =============================================================================
// Resource Loading Utilities
// =============================================================================

/**
 * Critical font URLs for preloading
 */
const CRITICAL_FONTS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
] as const

/**
 * Resource hints for external domains
 */
const RESOURCE_HINTS = [
  { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
  { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
] as const

/**
 * Preload critical resources to improve LCP
 */
export const preloadCriticalResources = (): void => {
  if (typeof window === 'undefined') return

  CRITICAL_FONTS.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    link.as = 'style'
    link.onload = () => {
      link.rel = 'stylesheet'
    }
    document.head.appendChild(link)
  })
}

/**
 * Add resource hints for better loading performance
 */
export const addResourceHints = (): void => {
  if (typeof window === 'undefined') return

  RESOURCE_HINTS.forEach(hint => {
    const link = document.createElement('link')
    Object.assign(link, hint)
    document.head.appendChild(link)
  })
}



// =============================================================================
// Intersection Observer Utilities
// =============================================================================

/**
 * Create an optimized intersection observer for lazy loading
 */
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionConfig
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px', // Start loading 50px before element enters viewport
    threshold: 0.1
  }
  
  return new IntersectionObserver(callback, { ...defaultOptions, ...options })
}

// =============================================================================
// Performance Utilities
// =============================================================================

/**
 * Smooth scroll to element with performance optimization
 */
export const smoothScrollTo = (elementId: string): void => {
  const element = document.getElementById(elementId.replace('#', ''))
  if (!element) return

  // Use native smooth scroll for better performance
  element.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start',
    inline: 'nearest'
  })
}

// =============================================================================
// Image Utilities
// =============================================================================

/**
 * Check if browser supports WebP format
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const dataURL = canvas.toDataURL('image/webp')
    resolve(dataURL.indexOf('data:image/webp') === 0)
  })
}

// =============================================================================
// Web Vitals Measurement
// =============================================================================

/**
 * Web Vitals measurement helper for development
 */
export const measureWebVitals = (callback?: (metric: WebVitalMetric) => void): void => {
  if (typeof window === 'undefined') return

  try {
    // Measure CLS (Cumulative Layout Shift)
    let cls = 0
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as PerformanceEntry & { 
          hadRecentInput: boolean
          value: number 
        }
        if (!layoutShiftEntry.hadRecentInput) {
          cls += layoutShiftEntry.value
        }
      }
      const metric: WebVitalMetric = {
        name: 'CLS',
        value: cls,
        delta: cls,
        entries: list.getEntries(),
        id: `cls-${Date.now()}`
      }
      if (callback) {
        callback(metric)
      } else if (import.meta.env.DEV) {
        console.warn('CLS:', cls)
      }
    }).observe({ type: 'layout-shift', buffered: true })
    
    // Measure LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      const metric: WebVitalMetric = {
        name: 'LCP',
        value: lastEntry.startTime,
        delta: lastEntry.startTime,
        entries,
        id: `lcp-${Date.now()}`
      }
      if (callback) {
        callback(metric)
      } else if (import.meta.env.DEV) {
        console.warn('LCP:', lastEntry.startTime)
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true })
    
    // Measure FID (First Input Delay)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as PerformanceEntry & { processingStart: number }
        const fid = fidEntry.processingStart - entry.startTime
        const metric: WebVitalMetric = {
          name: 'FID',
          value: fid,
          delta: fid,
          entries: [entry],
          id: `fid-${Date.now()}`
        }
        if (callback) {
          callback(metric)
        } else if (import.meta.env.DEV) {
          console.warn('FID:', fid)
        }
      }
    }).observe({ type: 'first-input', buffered: true })
  } catch (error) {
    console.warn('Web Vitals measurement failed:', error)
  }
}