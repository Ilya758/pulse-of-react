import { BrowserRouter } from 'react-router-dom';
import { Layout } from '@/widgets/layout';
import { LoadingOverlay } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { Choose, If, Otherwise, ThemeColorProvider } from '@/shared';
import { ScrollToTop } from './ui';
import { PageTransitionProvider, SuspenseProvider, ThemeProvider } from './providers';
import { ROUTES, useAppInitializer } from './model';
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
              visible
              overlayProps={{ radius: 'sm', blur: 2 }}
              loaderProps={{
                // TODO: use primary color inside consumer
                color: 'indigo',
                type: 'bars',
              }}
            />
          </Otherwise>
        </Choose>
      </ThemeProvider>
    </ThemeColorProvider>
  );
};

