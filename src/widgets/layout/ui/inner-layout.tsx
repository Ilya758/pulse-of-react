import { AppShell } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { JSX } from 'react';
import { useLocation } from 'react-router-dom';
import { allowTOC } from '../lib';
import { AppMenu } from './app-menu';
import { AsideTOC } from './aside-toc';
import { Header } from './header';

type Props = {
  children: JSX.Element;
};

export const InnerLayout = ({ children }: Props) => {
  const [opened, { toggle }] = useDisclosure();
  const { pathname } = useLocation();
  const showAside = allowTOC(pathname);
  const isTablet = useMediaQuery('(min-width: 768px)', false);
  const isMobile = useMediaQuery('(max-width: 420px)', false);

  return (
    <AppShell
      aside={{
        breakpoint: 'md',
        collapsed: { desktop: !showAside, mobile: true },
        width: showAside ? 280 : 0,
      }}
      header={{ collapsed: false, height: 60 }}
      navbar={{
        breakpoint: 'sm',
        collapsed: { desktop: false, mobile: !opened },
        width: 250,
      }}
      padding="md"
    >
      <AppShell.Header zIndex={200}>
        <Header isMobile={isMobile} isTablet={isTablet} opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar
        px={0}
        style={{
          overflow: 'auto',
        }}
      >
        <AppMenu isTablet={isTablet} opened={opened} pathname={pathname} toggle={toggle} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      {showAside && (
        <AppShell.Aside p="md">
          <AsideTOC pathname={pathname} />
        </AppShell.Aside>
      )}
    </AppShell>
  );
};
