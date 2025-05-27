import { AppShell } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useLocation } from 'react-router';
import { Header } from './header';
import { JSX } from 'react';
import { AppMenu } from './app-menu';
import { AsideTOC } from './aside-toc';
import { allowTOC } from '../lib';

type Props = {
  children: JSX.Element;
};

export const InnerLayout = ({ children }: Props) => {
  const [opened, { toggle }] = useDisclosure();
  const { pathname } = useLocation();
  const showAside = allowTOC(pathname);
  const isTablet = useMediaQuery('(min-width: 768px)', false);
  const isMobile = useMediaQuery('(max-width: 420px)', false);
  const isSDesktop = useMediaQuery('(min-width: 992px)');

  return (
    <AppShell
      header={{ height: 60, collapsed: false }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: false },
      }}
      layout="alt"
      aside={{
        width: showAside ? 280 : 0,
        breakpoint: 'md',
        collapsed: { mobile: true, desktop: !showAside },
      }}
      padding="md"
    >
      <AppShell.Header zIndex={200}>
        <Header opened={opened} toggle={toggle} isTablet={isTablet} isMobile={isMobile} />
      </AppShell.Header>

      <AppShell.Navbar p="md" pt={!isSDesktop && opened ? 72 : 'md'}>
        <AppMenu opened={opened} pathname={pathname} toggle={toggle} isTablet={isTablet} />
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

