import { useCallback, useEffect, useState } from 'react';
import { getINPRating } from '../lib';

interface ExtendedPerformanceEventTiming extends PerformanceEventTiming {
  interactionId?: number;
}

export const useINPMeasurement = () => {
  const [inp, setInp] = useState<number | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const [interactionCount, setInteractionCount] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState<number | null>(null);

  const measureINP = useCallback(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      setIsMeasuring(false);
      return;
    }

    const interactions: ExtendedPerformanceEventTiming[] = [];
    let maxINP = 0;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as ExtendedPerformanceEventTiming[];

      for (const entry of entries) {
        // Only count interactions that have a duration and interactionId
        if (entry.duration > 0 && entry.interactionId) {
          interactions.push(entry);
          setInteractionCount((prev) => prev + 1);
          setLastInteractionTime(entry.startTime);

          // Update max INP value (worst interaction)
          if (entry.duration > maxINP) {
            maxINP = entry.duration;
            setInp(Math.round(maxINP));
          }
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['event'] });
    } catch (error) {
      console.log('INP measurement not supported:', error);
      setIsMeasuring(false);
      return;
    }

    // Continue measuring for a reasonable time to capture interactions
    const measurementTimeout = setTimeout(() => {
      observer.disconnect();
      setIsMeasuring(false);
    }, 10000);

    // Also stop measuring if we have sufficient interactions
    const checkInteractions = setInterval(() => {
      if (interactions.length >= 10) {
        clearTimeout(measurementTimeout);
        clearInterval(checkInteractions);
        observer.disconnect();
        setIsMeasuring(false);
      }
    }, 1000);

    const cleanup = () => {
      clearTimeout(measurementTimeout);
      clearInterval(checkInteractions);
      observer.disconnect();
    };

    return cleanup;
  }, []);

  const simulateInteraction = useCallback(
    (duration?: number) => {
      // Simulate a user interaction for testing
      if (typeof window !== 'undefined') {
        const startTime = performance.now();
        const processingTime = duration ?? Math.random() * 300; // Use provided duration or random up to 300ms

        // Simulate some processing time
        setTimeout(() => {
          const processingEnd = performance.now();
          const actualDuration = processingEnd - startTime;

          setInteractionCount((prev) => prev + 1);
          setLastInteractionTime(startTime);

          if (!inp || actualDuration > inp) {
            setInp(Math.round(actualDuration));
          }
        }, processingTime);
      }
    },
    [inp],
  );

  useEffect(() => {
    const cleanup = measureINP();
    return cleanup;
  }, [measureINP]);

  return {
    inp,
    interactionCount,
    isMeasuring,
    lastInteractionTime,
    rating: inp ? getINPRating(inp) : null,
    simulateInteraction,
  };
};
