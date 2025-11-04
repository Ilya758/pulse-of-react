import { IconPuzzle, IconShield, IconSpeedboat } from '@tabler/icons-react';

export const ROUTES = [
  {
    group: 'Design Patterns',
    icon: IconPuzzle,
    items: [
      { href: '/state-machine', name: 'State Machine' },
      { href: '/hooks', name: 'Hooks' },
      { href: '/render-props', name: 'Render Props' },
      { href: '/context-providers', name: 'Context Providers' },
      { href: '/container-and-presentation', name: 'Container and Presentation' },
      { href: '/hocs', name: 'Higher-Order Components' },
      { href: '/compound-components', name: 'Compound Components' },
      { href: '/lazy-loading', name: 'Lazy Loading' },
      { href: '/factory', name: 'Factory' },
      { href: '/facade', name: 'Facade' },
      { href: '/observer', name: 'Observer' },
    ],
  },
  {
    group: 'Security',
    icon: IconShield,
    items: [
      {
        href: '/access-control',
        name: 'Access Control',
      },
      {
        href: '/auth',
        name: 'AuthZ vs AuthN & Session Management',
      },
      {
        href: '/csp',
        name: 'Content Security Policy',
      },
      {
        href: '/cors',
        name: 'Cross-Origin Resource Sharing',
      },
      {
        href: '/csrf',
        name: 'Cross-Site Request Forgery',
      },
      {
        href: '/xss',
        name: 'Cross-Site Scripting',
      },
      {
        href: '/prototype-pollution',
        name: 'Prototype Pollution',
      },
    ],
  },
  {
    group: 'Performance',
    icon: IconSpeedboat,
    items: [
      {
        href: '/first-contentful-paint',
        name: 'First Contentful Paint',
      },
      {
        href: '/lcp',
        name: 'Largest Contentful Paint',
      },
      {
        href: '/inp',
        name: 'Interaction to Next Paint',
      },
    ],
  },
];
