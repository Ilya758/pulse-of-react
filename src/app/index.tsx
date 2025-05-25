import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { lazy } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { ThemeProvider } from './providers/theme-provider';

import { Choose, If, Otherwise } from '@/shared';
import { ScrollToTop } from './ui';
import { useAppInitializer } from './model';
import { SuspenseProvider } from './providers';

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

export const App = () => {
  const { appReady } = useAppInitializer();
  const basename = import.meta.env.PROD ? '/react-design-patterns/' : '/';

  return (
    <ThemeProvider>
      <Choose>
        <If condition={appReady}>
          <BrowserRouter basename={basename}>
            <ScrollToTop />
            <Layout>
              <SuspenseProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/state-management" element={<UseReducerStateManagement />} />
                  <Route path="hooks" element={<HooksPage />}></Route>
                  <Route path="/about" element={<AboutPage />} />
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
              children: 'Almost there!',
              color: 'indigo',
              type: 'bars',
            }}
          />
        </Otherwise>
      </Choose>
    </ThemeProvider>
  );
};

