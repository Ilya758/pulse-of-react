export const INP_SIGNATURE_CODE = `// Measuring Interaction to Next Paint
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'event') {
      console.log('Interaction:', {
        name: entry.name,
        inputDelay: entry.processingStart - entry.startTime,
        processingTime: entry.processingEnd - entry.processingStart,
        presentationDelay: entry.duration - (entry.processingEnd - entry.startTime),
        totalDuration: entry.duration
      });
    }
  }
});

observer.observe({ entryTypes: ['event'] });`;

export const INP_OPTIMIZATION_CODE = `// Optimizing for INP
import { startTransition, useDeferredValue } from 'react';

// Use startTransition for non-urgent updates
const handleSearch = (searchTerm: string) => {
  // Urgent update - update input immediately
  setInputValue(searchTerm);
  
  // Non-urgent update - defer search results
  startTransition(() => {
    setSearchResults(searchProducts(searchTerm));
  });
};

// Use useDeferredValue for expensive computations
const SearchResults = ({ query }) => {
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(() => 
    searchProducts(deferredQuery), [deferredQuery]
  );
  
  return <ProductList products={results} />;
};

// Optimize event handlers
const optimizedHandler = useCallback((event) => {
  // Batch state updates
  setFormData(prev => ({
    ...prev,
    [event.target.name]: event.target.value
  }));
}, []);

// Break up long-running tasks
const processLargeDataset = async (data: DataItem[]) => {
  const CHUNK_SIZE = 50;
  
  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    const chunk = data.slice(i, i + CHUNK_SIZE);
    processChunk(chunk);
    
    // Yield control back to the browser
    if (i + CHUNK_SIZE < data.length) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
};`;

export const INP_MEASUREMENT_CODE = `import { useEffect, useState, useCallback } from 'react';

interface INPMetric {
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

export const useINPMeasurement = () => {
  const [inp, setInp] = useState<number | null>(null);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const [interactionCount, setInteractionCount] = useState(0);

  const getINPRating = (value: number): 'good' | 'needs-improvement' | 'poor' => {
    if (value <= 200) return 'good';
    if (value <= 500) return 'needs-improvement';
    return 'poor';
  };

  const measureINP = useCallback(() => {
    if (!('PerformanceObserver' in window)) {
      setIsMeasuring(false);
      return;
    }

    let interactions: PerformanceEventTiming[] = [];
    let maxINP = 0;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as PerformanceEventTiming[];
      
      for (const entry of entries) {
        // Only count interactions that have a duration
        if (entry.duration > 0 && entry.interactionId) {
          interactions.push(entry);
          setInteractionCount(prev => prev + 1);
          
          // Update max INP value
          if (entry.duration > maxINP) {
            maxINP = entry.duration;
            setInp(Math.round(maxINP));
          }
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['event'] });
      
      // Set a timeout to stop measuring after page load
      setTimeout(() => {
        observer.disconnect();
        setIsMeasuring(false);
      }, 5000);
    } catch (error) {
      console.log('INP measurement not supported:', error);
      setIsMeasuring(false);
    }
  }, []);

  useEffect(() => {
    measureINP();
  }, [measureINP]);

  return { 
    inp, 
    isMeasuring, 
    interactionCount,
    rating: inp ? getINPRating(inp) : null
  };
};`;

export const INP_EVENT_LISTENER_CODE = `// Optimizing Event Listeners for INP
// Passive event listeners for scrolling/touching
element.addEventListener('scroll', handleScroll, { 
  passive: true 
});

// Debounce expensive handlers
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Use requestAnimationFrame for visual updates
const handleResize = () => {
  requestAnimationFrame(() => {
    updateLayout();
  });
};

// Optimize click handlers
const handleClick = useCallback((event: MouseEvent) => {
  // Prevent default if needed
  event.preventDefault();
  
  // Use setTimeout for non-critical work
  setTimeout(() => {
    processClickData(event);
  }, 0);
  
  // Update UI immediately
  updateUI();
}, []);`;

export const INP_WEB_WORKERS_CODE = `// Using Web Workers to improve INP
// worker.ts
self.onmessage = (event) => {
  const { data, type } = event.data;
  
  switch (type) {
    case 'PROCESS_LARGE_DATASET':
      const result = processLargeDataset(data);
      self.postMessage({ type: 'PROCESSING_COMPLETE', result });
      break;
      
    case 'COMPLEX_CALCULATION':
      const calculation = performComplexCalculation(data);
      self.postMessage({ type: 'CALCULATION_COMPLETE', calculation });
      break;
  }
};

// main thread
const worker = new Worker('./worker.js');

const handleDataProcessing = (largeDataset: DataItem[]) => {
  // Send heavy work to worker
  worker.postMessage({
    type: 'PROCESS_LARGE_DATASET',
    data: largeDataset
  });
  
  // Handle results when ready
  worker.onmessage = (event) => {
    const { type, result } = event.data;
    
    if (type === 'PROCESSING_COMPLETE') {
      updateUIWithResults(result);
    }
  };
};`;

export const INP_STATUS_COLORS = {
  complete: 'green',
  listening: 'blue',
  waiting: 'gray',
} as const;

export const INP_STATUS_TEXT = {
  complete: 'Complete',
  listening: 'Listening',
  waiting: 'Waiting',
} as const;

export const INP_RATING_COLORS = {
  good: 'green',
  'needs-improvement': 'yellow',
  poor: 'red',
} as const;

export const INP_RATING_TEXT = {
  good: 'Good',
  'needs-improvement': 'Needs Improvement',
  poor: 'Poor',
} as const;

export const INP_RATING = {
  GOOD: 'good',
  NEEDS_IMPROVEMENT: 'needs-improvement',
  POOR: 'poor',
} as const;
