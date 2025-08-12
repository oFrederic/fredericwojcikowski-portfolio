// Centralized type definitions for the portfolio application

import { type ReactNode } from 'react'

// =============================================================================
// Theme Types
// =============================================================================

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
  isSystem: boolean;
}

// =============================================================================
// Common Base Types
// =============================================================================

export interface BaseProps {
  className?: string
  'data-testid'?: string
}

// =============================================================================
// Project Types
// =============================================================================

export type ProjectStatus = 'completed' | 'in-progress'
export type TechType = 'frontend' | 'backend' | 'database' | 'tool'

export interface Technology {
  name: string
  type: TechType
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  techStack: Technology[]
  liveUrl?: string
  githubUrl?: string
  status: ProjectStatus
  featured?: boolean
}

// =============================================================================
// Contact Types
// =============================================================================

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactMethod {
  icon: ReactNode
  title: string
  value: string
  description: string
  link?: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: ReactNode
}

// Form validation
export interface ValidationRule {
  required: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
}

export type FormErrors<T> = Partial<Record<keyof T, string>>
export type SubmitStatus = 'success' | 'error' | 'warning' | null

// =============================================================================
// About Types
// =============================================================================

export interface TechCategory {
  title: string
  icon: ReactNode
  technologies: string[]
}

export interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
}

export interface AboutStats {
  number: string
  label: string
}

// =============================================================================
// Performance & Optimization Types
// =============================================================================

export interface OptimizedImageProps extends BaseProps {
  src: string
  alt: string
  width?: number
  height?: number
  style?: React.CSSProperties
  placeholder?: string
  webpSrc?: string
  sizes?: string
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

// Web Vitals
export interface WebVitalMetric {
  name: 'CLS' | 'LCP' | 'FID' | 'FCP' | 'TTFB'
  value: number
  delta: number
  entries: PerformanceEntry[]
  id: string
}

// =============================================================================
// Component Props Types
// =============================================================================



export interface ProjectsProps extends BaseProps {
  title?: string
  subtitle?: string
  projects?: Project[]
  loading?: boolean
}

export interface AboutProps extends BaseProps {
  name?: string
  title?: string
  profileImage?: string
  email?: string
  location?: string
  website?: string
  bio?: string
  techStack?: TechCategory[]
  experience?: ExperienceItem[]
  stats?: AboutStats[]
}

export interface ContactProps extends BaseProps {
  title?: string
  subtitle?: string
  contactMethods?: ContactMethod[]
  socialLinks?: SocialLink[]
  onSubmit?: (data: ContactFormData) => Promise<boolean>
}

// =============================================================================
// Utility Types
// =============================================================================

// Intersection Observer options
export interface IntersectionConfig {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

// =============================================================================
// Constants
// =============================================================================

export const PROJECT_STATUSES = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
} as const

