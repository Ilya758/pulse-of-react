import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { lazy } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { ThemeProvider } from './providers/theme-provider';

import { HomePage } from '@/pages/home';
import { AboutPage } from '@/pages/about';
import { Choose, If, Otherwise } from '@/shared';
import { SuspenseProvider } from './providers';
import { ScrollToTop } from './ui';
import { useAppInitializer } from './model';

const UseReducerStateManagement = lazy(() =>
  import('@/pages/use-reducer-state-management').then(({ UseReducerStateManagement }) => ({
    default: UseReducerStateManagement,
  })),
);

const HooksPage = lazy(() =>
  import('@/pages/hooks').then(({ HooksPage }) => ({ default: HooksPage })),
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
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/state-management"
                  element={
                    <SuspenseProvider>
                      <UseReducerStateManagement />
                    </SuspenseProvider>
                  }
                />
                <Route path="settings" element={'settings'}></Route>
                <Route
                  path="hooks"
                  element={
                    <SuspenseProvider>
                      <HooksPage />
                    </SuspenseProvider>
                  }
                ></Route>
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={'not found'} />
              </Routes>
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

