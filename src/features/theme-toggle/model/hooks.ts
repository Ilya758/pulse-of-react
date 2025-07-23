import { useCallback } from 'react';
import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { useThemeColorContext } from '@/shared';

export const useThemeToggle = () => {
  const { setPrimaryColor } = useThemeColorContext();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const toggleTheme = useCallback(() => {
    setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    setPrimaryColor(computedColorScheme === 'light' ? 'orange' : 'indigo');
  }, [setColorScheme, computedColorScheme, setPrimaryColor]);

  return {
    isDark: computedColorScheme === 'dark',
    toggleTheme,
  };
};

