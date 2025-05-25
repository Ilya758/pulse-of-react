import { useCallback } from 'react';
import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';

export const useThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const toggleTheme = useCallback(() => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  }, [setColorScheme, computedColorScheme]);

  return {
    isDark: computedColorScheme === 'dark',
    toggleTheme,
  };
};

