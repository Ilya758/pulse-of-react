import { AppShell, Menu } from '@mantine/core';
import { ROUTES } from '../../model';

import styles from './styles.module.css';
import { useNavigate } from 'react-router';
import { useMediaQuery } from '@mantine/hooks';

type Props = {
  matches768?: boolean;
  opened: boolean;
  pathname: string;
  toggle: () => void;
};

export const Navbar = ({ matches768, opened, pathname, toggle }: Props) => {
  const navigate = useNavigate();
  const asideBreakpoint = useMediaQuery('(min-width: 992px)');

  return (
    <AppShell.Navbar p="md" pt={!asideBreakpoint && opened ? 72 : 'md'}>
      <Menu trigger="hover" loop={false} withinPortal={false} trapFocus={false}>
        {ROUTES.map(({ href, name }) => (
          <Menu.Item
            className={styles.link}
            data-active={pathname === href || undefined}
            onClick={(event) => {
              if (pathname !== href) {
                event.preventDefault();
                navigate(href);

                if (!matches768) {
                  toggle();
                }
              }
            }}
            key={href}
          >
            {name}
          </Menu.Item>
        ))}
      </Menu>
    </AppShell.Navbar>
  );
};

