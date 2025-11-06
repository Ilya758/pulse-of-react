import { Accordion, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeColorContext } from '@/shared';
import { ROUTES } from '../model';
import styles from './styles.module.css';

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
  const activeGroup = useMemo(
    () => ROUTES.find(({ items }) => items.some(({ href }) => pathname === href))?.group,
    [pathname],
  );

  const [openedGroup, setOpenedGroup] = useState<string | null>(activeGroup || null);

  const handleChangeActiveGroup = useCallback((value: string | null) => {
    setOpenedGroup(value);
  }, []);

  useEffect(() => {
    if (!activeGroup) setOpenedGroup(null);
  }, [activeGroup]);

  const links = useMemo(
    () => (
      <Accordion
        className={styles.accordionMenu}
        multiple={false}
        onChange={handleChangeActiveGroup}
        value={openedGroup}
      >
        {ROUTES.map(({ group, icon: GroupIcon, items }) => (
          <Accordion.Item className={styles.accordionItem} key={group} value={group}>
            <Accordion.Control
              icon={
                <ThemeIcon color={colorKey} radius="md" size="lg" variant="light">
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
                    className={styles.link}
                    data-active={isActive || undefined}
                    key={href}
                    onClick={(event) => {
                      event.preventDefault?.();
                      if (pathname !== href) {
                        navigate(href);
                        if (!isTablet) toggle();
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
                    <span className={styles.menuText}>{name}</span>
                  </div>
                );
              })}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    ),
    [
      isTablet,
      navigate,
      toggle,
      pathname,
      colorKey,
      openedGroup,
      bgColor,
      handleChangeActiveGroup,
      textColor,
    ],
  );

  return <div className={styles.scrollableMenu}>{links}</div>;
};
