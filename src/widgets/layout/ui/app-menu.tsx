import { Menu, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router';
import { ROUTES } from '../model';
import styles from './styles.module.css';
import { useMemo } from 'react';
import { useThemeColorContext } from '@/shared';

type Props = {
  isTablet?: boolean;
  opened: boolean;
  pathname: string;
  toggle: () => void;
};

export const AppMenu = ({ isTablet, pathname, toggle }: Props) => {
  const navigate = useNavigate();
  const { colors, white: textColor } = useMantineTheme();
  const { primaryColor: colorKey } = useThemeColorContext();
  const bgColor = colors[colorKey]?.[6];

  const links = useMemo(() => {
    return ROUTES.map(({ href, name }) => {
      const isActive = pathname === href;

      return (
        <Menu.Item
          component="a"
          className={styles.link}
          key={href}
          data-active={isActive || undefined}
          href={href}
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
          style={
            isActive
              ? {
                  backgroundColor: bgColor,
                  color: textColor,
                }
              : undefined
          }
        >
          {name}
        </Menu.Item>
      );
    });
  }, [isTablet, navigate, pathname, toggle, bgColor, textColor]);

  return (
    <div className={styles.scrollableMenu}>
      <Menu trigger="hover" loop={false} withinPortal={false} trapFocus={false}>
        {links}
      </Menu>
    </div>
  );
};

