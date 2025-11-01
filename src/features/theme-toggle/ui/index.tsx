import { ActionIcon, ActionIconProps } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
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
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={toggleTheme}
      size={size}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      variant={variant}
    >
      <Component height={iconSize} width={iconSize} />
    </ActionIcon>
  );
};
