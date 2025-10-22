import type { ReactElement } from 'react';
import { IconAlertTriangle, IconCheck, IconX } from '@tabler/icons-react';

export const LCP_RATINGS = ['good', 'needs-improvement', 'poor'] as const;

export type LcpRating = (typeof LCP_RATINGS)[number];

export const ICON_SIZE = 16;

export const RATING_TO_COLOR: Record<LcpRating, string> = {
  good: 'green',
  'needs-improvement': 'yellow',
  poor: 'red',
};

export const RATING_TO_ICON: Record<LcpRating, ReactElement> = {
  good: <IconCheck size={ICON_SIZE} />,
  'needs-improvement': <IconAlertTriangle size={ICON_SIZE} />,
  poor: <IconX size={ICON_SIZE} />,
};

export const LCP_METRICS_CODE = `// LCP measurement in the browser

// Measure LCP
getLCP((metric) => {
  console.log('LCP:', metric);
  console.log('LCP value:', metric.value); // in milliseconds
  console.log('LCP element:', metric.element); // the DOM element
  console.log('LCP URL:', metric.url); // for images
  console.log('LCP time to first byte:', metric.entries[0].startTime);
});

// Manual LCP measurement
new PerformanceObserver((entryList) => {
  const entries = entryList.getEntries();
  const lastEntry = entries[entries.length - 1];
  
  console.log('LCP Element:', lastEntry.element);
  console.log('LCP Time:', lastEntry.startTime);
  console.log('LCP Size:', lastEntry.renderTime || lastEntry.loadTime);
}).observe({ entryTypes: ['largest-contentful-paint'] });`;

export const LCP_OPTIMIZATION_CODE = `// Preload critical resources
<link rel="preload" as="image" href="/hero-image.webp">
<link rel="preload" as="font" href="/critical-font.woff2" crossorigin>

// Optimize images for LCP
<img 
  src="/hero-image.webp"
  alt="Hero"
  loading="eager"
  fetchpriority="high"
  width="1200"
  height="600"
  decoding="sync"
/>

// CSS for LCP optimization
.hero-image {
  content-visibility: auto;
  contain-intrinsic-size: 1200px 600px;
}

// Font optimization
@font-face {
  font-family: 'Critical Font';
  src: url('/fonts/critical.woff2') format('woff2');
  font-display: swap; /* Avoids invisible text */
}`;

export const LCP_REACT_OPTIMIZATION_CODE = `import { useState, useEffect } from 'react';

// Optimized hero component for LCP
export const OptimizedHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload critical image
    const img = new Image();
    img.src = '/hero-image.webp';
    img.onload = () => setIsLoaded(true);
  }, []);

  return (
    <div className="hero-container">
      {/* Critical above-the-fold content */}
      <h1>Welcome to Our Site</h1>
      <p>Experience the best performance</p>
      
      {/* LCP candidate image */}
      <img
        src="/hero-image.webp"
        alt="Hero"
        width="1200"
        height="600"
        loading="eager"
        fetchpriority="high"
        decoding="sync"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
    </div>
  );
};

// Server-side rendering optimization
export const ServerOptimizedPage = ({ data }) => {
  return (
    <html>
      <head>
        {/* Critical CSS inline */}
        <style>{\`
          .hero { min-height: 400px; }
          .hero img { 
            width: 100%; 
            height: auto; 
            object-fit: cover; 
          }
        \`}</style>
        
        {/* Preload critical resources */}
        <link rel="preload" as="image" href="/hero-image.webp" />
        <link rel="preload" as="font" href="/fonts/main.woff2" crossorigin />
      </head>
      <body>
        <div id="root">
          <Hero data={data} />
        </div>
      </body>
    </html>
  );
};`;

export const LCP_MONITORING_CODE = `// Real User Monitoring (RUM) for LCP
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  fetch('/api/vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metric),
  });
}

// Measure all Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// LCP-specific monitoring
getLCP((metric) => {
  const lcpElement = metric.element;
  const lcpRating = metric.rating; // 'good', 'needs-improvement', 'poor'
  
  // Categorize LCP by element type
  const elementType = lcpElement?.tagName.toLowerCase();
  
  // Track LCP performance
  if (lcpRating !== 'good') {
    console.warn(\`LCP needs improvement: \${metric.value}ms\`);
    
    // Identify optimization opportunities
    if (elementType === 'img') {
      console.log('LCP is an image - consider optimizing image');
    } else if (elementType === 'div' || elementType === 'section') {
      console.log('LCP is a container - check background images');
    }
  }
  
  // Send custom event to analytics
  gtag('event', 'lcp_metric', {
    value: metric.value,
    rating: lcpRating,
    element_type: elementType,
    custom_map: { dimension1: 'lcp_element_type' }
  });
});`;

export const LCP_IMAGE_OPTIMIZATION_CODE = `// Next.js Image optimization example
import Image from 'next/image';

export const OptimizedHeroImage = () => {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero banner"
      width={1200}
      height={600}
      priority // High priority for LCP
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      sizes="100vw"
      style={{
        width: '100%',
        height: 'auto',
      }}
    />
  );
};

// Custom image optimization
export const CustomOptimizedImage = ({ src, alt, width, height }) => {
  return (
    <picture>
      {/* Modern formats first */}
      <source
        srcSet={\`\${src}?format=webp&w=\${width}&h=\${height}&q=80\`}
        type="image/webp"
      />
      <source
        srcSet={\`\${src}?format=avif&w=\${width}&h=\${height}&q=80\`}
        type="image/avif"
      />
      
      {/* Fallback */}
      <img
        src={\`\${src}?w=\${width}&h=\${height}&q=85\`}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
        fetchpriority="high"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
      />
    </picture>
  );
};`;

export const LCP_CDN_OPTIMIZATION_CODE = `// CDN configuration for LCP optimization
const cdnConfig = {
  // Cloudflare optimization
  cloudflare: {
    cacheControl: 'public, max-age=31536000, immutable',
    compression: 'brotli',
    imageOptimization: {
      format: 'auto', // WebP, AVIF when supported
      quality: 85,
      width: 1200,
      height: 600,
    },
  },
  
  // AWS CloudFront
  cloudFront: {
    origin: 's3://my-bucket',
    behaviors: [
      {
        pathPattern: '/images/*',
        allowedMethods: ['GET', 'HEAD'],
        cachedMethods: ['GET', 'HEAD'],
        ttl: 31536000, // 1 year
        compress: true,
        queryStringBehavior: 'none',
      },
    ],
  },
};

// Service Worker for LCP optimization
self.addEventListener('fetch', (event) => {
  // Preload critical resources
  if (event.request.url.includes('/hero-image')) {
    event.respondWith(
      caches.open('critical').then((cache) => {
        return cache.match(event.request) || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    );
  }
});

// Resource hints for LCP
export const ResourceHints = () => {
  return (
    <>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//cdn.example.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      
      {/* Preconnect for critical resources */}
      <link rel="preconnect" href="https://cdn.example.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
      
      {/* Preload LCP candidates */}
      <link rel="preload" as="image" href="/hero-image.webp" />
      <link rel="preload" as="font" href="/fonts/critical.woff2" crossorigin />
      
      {/* Prefetch next pages */}
      <link rel="prefetch" href="/next-page" />
    </>
  );
};`;

