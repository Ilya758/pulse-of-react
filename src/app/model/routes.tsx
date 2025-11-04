/** biome-ignore-all lint/nursery/noShadow: skip shadowing of imports */
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

const CrossSiteRequestForgeryPage = lazy(() =>
  import('@/pages/cross-site-request-forgery').then(({ CrossSiteRequestForgery: Page }) => ({
    default: Page,
  })),
);

const CrossSiteScriptingPage = lazy(() =>
  import('@/pages/cross-site-scripting').then((Page) => ({
    default: Page.default,
  })),
);

const PrototypePollutionPage = lazy(() =>
  import('@/pages/prototype-pollution').then(({ PrototypePollutionPage: Page }) => ({
    default: Page,
  })),
);

const FirstContentfulPaintPage = lazy(() =>
  import('@/pages/first-contentful-paint').then(({ FirstContentfulPaintPage }) => ({
    default: FirstContentfulPaintPage,
  })),
);

const LcpPage = lazy(() => import('@/pages/lcp').then(({ LcpPage }) => ({ default: LcpPage })));

const InteractionToNextPaintPage = lazy(() =>
  import('@/pages/interaction-to-next-paint').then(({ InteractionToNextPaintPage }) => ({
    default: InteractionToNextPaintPage,
  })),
);

export const ROUTES = [
  { element: <HomePage />, path: '/' },
  { element: <HooksPage />, path: 'hooks' },
  { element: <RenderPropsPage />, path: '/render-props' },
  { element: <ContextProvidersPage />, path: '/context-providers' },
  { element: <ContainerAndPresentation />, path: '/container-and-presentation' },
  { element: <HocsPage />, path: '/hocs' },
  { element: <AboutPage />, path: '/about' },
  { element: <CompoundComponentsPage />, path: '/compound-components' },
  { element: <LazyLoadingPage />, path: '/lazy-loading' },
  { element: <StateMachinePage />, path: '/state-machine' },
  { element: <FactoryPage />, path: '/factory' },
  { element: <FacadePage />, path: '/facade' },
  { element: <ObserverPage />, path: '/observer' },
  { element: <AccessControlPage />, path: '/access-control' },
  { element: <AuthZvsAuthNPage />, path: '/auth' },
  { element: <ContentSecurityPolicyPage />, path: '/csp' },
  { element: <CrossOriginResourceSharingPage />, path: '/cors' },
  { element: <CrossSiteRequestForgeryPage />, path: '/csrf' },
  { element: <CrossSiteScriptingPage />, path: '/xss' },
  { element: <PrototypePollutionPage />, path: '/prototype-pollution' },
  { element: <FirstContentfulPaintPage />, path: '/first-contentful-paint' },
  { element: <LcpPage />, path: '/lcp' },
  { element: <InteractionToNextPaintPage />, path: '/inp' },
  { element: <NotFoundPage />, path: '*' },
];
