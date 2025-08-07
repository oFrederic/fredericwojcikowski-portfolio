import React, { useState, useRef, useEffect } from 'react'
import type { OptimizedImageProps } from '../types'
import { createIntersectionObserver } from '../utils/performance'

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  placeholder,
  webpSrc,
  sizes,
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [hasError, setHasError] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check WebP support
  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const dataURL = canvas.toDataURL('image/webp');
      setSupportsWebP(dataURL.indexOf('data:image/webp') === 0);
    };
    
    checkWebPSupport();
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = createIntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate optimized src
  const optimizedSrc = isInView ? (
    supportsWebP && webpSrc ? webpSrc : src
  ) : (placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmNWY1ZjUiLz4KICA8dGV4dCB4PSI1MCIgeT0iNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5Ij5Mb2FkaW5nLi4uPC90ZXh0Pgo8L3N2Zz4=');

  const imageStyle: React.CSSProperties = {
    ...style,
    opacity: isLoaded ? 1 : 0.7,
    transition: 'opacity 0.3s ease-in-out',
    background: !isLoaded ? 'var(--color-background-alt)' : 'transparent',
    ...(width && { width }),
    ...(height && { height })
  };

  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={className}
        style={{
          ...imageStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--color-background-alt)',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)'
        }}
      >
        Image failed to load
      </div>
    );
  }

  return (
    <picture>
      {/* WebP source for modern browsers */}
      {webpSrc && (
        <source 
          srcSet={isInView ? webpSrc : undefined}
          type="image/webp" 
          sizes={sizes}
        />
      )}
      
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        className={className}
        style={imageStyle}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        // Preload hint for critical images
        {...(priority && { fetchPriority: 'high' as const })}
      />
    </picture>
  );
};

export default OptimizedImage;