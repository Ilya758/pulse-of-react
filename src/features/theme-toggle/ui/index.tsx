import { ActionIcon, ActionIconProps } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useThemeToggle } from '..';

type Props = {
  iconSize?: number;
  variant?: ActionIconProps['variant'];
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const ThemeToggle = ({ iconSize = 20, variant = 'default', size = 'lg' }: Props) => {
  const { isDark, toggleTheme } = useThemeToggle();
  const Component = isDark ? IconSun : IconMoon;

  return (
    <ActionIcon
      onClick={toggleTheme}
      variant={variant}
      size={size}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <Component width={iconSize} height={iconSize} />
    </ActionIcon>
  );
};

