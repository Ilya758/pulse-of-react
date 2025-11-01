export const FCP_SIGNATURE_CODE = `// Measuring First Contentful Paint
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP:', entry.startTime);
    }
  }
});

observer.observe({ entryTypes: ['paint'] });`;

export const FCP_OPTIMIZATION_CODE = `// Optimizing for FCP
import { lazy, Suspense } from 'react';

// Lazy load non-critical components
const NonCriticalComponent = lazy(() => import('./NonCritical'));

// Defer non-critical CSS
const loadCriticalCSS = () => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = '/styles/non-critical.css';
  link.onload = () => {
    link.rel = 'stylesheet';
  };
  document.head.appendChild(link);
};

// Optimize images
const OptimizedImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width="300"
      height="200"
    />
  );
};`;

export const FCP_MEASUREMENT_CODE = `import { useEffect, useState } from 'react';

export const useFCPMeasurement = () => {
  const [fcp, setFcp] = useState<number | null>(null);

  useEffect(() => {
    const measureFCP = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            setFcp(Math.round(entry.startTime));
            observer.disconnect();
          }
        }
      });

      observer.observe({ entryTypes: ['paint'] });

      // Fallback for browsers that don't support PerformanceObserver
      setTimeout(() => {
        const navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry && !fcp) {
          const domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.fetchStart;
          setFcp(Math.round(domContentLoaded));
        }
      }, 1000);
    };

    measureFCP();
  }, []);

  return fcp;
};`;
