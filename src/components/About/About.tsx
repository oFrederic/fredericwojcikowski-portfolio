import React from 'react'
import { useTranslation } from 'react-i18next'
import type { AboutProps, TechCategory, ExperienceItem, AboutStats } from '../../types'
import { OptimizedImage } from '../OptimizedImage'
import styles from './About.module.css'

// Default data
const defaultTechStack: TechCategory[] = [
  {
    title: 'Frontend',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.categoryIcon}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    technologies: ['React', 'TypeScript', 'Vue.js', 'Ember.js', 'Redux', 'Xstate', 'Next.js', 'Nuxt', 'JavaScript ES6+', 'HTML5', 'CSS3']
  },
  {
    title: 'Testing & Tools',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.categoryIcon}>
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
      </svg>
    ),
    technologies: ['Jest', 'Enzyme', 'Storybook', 'Vite', 'Vitest', 'Git', 'Figma']
  },
  {
    title: 'State Management',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.categoryIcon}>
        <path d="M4 6v12h16V6H4zm14 10H6V8h12v8z"/>
      </svg>
    ),
    technologies: ['Redux', 'Xstate', 'Vuex', 'Context API', 'Local State Management']
  },
  {
    title: 'Legacy & Modernization',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.categoryIcon}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    technologies: ['Legacy Code Migration', 'CoffeeScript to TypeScript', 'Ember.js v2 to v6', 'Design System Overhaul', 'Feature Flags']
  }
];

const createDefaultExperience = (t: (key: string) => string): ExperienceItem[] => [
  {
    title: t('about.experience.items.tablecheck.title'),
    company: t('about.experience.items.tablecheck.company'),
    period: t('about.experience.items.tablecheck.period'),
    description: t('about.experience.items.tablecheck.description')
  },
  {
    title: t('about.experience.items.neopa.title'),
    company: t('about.experience.items.neopa.company'),
    period: t('about.experience.items.neopa.period'),
    description: t('about.experience.items.neopa.description')
  },
  {
    title: t('about.experience.items.airamp.title'),
    company: t('about.experience.items.airamp.company'),
    period: t('about.experience.items.airamp.period'),
    description: t('about.experience.items.airamp.description')
  }
];

const createDefaultStats = (t: (key: string) => string): AboutStats[] => [
  { number: '4+', label: t('about.stats.items.experience.label') },
  { number: '3', label: t('about.stats.items.languages.label') },
  { number: '8+', label: t('about.stats.items.technologies.label') },
  { number: '2', label: t('about.stats.items.platforms.label') }
];

const About: React.FC<AboutProps> = ({
  name,
  title,
  profileImage = "/images/profile/frederic-wojcikowski-profile.jpg",
  email = "wojcikowskif@gmail.com",
  location,
  website = "fredericwojcikowski-portfolio.netlify.app",
  bio,
  techStack,
  experience,
  stats
}) => {
  const { t } = useTranslation();

  // Use translations for default values
  const defaultName = `${t('navigation.brand.firstName')} ${t('navigation.brand.lastName')}`;
  const defaultTitle = "Frontend Engineer"; // Keep this as is since it's a job title
  const defaultLocation = t('contact.methods.location.value'); // Use translated location
  const defaultBio = t('about.bio.main');
  
  const finalName = name || defaultName;
  const finalTitle = title || defaultTitle;
  const finalLocation = location || defaultLocation;
  const finalBio = bio || defaultBio;
  
  // Create default data with translations
  const defaultTechStackData = defaultTechStack;
  const defaultExperienceData = createDefaultExperience(t);
  const defaultStatsData = createDefaultStats(t);
  
  const finalTechStack = techStack || defaultTechStackData;
  const finalExperience = experience || defaultExperienceData;
  const finalStats = stats || defaultStatsData;
  return (
    <section id="about" className={styles.aboutSection} aria-labelledby="about-title">
      <div className="container">
        <div className={styles.aboutContainer}>
          {/* Profile Section */}
          <div className={styles.aboutProfile}>
            <div className={styles.profileImage}>
              <OptimizedImage
                src={profileImage}
                alt={`${name} - ${title}`}
                className={styles.profilePhoto}
                width={200}
                height={200}
                priority={true}
                webpSrc={profileImage.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
              />
            </div>
            
            <h2 className={styles.profileName}>{finalName}</h2>
            <p className={styles.profileTitle}>{finalTitle}</p>
            
            {/* Contact Information */}
            <div className={styles.profileContact}>
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
              
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{finalLocation}</span>
              </div>
              
              <div className={styles.contactItem}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM19 19H5V5h7V3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-7h-2v7z"/>
                </svg>
                <a href={`https://${website}`} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </div>
            </div>
          </div>
          
          {/* About Content */}
          <div className={styles.aboutContent}>
            {/* Bio Section */}
            <div className={styles.contentSection}>
              <h3 id="about-title" className={styles.sectionTitle}>{t('about.title')}</h3>
              <div className={styles.sectionContent}>
                <p>{finalBio}</p>
                <p>
                  {t('about.bio.hobby')}
                </p>
              </div>
            </div>
            
            {/* Tech Stack Section */}
            <div className={`${styles.contentSection} ${styles.techStack}`}>
              <h3 className={styles.sectionTitle}>{t('about.techStack.title')}</h3>
              <div className={styles.techCategories}>
                {finalTechStack.map((category, index) => (
                  <div key={index} className={styles.techCategory}>
                    <h4 className={styles.categoryTitle}>
                      {category.icon}
                      {category.title}
                    </h4>
                    <div className={styles.techList}>
                      {category.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className={styles.techItem}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Experience Section */}
            <div className={`${styles.contentSection} ${styles.experienceTimeline}`}>
              <h3 className={styles.sectionTitle}>{t('about.experience.title')}</h3>
              <div className={styles.timelineList}>
                {finalExperience.map((item, index) => (
                  <div key={index} className={styles.timelineItem}>
                    <div className={styles.itemHeader}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <p className={styles.itemCompany}>{item.company}</p>
                      <p className={styles.itemPeriod}>{item.period}</p>
                    </div>
                    <p className={styles.itemDescription}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stats Section */}
            <div className={`${styles.contentSection} ${styles.aboutStats}`}>
              <h3 className={styles.sectionTitle}>{t('about.stats.title')}</h3>
              <div className={styles.statsGrid}>
                {finalStats.map((stat, index) => (
                  <div key={index} className={styles.statItem}>
                    <div className={styles.statNumber}>{stat.number}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;