import { IconPuzzle, IconShield, IconSpeedboat } from '@tabler/icons-react';

export const ROUTES = [
  {
    group: 'Design Patterns',
    icon: IconPuzzle,
    items: [
      { name: 'State Machine', href: '/state-machine' },
      { name: 'Hooks', href: '/hooks' },
      { name: 'Render Props', href: '/render-props' },
      { name: 'Context Providers', href: '/context-providers' },
      { name: 'Container and Presentation', href: '/container-and-presentation' },
      { name: 'Higher-Order Components', href: '/hocs' },
      { name: 'Compound Components', href: '/compound-components' },
      { name: 'Lazy Loading', href: '/lazy-loading' },
      { name: 'Factory', href: '/factory' },
      { name: 'Facade', href: '/facade' },
      { name: 'Observer', href: '/observer' },
    ],
  },
  {
    group: 'Security',
    icon: IconShield,
    items: [
      {
        name: 'Access Control',
        href: '/access-control',
      },
      {
        name: 'AuthZ vs AuthN & Session Management',
        href: '/auth',
      },
      {
        name: 'Content Security Policy',
        href: '/content-security-policy',
      },
    ],
  },
  {
    group: 'Performance',
    icon: IconSpeedboat,
    items: [
      {
        name: 'Coming Soon',
        href: '/coming-soon',
      },
    ],
  },
];

