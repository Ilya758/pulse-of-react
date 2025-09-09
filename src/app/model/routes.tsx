import { lazy } from 'react';

const HomePage = lazy(() => import('@/pages/home').then(({ HomePage }) => ({ default: HomePage })));

const NotFoundPage = lazy(() =>
  import('@/pages/not-found').then(({ NotFoundPage }) => ({ default: NotFoundPage })),
);

const HooksPage = lazy(() =>
  import('@/pages/hooks').then(({ HooksPage }) => ({ default: HooksPage })),
);

const AboutPage = lazy(() =>
  import('@/pages/about').then(({ AboutPage }) => ({ default: AboutPage })),
);

const RenderPropsPage = lazy(() =>
  import('@/pages/render-props').then(({ RenderPropsPage }) => ({ default: RenderPropsPage })),
);

const ContextProvidersPage = lazy(() =>
  import('@/pages/context-providers').then(({ ContextProvidersPage }) => ({
    default: ContextProvidersPage,
  })),
);

const ContainerAndPresentation = lazy(() =>
  import('@/pages/container-and-presentation').then(({ ContainerAndPresentation: Page }) => ({
    default: Page,
  })),
);

const HocsPage = lazy(() => import('@/pages/hocs').then(({ HocsPage }) => ({ default: HocsPage })));

const CompoundComponentsPage = lazy(() =>
  import('@/pages/compound-components').then(({ CompoundComponentsPage }) => ({
    default: CompoundComponentsPage,
  })),
);

const LazyLoadingPage = lazy(() =>
  import('@/pages/lazy-loading').then(({ LazyLoadingPage }) => ({ default: LazyLoadingPage })),
);

const StateMachinePage = lazy(() =>
  import('@/pages/state-machine').then(({ StateMachine }) => ({ default: StateMachine })),
);

const FactoryPage = lazy(() =>
  import('@/pages/factory').then(({ FactoryPage }) => ({ default: FactoryPage })),
);

const FacadePage = lazy(() =>
  import('@/pages/facade').then(({ FacadePage }) => ({ default: FacadePage })),
);

const ObserverPage = lazy(() =>
  import('@/pages/observer').then(({ ObserverPage }) => ({ default: ObserverPage })),
);

const AccessControlPage = lazy(() =>
  import('@/pages/access-control').then(({ AccessControlPage }) => ({
    default: AccessControlPage,
  })),
);

const AuthZvsAuthNPage = lazy(() =>
  import('@/pages/authz-vs-authn').then(({ AuthZvsAuthNPage }) => ({ default: AuthZvsAuthNPage })),
);

const ContentSecurityPolicyPage = lazy(() =>
  import('@/pages/content-security-policy').then(({ ContentSecurityPolicyPage }) => ({
    default: ContentSecurityPolicyPage,
  })),
);

const CrossOriginResourceSharingPage = lazy(() =>
  import('@/pages/cross-origin-resource-sharing').then(
    ({ CrossOriginResourceSharingPage: Page }) => ({
      default: Page,
    }),
  ),
);

export const ROUTES = [
  { path: '/', element: <HomePage /> },
  { path: 'hooks', element: <HooksPage /> },
  { path: '/render-props', element: <RenderPropsPage /> },
  { path: '/context-providers', element: <ContextProvidersPage /> },
  { path: '/container-and-presentation', element: <ContainerAndPresentation /> },
  { path: '/hocs', element: <HocsPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/compound-components', element: <CompoundComponentsPage /> },
  { path: '/lazy-loading', element: <LazyLoadingPage /> },
  { path: '/state-machine', element: <StateMachinePage /> },
  { path: '/factory', element: <FactoryPage /> },
  { path: '/facade', element: <FacadePage /> },
  { path: '/observer', element: <ObserverPage /> },
  { path: '/access-control', element: <AccessControlPage /> },
  { path: '/auth', element: <AuthZvsAuthNPage /> },
  { path: '/csp', element: <ContentSecurityPolicyPage /> },
  { path: '/cors', element: <CrossOriginResourceSharingPage /> },
  { path: '*', element: <NotFoundPage /> },
];

