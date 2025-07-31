import { Group, Text, Burger, Menu, ActionIcon, Button } from '@mantine/core';
import { IconBrandGithub, IconUserCircle, IconDotsVertical } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/features/theme-toggle';
import { useMediaQuery } from '@mantine/hooks';
import { Choose, If, Otherwise } from '@/shared';
import { useCallback } from 'react';
import { useThemeColorContext } from '@/shared';
import { useMantineTheme } from '@mantine/core';
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
    <Group gap={0} align="center" justify={'flex-start'}>
      {!isTablet && <Burger ml={12} opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />}
      <Logo color={color} size={60} onClick={handleLogoGeneralClick} />
      <Text
        c={color}
        fw={700}
        size={'xl'}
        ml="xs"
        onClick={handleLogoGeneralClick}
        style={{ cursor: 'pointer' }}
      >
        Pulse-Of-React
      </Text>
    </Group>
  );
  const ActionsGroup = (
    <Group gap="xs" wrap="nowrap" justify={'flex-end'} style={{}}>
      <Choose>
        <If condition={isMobile || matchesStoMDesktop}>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="default" aria-label="Actions menu" size="lg">
                <IconDotsVertical stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                component="a"
                href="https://github.com/Ilya758/react-design-patterns"
                target="_blank"
                leftSection={<IconBrandGithub size={14} />}
              >
                GitHub
              </Menu.Item>
              <Menu.Item onClick={handleAboutClick} leftSection={<IconUserCircle size={14} />}>
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
            component="a"
            href="https://github.com/Ilya758/react-design-patterns"
            target="_blank"
            variant="default"
            aria-label="Open GitHub repository"
            size="lg"
          >
            <IconBrandGithub stroke={1.5} />
          </ActionIcon>
          <Button
            variant="default"
            leftSection={<IconUserCircle size={18} />}
            aria-label="Meet the Author"
            onClick={handleAboutClick}
          >
            Meet the Author
          </Button>
          <ThemeToggle />
        </If>
        <Otherwise>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="default" aria-label="Actions menu" size="lg">
                <IconDotsVertical stroke={1.5} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                component="a"
                href="https://github.com/Ilya758/react-design-patterns"
                target="_blank"
                leftSection={<IconBrandGithub size={14} />}
              >
                GitHub
              </Menu.Item>
              <Menu.Item onClick={handleAboutClick} leftSection={<IconUserCircle size={14} />}>
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
      gap={0}
      align="center"
      justify="space-between"
      style={{ width: '100%', paddingRight: 'var(--mantine-spacing-md)' }}
    >
      {LogoGroup}
      {ActionsGroup}
    </Group>
  );
};

