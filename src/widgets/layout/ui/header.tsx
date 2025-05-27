import { Group, Text, Burger, Menu, ActionIcon, Button } from '@mantine/core';
import { IconBrandGithub, IconUserCircle, IconDotsVertical } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/features/theme-toggle';
import logoUrl from '/assets/logo.svg?url';
import { useMediaQuery } from '@mantine/hooks';
import { Choose, If, Otherwise } from '@/shared';
import { useCallback } from 'react';

type Props = {
  isTablet?: boolean;
  isMobile?: boolean;
  opened: boolean;
  toggle: () => void;
};

export const Header = ({ opened, toggle, isTablet, isMobile }: Props) => {
  const matchesStoMDesktop = useMediaQuery('(min-width: 992px) and (max-width: 1200px)');
  const navigate = useNavigate();

  const handleLogoGeneralClick = useCallback(() => {
    navigate('/');

    if (!isTablet && opened) {
      toggle();
    }
  }, [isTablet, navigate, opened, toggle]);

  const LogoGroup = (
    <Group gap={0} align="center" justify={'flex-start'}>
      {!isTablet && <Burger ml={12} opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />}
      <img
        src={logoUrl}
        alt="Pulse-Of-React Logo"
        width={60}
        height={60}
        style={{ cursor: 'pointer' }}
        onClick={handleLogoGeneralClick}
      />
      <Text
        component={Link}
        to="/"
        c="indigo"
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
              <Menu.Item component={Link} to="/about" leftSection={<IconUserCircle size={14} />}>
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
            component={Link}
            to="/about"
            variant="default"
            leftSection={<IconUserCircle size={18} />}
            aria-label="Meet the Author"
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
              <Menu.Item component={Link} to="/about" leftSection={<IconUserCircle size={14} />}>
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

