import React from 'react'
import type { ProjectsProps, Project, ProjectStatus } from '../../types'
import { PROJECT_STATUSES } from '../../types'
import OptimizedImage from '../OptimizedImage'
import styles from './Projects.module.css'

// Demo project data
const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Modern Portfolio Website',
    description: 'A high-performance portfolio built with React 19, TypeScript, and cutting-edge CSS features including container queries, CSS nesting, and CSS Modules for optimal user experience.',
    image: '/images/projects/portfolio-website-screenshot.png', // Example: Add your screenshot here
    imageAlt: 'Screenshot of Modern Portfolio Website homepage showing hero section and project cards',
    techStack: [
      { name: 'React 19', type: 'frontend' },
      { name: 'TypeScript', type: 'frontend' },
      { name: 'Vite', type: 'tool' },
      { name: 'CSS Modules', type: 'frontend' },
      { name: 'Container Queries', type: 'frontend' }
    ],
    liveUrl: 'https://fredericwojcikowski-portfolio.netlify.app/',
    githubUrl: 'https://github.com/oFrederic/fredericwojcikowski-portfolio',
    status: PROJECT_STATUSES.IN_PROGRESS,
    featured: true
  },
  {
    id: '2',
    title: 'E-Commerce Platform (Placeholder)',
    description: 'Full-stack e-commerce solution with modern payment integration, real-time inventory management, and advanced analytics dashboard.',
    techStack: [
      { name: 'Next.js', type: 'frontend' },
      { name: 'Node.js', type: 'backend' },
      { name: 'PostgreSQL', type: 'database' },
      { name: 'Stripe', type: 'tool' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: PROJECT_STATUSES.COMPLETED
  },
  {
    id: '3',
    title: 'Task Management App (Placeholder)',
    description: 'Collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.',
    techStack: [
      { name: 'React', type: 'frontend' },
      { name: 'Express', type: 'backend' },
      { name: 'MongoDB', type: 'database' },
      { name: 'Socket.io', type: 'tool' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: PROJECT_STATUSES.COMPLETED
  },
  {
    id: '4',
    title: 'AI Content Generator (Placeholder)',
    description: 'AI-powered content generation platform with natural language processing, multiple output formats, and custom model training.',
    techStack: [
      { name: 'Python', type: 'backend' },
      { name: 'React', type: 'frontend' },
      { name: 'OpenAI', type: 'tool' },
      { name: 'Redis', type: 'database' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: PROJECT_STATUSES.IN_PROGRESS
  },
  {
    id: '5',
    title: 'Analytics Dashboard (Placeholder)',
    description: 'Real-time analytics dashboard with interactive charts, data visualization, and automated reporting for business intelligence.',
    techStack: [
      { name: 'Vue.js', type: 'frontend' },
      { name: 'Laravel', type: 'backend' },
      { name: 'MySQL', type: 'database' },
      { name: 'Chart.js', type: 'tool' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: PROJECT_STATUSES.COMPLETED
  },
  {
    id: '6',
    title: 'Mobile Fitness App (Placeholder)',
    description: 'Cross-platform mobile application for fitness tracking, workout planning, and social features with gamification elements.',
    techStack: [
      { name: 'React Native', type: 'frontend' },
      { name: 'Firebase', type: 'backend' },
      { name: 'Firestore', type: 'database' },
      { name: 'Expo', type: 'tool' }
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: PROJECT_STATUSES.COMPLETED
  }
];

const Projects: React.FC<ProjectsProps> = ({
  title = "My Projects",
  subtitle = "A showcase of recent work demonstrating modern web development practices, performance optimization, and user-centered design.",
  projects = defaultProjects,
  loading = false
}) => {
  const getStatusText = (status: ProjectStatus): string => {
    const statusMap: Record<ProjectStatus, string> = {
      [PROJECT_STATUSES.COMPLETED]: 'Completed',
      [PROJECT_STATUSES.IN_PROGRESS]: 'In Progress',
    }
    
    return statusMap[status] || 'Completed'
  }

  const handleProjectClick = (project: Project, action: 'live' | 'github') => {
    const url = action === 'live' ? project.liveUrl : project.githubUrl;
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn(`${action} clicked for:`, project.title)
    }
  };

  const renderProjectCard = (project: Project) => (
    <article
      key={project.id}
      className={`${styles.projectCard} ${loading ? styles.loading : ''}`}
    >
      {/* Featured Ribbon */}
      {project.featured && (
        <div className={styles.featuredRibbon}>
          Featured
        </div>
      )}
      
      {/* Project Image */}
      <div className={styles.projectImage}>
        {project.image ? (
          <OptimizedImage 
            src={project.image} 
            webpSrc={project.image.replace(/\.(png|jpg|jpeg)$/i, '.webp')}
            alt={project.imageAlt || `${project.title} screenshot`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={project.featured}
            className={styles.projectImageImg}
          />
        ) : (
          // Placeholder gradient for demo
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${
                project.techStack[0]?.type === 'frontend' ? 'var(--color-primary)' :
                project.techStack[0]?.type === 'backend' ? 'var(--color-secondary)' :
                '#059669'
              }, ${
                project.techStack[1]?.type === 'frontend' ? 'var(--color-primary)' :
                project.techStack[1]?.type === 'backend' ? 'var(--color-secondary)' :
                '#d97706'
              })`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 'var(--font-size-4xl)',
              fontWeight: 'var(--font-weight-bold)'
            }}
          >
            {project.title.charAt(0)}
          </div>
        )}
        
        {/* Project Status Badge */}
        <div className={styles.projectStatus}>
          {getStatusText(project.status)}
        </div>
        
        {/* Hover Overlay */}
        <div className={styles.projectOverlay}>
          {project.liveUrl && (
            <button
              className={styles.overlayButton}
              onClick={() => handleProjectClick(project, 'live')}
              aria-label={`View ${project.title} live demo`}
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-7h-2v7z"/>
              </svg>
            </button>
          )}
          
          {project.githubUrl && (
            <button
              className={styles.overlayButton}
              onClick={() => handleProjectClick(project, 'github')}
              aria-label={`View ${project.title} source code`}
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Project Content */}
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>
          <a 
            href={project.liveUrl || '#'} 
            onClick={(e) => {
              if (!project.liveUrl || project.liveUrl === '#') {
                e.preventDefault();
                console.warn('Project clicked:', project.title)
              }
            }}
          >
            {project.title}
          </a>
        </h3>
        
        <p className={styles.projectDescription}>
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className={styles.projectTechStack}>
          {project.techStack.map((tech, index) => (
            <span 
              key={index}
              className={styles.techTag}
              data-type={tech.type}
            >
              {tech.name}
            </span>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className={styles.projectActions}>
          {project.liveUrl && (
            <button
              className={`${styles.actionButton} ${styles.primary}`}
              onClick={() => handleProjectClick(project, 'live')}
              type="button"
            >
              <span>Live Demo</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
              </svg>
            </button>
          )}
          
          {project.githubUrl && (
            <button
              className={`${styles.actionButton} ${styles.secondary}`}
              onClick={() => handleProjectClick(project, 'github')}
              type="button"
            >
              <span>View Code</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );

  return (
    <section id="projects" className={styles.projectsSection} aria-labelledby="projects-title">
      <div className="container">
        {/* Section Header */}
        <header className={styles.sectionHeader}>
          <h2 id="projects-title" className={styles.sectionTitle}>
            {title}
          </h2>
          <p className={styles.sectionSubtitle}>
            {subtitle}
          </p>
        </header>
        
        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {projects.map(renderProjectCard)}
        </div>
      </div>
    </section>
  );
};

export default Projects;