import { Menu } from '@mantine/core';
import { useNavigate } from 'react-router';
import { ROUTES } from '../model';
import styles from './styles.module.css';
import { useMemo } from 'react';

type Props = {
  isTablet?: boolean;
  opened: boolean;
  pathname: string;
  toggle: () => void;
};

export const AppMenu = ({ isTablet, pathname, toggle }: Props) => {
  const navigate = useNavigate();
  const links = useMemo(() => {
    return ROUTES.map(({ href, name }) => (
      <Menu.Item
        component="a"
        href={href}
        className={styles.link}
        data-active={pathname === href || undefined}
        onClick={(event) => {
          event.preventDefault();

          if (pathname !== href) {
            navigate(href);

            if (!isTablet) {
              toggle();
            }
          } else if (!isTablet) {
            toggle();
          }
        }}
        key={href}
      >
        {name}
      </Menu.Item>
    ));
  }, [isTablet, navigate, pathname, toggle]);

  return (
    <Menu trigger="hover" loop={false} withinPortal={false} trapFocus={false}>
      {links}
    </Menu>
  );
};

