import { Post } from './types';

export const BAD_EXAMPLE_IMAGE_CODE = `
<img src="image.jpg" alt="An image that will cause a layout shift." />
`;

export const GOOD_EXAMPLE_IMAGE_CODE = `
<img src="image.jpg" width="640" height="360" alt="An image that won't cause a layout shift." />
`;

export const BAD_EXAMPLE_DYNAMIC_CONTENT_CODE = `
// Simulate a network request
setTimeout(() => {
  const ad = document.createElement('div');
  ad.innerHTML = '<p>This is an ad that just loaded!</p>';
  document.getElementById('ad-container').prepend(ad);
}, 1000);
`;

export const GOOD_EXAMPLE_DYNAMIC_CONTENT_CODE = `
<div id="ad-container" style={{ minHeight: '100px' }}>
  {/* Ad content will be loaded here */}
</div>
`;

export const BAD_EXAMPLE_FONT_CODE = `
@import url('https://fonts.googleapis.com/css2?family=Roboto');

body {
  font-family: 'Roboto', sans-serif;
}
`;

export const GOOD_EXAMPLE_FONT_CODE = `
<link rel="preload" href="/path/to/font.woff2" as="font" type="font/woff2" crossorigin>

body {
  font-family: 'Roboto', sans-serif;
  font-display: swap;
}
`;

export const LAYOUT_INSTABILITY_API_CODE = `
new PerformanceObserver((entryList) => {
  for (const entry of entryList.getEntries()) {
    console.log('Layout shift:', entry);
  }
}).observe({type: 'layout-shift', buffered: true});
`;

export const WEB_VITALS_CLS_CODE = `
import {onCLS} from 'web-vitals';

// Measure and log CLS in all situations
// where it needs to be reported.
onCLS(console.log);
`;

export const CSS_TRANSFORM_CODE = `
/* Instead of changing height and width properties... */
.element {
  transform: scale(1.5); /* ...use transform: scale() */
}

/* To move elements around, avoid changing top, right, etc. */
.element {
  transform: translate(10px, 20px); /* Use transform: translate() */
}
`;

export const POSTS: Omit<Post, 'id'>[] = [
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    name: 'John Doe',
    text: 'Just had a great time hiking in the mountains! The views were breathtaking. #nature #hiking',
  },
  {
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Jane Smith',
    text: 'Exploring the city today. Found a hidden gem of a coffee shop. ☕️ #citylife #coffee',
  },
];

export const CLS_THRESHOLDS = [
  { color: 'green', label: 'Good', value: '≤ 0.1' },
  { color: 'yellow', label: 'Needs Improvement', value: '0.1 < CLS ≤ 0.25' },
  { color: 'red', label: 'Poor', value: '> 0.25' },
];

export const SIMULATED_DELAY = 1500;
