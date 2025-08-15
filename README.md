# 🚀 Frederic Wojcikowski - Frontend Engineer Portfolio

<div align="center">

![Portfolio Banner](https://via.placeholder.com/1200x300/2563eb/ffffff?text=Frederic+Wojcikowski+Portfolio)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=netlify)](https://fredericwojcikowski-portfolio.netlify.app/)
[![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=flat-square&logo=lighthouse)](https://web.dev/performance-scoring/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.6-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)

**A high-performance, modern portfolio showcasing frontend engineering expertise**

[🌟 Live Demo](https://fredericwojcikowski-portfolio.netlify.app/) • [📊 Performance Report](./WEB_OPTIMIZATION_REPORT.md) • [💼 LinkedIn](https://linkedin.com/in/fredericwojcikowski)

</div>

---

## 👨‍💻 About Me

I'm **Frederic Wojcikowski**, a Frontend Engineer with over 4 years of experience specializing in React, Vue.js, and legacy system modernization. Based in Tokyo, Japan, I transform complex concepts into scalable web applications for Japanese and international markets.

### 🎯 Core Expertise
- **Modern Frontend Development**: React 19, TypeScript, Vue.js, Ember.js
- **Legacy System Modernization**: CoffeeScript to TypeScript migration, Ember.js v2 to v6 upgrades
- **Performance Optimization**: 100/100 Lighthouse scores, Core Web Vitals optimization
- **Cross-Cultural Collaboration**: Experience in Japanese business environments
- **Team Leadership**: Mentoring junior engineers and overseeing dual-platform development

---

## ✨ Portfolio Highlights

- **Perfect Performance**: 100/100 Lighthouse scores across all metrics
- **Modern Tech Stack**: React 19, TypeScript, Vite, Modern CSS with Container Queries
- **Optimized Bundle**: 73kB gzipped with strategic code splitting
- **Responsive Design**: Mobile-first with CSS Container Queries and modern layouts
- **Accessibility**: Full WCAG compliance and keyboard navigation
- **Theme System**: Light, dark, and system theme modes with persistent preferences
- **Internationalization**: Multi-language support (English, Japanese, French) with automatic detection
- **Performance Monitoring**: Automated Lighthouse CI and bundle analysis

---

## 🛠️ Technical Stack

### **Core Technologies**
- **React 19** - Latest features and optimizations
- **TypeScript** - Strict mode for type safety
- **Vite** - Lightning-fast build tool and dev server
- **Modern CSS** - Container Queries, Nesting, CSS Modules

### **Frontend Expertise**
- **React Ecosystem**: React 19, Redux, Context API, React Hooks
- **Vue.js**: Vue 3, Vuex, Nuxt.js
- **Legacy Systems**: Ember.js v2-v6, CoffeeScript migration
- **State Management**: Redux, Xstate, Vuex, Context API
- **Testing**: Jest, Enzyme, Storybook, Vitest

### **Performance & Quality**
- **Lighthouse CI** - Automated performance testing
- **ESLint + Prettier** - Code quality and formatting
- **Bundle Analysis** - Size optimization and monitoring
- **Image Optimization** - WebP conversion and lazy loading

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/oFrederic/fredericwojcikowski-portfolio.git
cd fredericwojcikowski-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lighthouse   # Run performance audit
npm run optimize-images # Optimize project images
```

---

## 📊 Performance Metrics

<div align="center">

| Metric | Score | Target | Status |
|--------|--------|---------|---------|
| **Performance** | 100/100 | 90+ | ✅ Perfect |
| **Accessibility** | 100/100 | 95+ | ✅ Perfect |
| **Best Practices** | 96/100 | 95+ | ✅ Excellent |
| **SEO** | 100/100 | 95+ | ✅ Perfect |

### Core Web Vitals
| Metric | Value | Target | Performance |
|--------|-------|---------|-------------|
| **LCP** | 715ms | <2.5s | 🚀 71% better |
| **FCP** | 365ms | <1.8s | 🚀 80% better |
| **CLS** | 0.002 | <0.1 | 🚀 98% better |
| **TBT** | 0ms | <300ms | 🚀 Perfect |

</div>

---

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Hero/           # Landing section with animated tech stack
│   ├── Projects/       # Portfolio showcase with lazy loading
│   ├── About/          # Professional experience and skills
│   ├── Contact/        # Contact form with validation
│   └── Navigation/     # Navigation with theme/language toggles
├── contexts/           # React Context providers
│   └── ThemeContext.tsx # Theme management system
├── hooks/              # Custom React hooks
│   ├── useTheme.ts     # Theme utilities
│   └── useLanguage.ts  # Language management
├── locales/            # Translation files
│   ├── en/             # English translations
│   ├── ja/             # Japanese translations
│   └── fr/             # French translations
├── styles/             # Global styles
│   ├── variables.css   # Design tokens
│   ├── themes/         # Theme-specific styles
│   └── globals.css     # Base styles
├── utils/              # Utility functions
└── types/              # TypeScript definitions
```

---

## 🌟 Key Features

### **Theme System**
- **Multiple Themes**: Light, dark, and system theme modes
- **Persistent Preferences**: Theme choice saved in localStorage
- **System Integration**: Automatically follows OS theme preference
- **Smooth Transitions**: CSS transitions for theme switching
- **Accessibility**: High contrast ratios maintained across themes

### **Internationalization (i18n)**
- **Multi-Language Support**: English, Japanese, and French
- **Automatic Detection**: Detects browser language preference
- **Language Persistence**: Selected language saved in localStorage
- **SEO Optimized**: Dynamic `lang` attribute updates
- **Flag Icons**: Visual language selection with country flags

### **Performance Optimizations**
- **Code Splitting**: Lazy loading of non-critical components
- **Image Optimization**: WebP conversion with fallbacks
- **Bundle Analysis**: Continuous monitoring of bundle size
- **Resource Hints**: Preloading critical resources
- **Web Vitals**: Real-time performance monitoring

---

## 📷 Adding Project Screenshots

### Quick Setup
1. **Add your screenshot image** to the `public/images/projects/` folder
2. **Optimize the image** by running `npm run optimize-images`
3. **Update your project data** in `src/components/Projects/Projects.tsx`

### Step-by-Step Guide

#### 1. Take Your Screenshot
**Easy browser method** (recommended):
1. Run `npm run preview` to start your site
2. Open `http://localhost:4173` in Chrome/Edge
3. Press `F12` → `Ctrl+Shift+P` → type "screenshot"
4. Select **"Capture full size screenshot"**
5. Save to `public/images/projects/`

#### 2. Optimize Your Images 
**Run the optimization script** (this creates WebP versions):
```bash
npm run optimize-images
```

**What this does:**
- Creates WebP versions of PNG/JPG files (typically 70-90% smaller!)
- Keeps original files as fallbacks for older browsers
- Only processes new/changed images (smart caching)
- Works for both projects and profile folders

#### 3. Update Your Project
In `src/components/Projects/Projects.tsx`, find your project in the `defaultProjects` array and add the `image` property:

```tsx
{
  id: '1',
  title: 'My Awesome Project',
  description: 'A cool project I built...',
  image: '/images/projects/my-project-screenshot.png', // ✅ Add this line
  imageAlt: 'Screenshot of My Awesome Project homepage', // ✅ And this line
  techStack: [
    // your tech stack...
  ],
  // rest of your project data...
}
```

---

## 🔍 Performance Monitoring

### Quick Health Check
```bash
# Build and test performance
npm run build && npm run preview & npm run lighthouse
```

### Detailed Analysis
```bash
# Full optimization audit
npm run build:analyze    # Bundle analysis
npm run lighthouse       # Performance audit
npm run lint            # Code quality check
```

### Performance Targets
- **Bundle Size**: <250kB (current: 225kB) ✅
- **Lighthouse**: 100/100 (current: 100/100) ✅
- **Build Time**: <3s (current: 2s) ✅
- **LCP**: <1s (current: 715ms) ✅

---

## 💼 Professional Experience

### **TableCheck - Tokyo, Japan** (December 2021 - Present)
**Frontend Engineer**
- Oversee dual-platform development while mentoring junior engineers
- Deliver complex projects and features under tight deadlines
- Excel in cross-cultural collaboration within Japanese business environments

### **Neopa - Tokyo, Japan** (Previous Experience)
**Frontend Developer**
- Built startup MVPs from scratch
- Implemented modern frontend architectures
- Collaborated with international teams

### **Code Chrysalis Bootcamp** (Education)
- Intensive full-stack development program
- Focus on modern JavaScript and React development
- Project-based learning with real-world applications

---

## 🌐 Browser Compatibility

### **Overall Compatibility Score: 93.5% ✅**

| Feature | Support | Status | Fallback |
|---------|---------|--------|----------|
| **CSS Container Queries** | 91.2% | ✅ | Media queries |
| **CSS Nesting** | 87.4% | ⚠️ | PostCSS compilation |
| **CSS Cascade Layers** | 89.7% | ⚠️ | CSS specificity |
| **React 19** | 95.3% | ✅ | Full support |
| **ES2022 Features** | 92.1% | ✅ | Modern browsers |
| **Intersection Observer** | 95.7% | ✅ | Lazy loading |

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guidelines](./CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint && npm run type-check`
5. Create a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 📚 Additional Resources

- [📊 Performance Analysis](./WEB_OPTIMIZATION_REPORT.md) - Detailed optimization report
- [🔧 Browser Compatibility](./reports/browser-compatibility-report.json) - Support matrix
- [📈 Bundle Analysis](./dist/bundle-analysis.html) - Visual breakdown

---

## 📞 Get In Touch

<div align="center">

**Let's connect and discuss how I can help with your next project!**

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-blue?style=for-the-badge)](https://fredericwojcikowski-portfolio.netlify.app/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077b5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/fredericwojcikowski)
[![Email](https://img.shields.io/badge/Email-Contact-ea4335?style=for-the-badge&logo=gmail)](mailto:wojcikowskif@gmail.com)

**⭐ Star this repository if you found it helpful!**

</div>

---

<div align="center">

**Built with ❤️ using modern web technologies**

*Performance-focused, accessible, and beautifully designed*

</div>