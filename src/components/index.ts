// Centralized component exports for clean imports
export { default as Hero } from './Hero'
export { default as Projects } from './Projects' 
export { default as About } from './About'
export { default as Contact } from './Contact'
export { default as Navigation } from './Navigation'
export { default as OptimizedImage } from './OptimizedImage'
export {
  HeroWithSuspense,
  ProjectsWithSuspense,
  AboutWithSuspense,
  ContactWithSuspense
} from './LazyComponents'

// Re-export all types from centralized types
export type * from '../types'