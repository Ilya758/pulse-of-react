import { DefaultMantineColor } from '@mantine/core';
import React, { createContext, useContext, useState } from 'react';

export type ThemeColorContextType = {
  primaryColor: DefaultMantineColor;
  setPrimaryColor: (color: DefaultMantineColor) => void;
};

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(undefined);

export const useThemeColorContext = () => {
  const ctx = useContext(ThemeColorContext);

  if (!ctx) throw new Error('useThemeColorContext must be used within ThemeColorProvider');

  return ctx;
};

function getInitialPrimaryColor(): DefaultMantineColor {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('primaryColor') : null;

  if (stored) return stored as DefaultMantineColor;

  const isDark =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  return isDark ? 'orange' : 'indigo';
}

export const ThemeColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [primaryColor, setPrimaryColorState] =
    useState<DefaultMantineColor>(getInitialPrimaryColor);

  const setPrimaryColor = (color: DefaultMantineColor) => {
    setPrimaryColorState(color);

    if (typeof window !== 'undefined') {
      localStorage.setItem('primaryColor', color);
    }
  };

  return (
    <ThemeColorContext.Provider value={{ primaryColor, setPrimaryColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
};

export { ThemeColorContext };

