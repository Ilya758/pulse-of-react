import { useEffect, useState } from 'react';

export const useFCPMeasurement = () => {
  const [fcp, setFcp] = useState<number | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(true);

  useEffect(() => {
    const measureFCP = () => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            setFcp(Math.round(entry.startTime));
            setIsMeasuring(false);
            observer.disconnect();
          }
        }
      });

      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch {
        console.log('PerformanceObserver not supported, using fallback');
      }

      // Fallback for browsers that don't support PerformanceObserver
      setTimeout(() => {
        if (!fcp) {
          const navEntry = performance.getEntriesByType(
            'navigation',
          )[0] as PerformanceNavigationTiming;

          if (navEntry) {
            const domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.fetchStart;
            setFcp(Math.round(domContentLoaded));
          }

          setIsMeasuring(false);
        }
      }, 1000);
    };

    measureFCP();
  }, [fcp]);

  return { fcp, isMeasuring };
};
