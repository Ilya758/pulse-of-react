import { LoadingOverlay } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import '@mantine/notifications/styles.css';
import { Choose, If, Otherwise, ThemeColorProvider } from '@/shared';
import { ROUTES, useAppInitializer } from './model';
import { PageTransitionProvider, SuspenseProvider, ThemeProvider } from './providers';
import { ScrollToTop } from './ui';
import './index.css';

export const App = () => {
  const { appReady } = useAppInitializer();

  return (
    <ThemeColorProvider>
      <ThemeProvider>
        <Notifications />
        <Choose>
          <If condition={appReady}>
            <BrowserRouter>
              <ScrollToTop />
              <Layout>
                <SuspenseProvider>
                  <PageTransitionProvider routes={ROUTES} />
                </SuspenseProvider>
              </Layout>
            </BrowserRouter>
          </If>
          <Otherwise>
            <LoadingOverlay
              loaderProps={{
                // TODO: use primary color inside consumer
                color: 'indigo',
                type: 'bars',
              }}
              overlayProps={{ blur: 2, radius: 'sm' }}
              visible
            />
          </Otherwise>
        </Choose>
      </ThemeProvider>
    </ThemeColorProvider>
  );
};
