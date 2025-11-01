import { ActionIcon, Burger, Button, Group, Menu, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandGithub, IconDotsVertical, IconUserCircle } from '@tabler/icons-react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/features/theme-toggle';
import { Choose, If, Otherwise, useThemeColorContext } from '@/shared';
import { Logo } from './logo';

type Props = {
  isTablet?: boolean;
  isMobile?: boolean;
  opened: boolean;
  toggle: () => void;
};

export const Header = ({ opened, toggle, isTablet, isMobile }: Props) => {
  const matchesStoMDesktop = useMediaQuery('(min-width: 992px) and (max-width: 1200px)');
  const navigate = useNavigate();
  const location = useLocation();
  const { primaryColor: colorKey } = useThemeColorContext();
  const { colors } = useMantineTheme();
  const color = colors[colorKey]?.[6];

  const handleLogoGeneralClick = useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/');

      if (!isTablet && opened) {
        toggle();
      }
    }
  }, [isTablet, navigate, opened, toggle, location.pathname]);

  const handleAboutClick = useCallback(() => {
    if (location.pathname !== '/about') {
      navigate('/about');
    }
  }, [navigate, location.pathname]);

  const LogoGroup = (
    <Group align="center" gap={0} justify={'flex-start'}>
      {!isTablet && <Burger hiddenFrom="sm" ml={12} onClick={toggle} opened={opened} size="sm" />}
      <Logo color={color} onClick={handleLogoGeneralClick} size={60} />
      <Text
        c={color}
        fw={700}
        ml="xs"
        onClick={handleLogoGeneralClick}
        size={'xl'}
        style={{ cursor: 'pointer' }}
      >
        Pulse-Of-React
      </Text>
    </Group>
  );
  const ActionsGroup = (
    <Group gap="xs" justify={'flex-end'} style={{}} wrap="nowrap">
      <Choose>
        <If condition={isMobile || matchesStoMDesktop}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon aria-label="Actions menu" size="lg" variant="default">
                <IconDotsVertical stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                component="a"
                href="https://github.com/Ilya758/react-design-patterns"
                leftSection={<IconBrandGithub size={14} />}
                target="_blank"
              >
                GitHub
              </Menu.Item>
              <Menu.Item leftSection={<IconUserCircle size={14} />} onClick={handleAboutClick}>
                About The Author
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item closeMenuOnClick={false}>
                <ThemeToggle />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </If>
        <If condition={isTablet}>
          <ActionIcon
            aria-label="Open GitHub repository"
            component="a"
            href="https://github.com/Ilya758/react-design-patterns"
            size="lg"
            target="_blank"
            variant="default"
          >
            <IconBrandGithub stroke={1.5} />
          </ActionIcon>
          <Button
            aria-label="Meet the Author"
            leftSection={<IconUserCircle size={18} />}
            onClick={handleAboutClick}
            variant="default"
          >
            Meet the Author
          </Button>
          <ThemeToggle />
        </If>
        <Otherwise>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon aria-label="Actions menu" size="lg" variant="default">
                <IconDotsVertical stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                component="a"
                href="https://github.com/Ilya758/react-design-patterns"
                leftSection={<IconBrandGithub size={14} />}
                target="_blank"
              >
                GitHub
              </Menu.Item>
              <Menu.Item leftSection={<IconUserCircle size={14} />} onClick={handleAboutClick}>
                About Me
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <ThemeToggle />
        </Otherwise>
      </Choose>
    </Group>
  );

  return (
    <Group
      align="center"
      gap={0}
      justify="space-between"
      style={{ paddingRight: 'var(--mantine-spacing-md)', width: '100%' }}
    >
      {LogoGroup}
      {ActionsGroup}
    </Group>
  );
};
