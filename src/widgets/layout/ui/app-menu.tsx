import { Accordion, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router';
import { ROUTES } from '../model';
import styles from './styles.module.css';
import { useMemo, useState, useEffect, useCallback } from 'react';
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
  const activeGroup = useMemo(() => {
    return ROUTES.find(({ items }) => items.some(({ href }) => pathname === href))?.group;
  }, [pathname]);

  const [openedGroup, setOpenedGroup] = useState<string | null>(activeGroup || null);

  const handleChangeActiveGroup = useCallback((value: string | null) => {
    setOpenedGroup(value);
  }, []);

  useEffect(() => {
    if (!activeGroup) setOpenedGroup(null);
  }, [activeGroup]);

  const links = useMemo(() => {
    return (
      <Accordion
        multiple={false}
        value={openedGroup}
        className={styles.accordionMenu}
        onChange={handleChangeActiveGroup}
      >
        {ROUTES.map(({ group, icon: GroupIcon, items }) => (
          <Accordion.Item value={group} key={group} className={styles.accordionItem}>
            <Accordion.Control
              icon={
                <ThemeIcon color={colorKey} variant="light" size="lg" radius="md">
                  <GroupIcon size={18} />
                </ThemeIcon>
              }
            >
              <Text fw={500}>{group}</Text>
            </Accordion.Control>
            <Accordion.Panel>
              {items.map(({ href, name }) => {
                const isActive = pathname === href;
                return (
                  <div
                    key={href}
                    className={styles.link}
                    data-active={isActive || undefined}
                    style={
                      isActive
                        ? {
                            backgroundColor: bgColor,
                            color: textColor,
                          }
                        : undefined
                    }
                    onClick={(event) => {
                      event.preventDefault?.();
                      if (pathname !== href) {
                        navigate(href);
                        if (!isTablet) toggle();
                      } else if (!isTablet) {
                        toggle();
                      }
                    }}
                  >
                    <span className={styles.menuText}>{name}</span>
                  </div>
                );
              })}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  }, [isTablet, navigate, pathname, toggle, colorKey, openedGroup]);

  return <div className={styles.scrollableMenu}>{links}</div>;
};

