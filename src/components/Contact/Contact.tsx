import React, { useState, useRef, type FormEvent } from 'react'
import type { 
  ContactProps, 
  ContactMethod, 
  SocialLink, 
  ContactFormData,
  ValidationRule,
  FormErrors,
  SubmitStatus
} from '../../types'
import styles from './Contact.module.css'

// Form validation rules
const validation: Record<keyof ContactFormData, ValidationRule> = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 200
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
};

// Default contact methods
const defaultContactMethods: ContactMethod[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    title: 'Email',
    value: 'wojcikowskif@gmail.com',
    description: 'Best way to reach me',
    link: 'mailto:wojcikowskif@gmail.com'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
      </svg>
    ),
    title: 'LinkedIn',
    value: 'linkedin.com/in/ofrederic',
    description: 'Professional networking',
    link: 'https://linkedin.com/in/ofrederic'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
    title: 'Location',
    value: 'Ichikawa, Chiba, Japan',
    description: 'Available for remote work globally'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    title: 'Response Time',
    value: '< 24 hours',
    description: 'Quick and reliable communication'
  }
];

// Default social links
const defaultSocialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/ofrederic',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/ofrederic',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    platform: 'Portfolio',
    url: 'https://fredericwojcikowski-portfolio.netlify.app',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    )
  }
];

const Contact: React.FC<ContactProps> = ({
  title = "Let's Connect",
  subtitle = "Ready to collaborate on your next project? I'm passionate about creating exceptional web experiences and would love to discuss how we can bring your ideas to life. Let's build something amazing together.",
  contactMethods = defaultContactMethods,
  socialLinks = defaultSocialLinks
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null)
  const [statusMessage, setStatusMessage] = useState('')
  
  const formRef = useRef<HTMLFormElement>(null);
  
  // Rate limiting state
  const [lastSubmission, setLastSubmission] = useState<number>(0);

  const validateField = (name: keyof ContactFormData, value: string): string | null => {
    const rules = validation[name];
    
    if (rules.required && !value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    
    if (rules.minLength && value.trim().length < rules.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.minLength} characters`;
    }
    
    if (rules.maxLength && value.trim().length > rules.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${rules.maxLength} characters`;
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      if (name === 'email') {
        return 'Please enter a valid email address';
      }
      return `${name.charAt(0).toUpperCase() + name.slice(1)} format is invalid`;
    }
    
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: undefined
      }));
    }
    
    // Real-time validation
    const error = validateField(fieldName, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors<ContactFormData> = {}
    let isValid = true
    
    const fields = Object.keys(formData) as (keyof ContactFormData)[]
    fields.forEach(field => {
      const error = validateField(field, formData[field])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })
    
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Rate limiting check (1 minute between submissions)
    const now = Date.now();
    if (now - lastSubmission < 60000) {
      setSubmitStatus('error');
      setStatusMessage('Please wait a minute before submitting another message.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Prepare form data for Netlify
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('form-name', 'contact');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      
      // Submit to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataToSend.toString(),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        formRef.current?.reset();
        setLastSubmission(now); // Update last submission time
      } else {
        throw new Error('Submission failed');
      }
    } catch (submitError) {
      setSubmitStatus('error');
      setStatusMessage('Oops! Something went wrong. Please try again or contact me directly via email.');
      console.error('Form submission error:', submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.contactContainer}>
          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <header className={styles.sectionHeader}>
              <h2 id="contact-title" className={styles.sectionTitle}>
                {title}
              </h2>
              <p className={styles.sectionSubtitle}>
                {subtitle}
              </p>
            </header>
            
            {/* Contact Methods */}
            <div className={styles.contactMethods}>
              {contactMethods.map((method, index) => (
                <div key={index} className={styles.contactMethod}>
                  <div className={styles.methodIcon}>
                    {method.icon}
                  </div>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>{method.title}</h3>
                    <p className={styles.methodValue}>
                      {method.link ? (
                        <a href={method.link}>{method.value}</a>
                      ) : (
                        method.value
                      )}
                    </p>
                    <p className={styles.methodDescription}>{method.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Social Links */}
            <div className={styles.socialLinks}>
              <h3 className={styles.socialTitle}>Connect with me</h3>
              <div className={styles.socialList}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect on ${social.platform}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <form 
            ref={formRef}
            className={styles.contactForm} 
            onSubmit={handleSubmit}
            noValidate
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            {/* Netlify form detection */}
            <input type="hidden" name="form-name" value="contact" />
            
            {/* Honeypot field for spam protection */}
            <div style={{ display: 'none' }}>
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </div>
            <h3 className={styles.formTitle}>Send me a message</h3>
            
            <div className={styles.formGrid}>
              {/* Name Field */}
              <div className={styles.formGroup}>
                <label htmlFor="contact-name" className={styles.formLabel}>
                  Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className={styles.formInput}
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <div 
                    id="name-error" 
                    className={`${styles.formError} ${styles.show}`}
                    role="alert"
                  >
                    {errors.name}
                  </div>
                )}
              </div>
              
              {/* Email Field */}
              <div className={styles.formGroup}>
                <label htmlFor="contact-email" className={styles.formLabel}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className={styles.formInput}
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <div 
                    id="email-error" 
                    className={`${styles.formError} ${styles.show}`}
                    role="alert"
                  >
                    {errors.email}
                  </div>
                )}
              </div>
              
              {/* Subject Field */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="contact-subject" className={styles.formLabel}>
                  Subject <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  className={styles.formInput}
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && (
                  <div 
                    id="subject-error" 
                    className={`${styles.formError} ${styles.show}`}
                    role="alert"
                  >
                    {errors.subject}
                  </div>
                )}
              </div>
              
              {/* Message Field */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="contact-message" className={styles.formLabel}>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className={styles.formTextarea}
                  placeholder="Tell me about your project, timeline, and any specific requirements..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  aria-describedby={errors.message ? "message-error" : "message-help"}
                />
                {errors.message && (
                  <div 
                    id="message-error" 
                    className={`${styles.formError} ${styles.show}`}
                    role="alert"
                  >
                    {errors.message}
                  </div>
                )}
                <div id="message-help" className={styles.formHelp}>
                  Minimum 10 characters required
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={`${styles.submitButton} ${isSubmitting ? styles.loading : ''}`}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <svg 
                  className={styles.submitIcon} 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  {isSubmitting ? (
                    <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z"/>
                  ) : (
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  )}
                </svg>
              </button>
            </div>
            
            {/* Status Message */}
            {submitStatus && (
              <div 
                className={`${styles.formStatus} ${styles[submitStatus]} ${styles.show}`}
                role="alert"
              >
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;