# 🤝 Contributing to Modern React Portfolio

Thank you for your interest in contributing to this project! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Convention](#commit-convention)
- [Performance Standards](#performance-standards)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow:

- **Be respectful** and inclusive in all interactions
- **Be collaborative** and help others learn
- **Be constructive** when providing feedback
- **Focus on what is best** for the community and project

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Modern browser for testing

### Setup Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/modern-react-portfolio.git
cd modern-react-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests and linting
npm run lint
npm run type-check
```

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Create and switch to a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Changes

- Write code following our style guidelines
- Add tests for new functionality
- Update documentation if needed
- Ensure accessibility compliance

### 3. Test Your Changes

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# Performance test
npm run lighthouse
```

### 4. Commit Changes

```bash
# Stage your changes
git add .

# Commit with conventional commit format
git commit -m "feat: add new hero animation"
```

## 🎨 Code Style Guidelines

### TypeScript

- **Use TypeScript strict mode** - all code must pass strict type checking
- **Define interfaces** for all component props and data structures
- **Use proper typing** - avoid `any` types
- **Export types** when they might be reused

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  children: React.ReactNode;
}

// ❌ Avoid
const Button = (props: any) => { /* ... */ }
```

### React Components

- **Use functional components** with hooks
- **Implement proper prop interfaces**
- **Handle loading and error states**
- **Follow accessibility best practices**

```tsx
// ✅ Good
export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  onClick, 
  children 
}) => {
  return (
    <button 
      className={styles[variant]}
      onClick={onClick}
      aria-label="Action button"
    >
      {children}
    </button>
  );
};
```

### CSS & Styling

- **Use CSS Modules** for component styling
- **Follow BEM-like naming** within modules
- **Leverage CSS custom properties** for theming
- **Use modern CSS features** (Container Queries, Nesting, etc.)

```css
/* ✅ Good - Component.module.css */
.container {
  container-type: inline-size;
  padding: var(--space-lg);
  
  & .title {
    font-size: var(--font-size-2xl);
    color: var(--color-text);
  }
  
  @container (min-width: 768px) {
    & .content {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
}
```

### Performance Considerations

- **Minimize bundle size** - avoid unnecessary dependencies
- **Use lazy loading** for non-critical components
- **Optimize images** with proper formats and sizing
- **Follow Core Web Vitals** best practices

## 📝 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear commit history:

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```bash
feat(hero): add parallax scroll effect
fix(contact): resolve form validation issue
docs: update README with new installation steps
perf(images): implement WebP support with fallbacks
```

## ⚡ Performance Standards

All contributions must maintain our high performance standards:

### Required Metrics

- **Lighthouse Performance**: 90+ (target: 95+)
- **Lighthouse Accessibility**: 95+ (target: 100)
- **Core Web Vitals LCP**: <2.5s (target: <1.0s)
- **Core Web Vitals CLS**: <0.1 (target: <0.05)

### Testing Performance

```bash
# Run Lighthouse audit
npm run lighthouse

# Build and analyze bundle
npm run build
npm run build:analyze
```

### Performance Checklist

- [ ] Images are optimized (WebP, proper sizing)
- [ ] CSS is scoped and doesn't cause layout shifts
- [ ] JavaScript bundles are within size limits
- [ ] No unnecessary re-renders or memory leaks
- [ ] Lazy loading implemented where appropriate

## 🔍 Pull Request Process

### 1. Before Submitting

- [ ] All tests pass (`npm run type-check && npm run lint`)
- [ ] Build completes successfully (`npm run build`)
- [ ] Performance metrics meet standards
- [ ] Documentation updated if needed
- [ ] Commit messages follow conventional format

### 2. PR Description Template

```markdown
## 📋 Description
Brief description of changes and motivation.

## 🔧 Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature causing existing functionality to not work)
- [ ] Documentation update

## 🧪 Testing
- [ ] Unit tests pass
- [ ] Lighthouse audit passes
- [ ] Cross-browser testing completed
- [ ] Accessibility testing completed

## 📊 Performance Impact
- Bundle size change: +/-X kB
- Lighthouse score: X/100
- Core Web Vitals: LCP/CLS values

## 📸 Screenshots (if applicable)
Add screenshots for visual changes.

## ✅ Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### 3. Review Process

1. **Automated Checks** - CI runs tests and performance audits
2. **Code Review** - Maintainers review code quality and architecture
3. **Performance Review** - Metrics are validated against standards
4. **Final Approval** - Changes are merged after approval

## 🛠️ Development Tips

### Modern CSS Features

- **Container Queries** - Use for component-level responsiveness
- **CSS Nesting** - Keep nesting reasonable (max 3 levels)
- **Custom Properties** - Use design tokens from `variables.css`

### React Best Practices

- **Performance** - Use React.memo, useMemo, useCallback judiciously
- **Accessibility** - Include proper ARIA labels and semantic HTML
- **Error Handling** - Implement error boundaries for critical components
- **Loading States** - Always handle loading and error states

### TypeScript Tips

- **Strict Mode** - All code must pass TypeScript strict checks
- **Generic Types** - Use generics for reusable components
- **Utility Types** - Leverage built-in utility types (Pick, Omit, etc.)
- **Module Augmentation** - Properly type third-party libraries

## 🤔 Questions?

If you have questions about contributing:

1. Check existing [Issues](https://github.com/yourusername/modern-react-portfolio/issues)
2. Open a new issue with the question label
3. Join our [Discord community](#) for real-time help

## 🙏 Recognition

Contributors who help improve this project will be recognized in our:

- **README Contributors Section**
- **Release Notes** for significant contributions
- **GitHub Contributors Graph**

Thank you for helping make this project better! 🚀