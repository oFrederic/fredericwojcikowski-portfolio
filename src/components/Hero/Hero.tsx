import React from 'react'
import { useTranslation } from 'react-i18next'
import { smoothScrollTo } from '../../utils/performance'
import styles from './Hero.module.css'

const Hero: React.FC = () => {
  const { t } = useTranslation();

  const handleScroll = (href: string): void => {
    if (href.startsWith('#')) {
      smoothScrollTo(href)
    } else {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }



  return (
    <section 
      id="hero"
      className={styles.heroSection}
      aria-label="Hero section"
    >
      {/* Animated background */}
      <div className={styles.heroBackground} aria-hidden="true" />
      
      <div className={`${styles.heroContainer} container`}>
        {/* Hero Content */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {t('hero.title')}
          </h1>
          
          <p className={styles.heroSubtitle}>
            {t('hero.subtitle')}
          </p>
          
          <div className={styles.heroActions}>
            <button
              className={`${styles.ctaButton} ${styles.primary}`}
              onClick={() => handleScroll('#projects')}
              type="button"
            >
              {t('hero.actions.exploreProjects')}
              <span aria-hidden="true">→</span>
            </button>
            
            <button
              className={`${styles.ctaButton} ${styles.secondary}`}
              onClick={() => handleScroll('#contact')}
              type="button"
            >
              {t('hero.actions.contactMe')}
            </button>
          </div>
        </div>
        
        {/* Hero Visual - Only visible on larger screens via container queries */}
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.visualElement}>
            <div className={styles.techOrbit}>
              {/* Internet icon symbol */}
              <div className={styles.centerSymbol}>
                <svg width="60" height="55" viewBox="0 0 122.88 113.6" xmlns="http://www.w3.org/2000/svg">
                  <title>internet</title>
                  <path d="M71.89,100.56q-3.86,3.82-8.37,7.63c1.26-.17,2.52-.38,3.74-.62a49.38,49.38,0,0,0,7.08-2c.14.22.28.43.43.64.37.51.71.94,1,1.27l0,0,0,0a16.4,16.4,0,0,0,2.13,2,55.29,55.29,0,0,1-9.73,2.92,58.73,58.73,0,0,1-22.83,0,53.48,53.48,0,0,1-10.6-3.27.26.26,0,0,1-.14-.07A62.1,62.1,0,0,1,25,103.89,54.41,54.41,0,0,1,16.6,97a52.69,52.69,0,0,1-6.89-8.38A59.79,59.79,0,0,1,4.46,79,55.79,55.79,0,0,1,1.12,68.22a58.73,58.73,0,0,1,0-22.83A52.86,52.86,0,0,1,4.4,34.79a.33.33,0,0,1,.06-.14A60.34,60.34,0,0,1,9.71,25a54,54,0,0,1,6.89-8.39A52.19,52.19,0,0,1,25,9.71a59.7,59.7,0,0,1,9.67-5.25A54.52,54.52,0,0,1,45.39,1.12a58.73,58.73,0,0,1,22.83,0,53.89,53.89,0,0,1,10.6,3.27.28.28,0,0,1,.13.07,61.75,61.75,0,0,1,9.68,5.25A54.41,54.41,0,0,1,97,16.59,52.27,52.27,0,0,1,103.89,25a58.19,58.19,0,0,1,5.25,9.67,54.52,54.52,0,0,1,3.34,10.74l.12.6-5.42-1.53a47,47,0,0,0-2.6-7.83,54.22,54.22,0,0,0-2.87-5.76H85.08a65.47,65.47,0,0,1,4.2,8.49c-2.07-.57-4.13-1.13-6.16-1.66a65.73,65.73,0,0,0-3.86-6.83h-20v3.41l-.61.22a13.48,13.48,0,0,0-4.36,2.68V30.87h-20q-7.67,11.91-8.62,23.44H51.24q1,2.47,2.09,5H25.62c.31,7.87,3,15.67,7.88,23.44H54.32V61.56c1.59,3.63,3.27,7.29,5,11V82.73h4.76c.77,1.66,1.53,3.31,2.29,5H59.29v17.51a123.84,123.84,0,0,0,10.53-9.65q1.05,2.49,2.07,5ZM114.75,98a4.64,4.64,0,0,1-1.17.79l-.08,0a4.14,4.14,0,0,1-4.36-.6l-11.6-9.84-4,9.77a12.93,12.93,0,0,1-1.19,2.25,9.1,9.1,0,0,1-1.51,1.76,4.78,4.78,0,0,1-7.5-.82,9.28,9.28,0,0,1-.92-1.63c-6.9-17.49-16.26-34.9-23.26-52.4A3.11,3.11,0,0,1,62.65,43c16.77,3.1,38.5,10.19,55.55,14.71,5.3,1.4,6.16,6.07,2.25,9.69a12.21,12.21,0,0,1-2,1.52c-3,1.7-6,3.67-9,5.47l11.55,9.9a4.25,4.25,0,0,1,1,1.26l0,.08a4.28,4.28,0,0,1,.39,1.47v0a4.26,4.26,0,0,1-.16,1.54,4.39,4.39,0,0,1-.72,1.39A94.55,94.55,0,0,1,114.75,98Zm-3-3.84,5.59-6.56c-2.46-2.11-13-10.29-14.09-12.26a2.41,2.41,0,0,1,.83-3.25c3.66-2,8.36-4.86,11.83-7.17a8.38,8.38,0,0,0,1.22-.89,4.42,4.42,0,0,0,.75-.87l.16-.3-.31-.18a3.92,3.92,0,0,0-.76-.26L65,48.6,86.83,97.74a4.8,4.8,0,0,0,.38.7l.22.29.28-.2a4.51,4.51,0,0,0,.73-.89,7.51,7.51,0,0,0,.68-1.33c1.63-4,3.49-9.47,5.4-13.17l.23-.32a2.4,2.4,0,0,1,3.37-.27l13.64,11.57ZM50.13,108.19A105.56,105.56,0,0,1,30.87,87.71H15.16a51.5,51.5,0,0,0,12.61,12,52.81,52.81,0,0,0,8.89,4.8s.07,0,.11.07a49.13,49.13,0,0,0,9.64,3c1.23.24,2.49.45,3.75.62ZM11.89,82.73H27.7a50.6,50.6,0,0,1-7-23.44H5a55.75,55.75,0,0,0,1,7.94A48.27,48.27,0,0,0,9,77a54.16,54.16,0,0,0,2.86,5.76ZM5,54.31H20.75a54.38,54.38,0,0,1,7.77-23.44H11.89A54.16,54.16,0,0,0,9,36.63s0,.07-.07.1a49.91,49.91,0,0,0-3,9.65,51.46,51.46,0,0,0-1,7.93ZM15.13,25.9H31.72A117.72,117.72,0,0,1,50.46,5.35c-1.39.17-2.76.37-4.08.65a48.36,48.36,0,0,0-9.75,3,55.24,55.24,0,0,0-8.89,4.8,51.5,51.5,0,0,0-12.61,12v0Zm48-20.55A114.63,114.63,0,0,1,81.88,25.9h16.6a48.63,48.63,0,0,0-5-5.76,49.81,49.81,0,0,0-7.63-6.27A53.27,53.27,0,0,0,77,9.06s-.06,0-.1-.06a49.15,49.15,0,0,0-9.64-3c-1.36-.27-2.73-.48-4.09-.65v0ZM59.29,8.59V25.9H75.78A115.68,115.68,0,0,0,59.29,8.59Zm-5,96.63V87.71H37a105.67,105.67,0,0,0,17.35,17.51Zm0-79.32V8.59A116.3,116.3,0,0,0,37.82,25.9Z" 
                        fill="currentColor"/>
                </svg>
              </div>
              
              {/* Floating Tech Stack Icons */}
              <div className={styles.techIcon} data-tech="react" style={{'--orbit-radius': '140px', '--orbit-duration': '35s', '--start-angle': '0deg', '--z-index': '3'} as React.CSSProperties}>
                <svg width="40" height="40" viewBox="-10.5 -9.45 21 18.9" fill="var(--color-react)">
                  <circle cx="0" cy="0" r="2"></circle>
                  <g stroke="var(--color-react)" strokeWidth="1" fill="none">
                    <ellipse rx="10" ry="4.5"></ellipse>
                    <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                    <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                  </g>
                </svg>
                <span className={styles.techLabel}>React</span>
              </div>
              
              <div className={styles.techIcon} data-tech="vue" style={{'--orbit-radius': '80px', '--orbit-duration': '25s', '--start-angle': '120deg', '--z-index': '2'} as React.CSSProperties}>
                <svg width="36" height="36" viewBox="0 0 261.76 226.69" fill="none">
                  <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
                    <g transform="translate(178.06 235.01)">
                      <path d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z" fill="var(--color-vue)"/>
                    </g>
                    <g transform="translate(178.06 235.01)">
                      <path d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z" fill="var(--color-secondary-dark)"/>
                    </g>
                  </g>
                </svg>
                <span className={styles.techLabel}>Vue.js</span>
              </div>
              
              <div className={styles.techIcon} data-tech="typescript" style={{'--orbit-radius': '140px', '--orbit-duration': '35s', '--start-angle': '120deg', '--z-index': '2'} as React.CSSProperties}>
                <svg width="38" height="38" viewBox="0 0 512 512" fill="none">
                  <rect fill="var(--color-typescript)" height="512" rx="50" width="512"/>
                  <path clipRule="evenodd" d="m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z" fill="var(--color-text-light)" fillRule="evenodd"/>
                </svg>
                <span className={styles.techLabel}>TypeScript</span>
              </div>
              
              <div className={styles.techIcon} data-tech="javascript" style={{'--orbit-radius': '80px', '--orbit-duration': '25s', '--start-angle': '0deg', '--z-index': '3'} as React.CSSProperties}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                </svg>
                <span className={styles.techLabel}>JavaScript</span>
              </div>
              
              <div className={styles.techIcon} data-tech="css" style={{'--orbit-radius': '80px', '--orbit-duration': '25s', '--start-angle': '240deg', '--z-index': '1'} as React.CSSProperties}>
                <svg width="36" height="36" viewBox="0 0 124 141.53" fill="none">
                  <path d="M10.383 126.892L0 0l124 .255-10.979 126.637-50.553 14.638z" fill="var(--color-css)"/>
                  <path d="M62.468 129.275V12.085l51.064.17-9.106 104.85z" fill="var(--color-css)"/>
                  <path d="M100.851 27.064H22.298l2.128 15.318h37.276l-36.68 15.745 2.127 14.808h54.043l-1.958 20.68-18.298 3.575-16.595-4.255-1.277-11.745H27.83l2.042 24.426 32.681 9.106 31.32-9.957 4-47.745H64.765l36.085-14.978z" fill="var(--color-text-light)"/>
                </svg>
                <span className={styles.techLabel}>CSS3</span>
              </div>
              
              <div className={styles.techIcon} data-tech="vite" style={{'--orbit-radius': '140px', '--orbit-duration': '35s', '--start-angle': '240deg', '--z-index': '1'} as React.CSSProperties}>
                <svg width="36" height="36" viewBox="0 0 410 404" fill="none">
                  <defs>
                    <linearGradient id="paint0_linear" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#41D1FF"/>
                      <stop offset="1" stopColor="#BD34FE"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFEA83"/>
                      <stop offset="0.0833333" stopColor="#FFDD35"/>
                      <stop offset="1" stopColor="#FFA800"/>
                    </linearGradient>
                  </defs>
                  <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#paint0_linear)"/>
                  <path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="url(#paint1_linear)"/>
                </svg>
                <span className={styles.techLabel}>Vite</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} role="button" tabIndex={0}>
        <span>{t('hero.scrollIndicator')}</span>
      </div>
    </section>
  );
};

export default Hero;