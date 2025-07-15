import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { lazy } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { ThemeProvider } from './providers/theme-provider';
import { Choose, If, Otherwise } from '@/shared';
import { ScrollToTop } from './ui';
import { useAppInitializer } from './model';
import { SuspenseProvider } from './providers';
import './index.css';

const HomePage = lazy(() => import('@/pages/home').then(({ HomePage }) => ({ default: HomePage })));

const UseReducerStateManagement = lazy(() =>
  import('@/pages/use-reducer-state-management').then(({ UseReducerStateManagement }) => ({
    default: UseReducerStateManagement,
  })),
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

export const App = () => {
  const { appReady } = useAppInitializer();

  return (
    <ThemeProvider>
      <Notifications />
      <Choose>
        <If condition={appReady}>
          <BrowserRouter>
            <ScrollToTop />
            <Layout>
              <SuspenseProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/state-management" element={<UseReducerStateManagement />} />
                  <Route path="hooks" element={<HooksPage />}></Route>
                  <Route path="/render-props" element={<RenderPropsPage />} />
                  <Route path="/context-providers" element={<ContextProvidersPage />} />
                  <Route
                    path="/container-and-presentation"
                    element={<ContainerAndPresentation />}
                  />
                  <Route path="/hocs" element={<HocsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/compound-components" element={<CompoundComponentsPage />} />
                  <Route path="/lazy-loading" element={<LazyLoadingPage />} />
                  <Route path="/state-machine" element={<StateMachinePage />} />
                  <Route path="/factory" element={<FactoryPage />} />
                  <Route path="*" element={'not found'} />
                </Routes>
              </SuspenseProvider>
            </Layout>
          </BrowserRouter>
        </If>
        <Otherwise>
          <LoadingOverlay
            visible
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{
              color: 'indigo',
              type: 'bars',
            }}
          />
        </Otherwise>
      </Choose>
    </ThemeProvider>
  );
};

