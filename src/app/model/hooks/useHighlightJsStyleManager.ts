import { useEffect } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import lightThemeCss from 'highlight.js/styles/atom-one-light.min.css?raw';
import darkThemeCss from 'highlight.js/styles/atom-one-dark.min.css?raw';

const INLINE_STYLE_ID = 'highlightjs-theme-inline-style';

export const useHighlightJsStyleManager = () => {
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    let styleTag = document.getElementById(INLINE_STYLE_ID) as HTMLStyleElement | null;

    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = INLINE_STYLE_ID;
      document.head.appendChild(styleTag);
    }

    const targetThemeCss = colorScheme === 'dark' ? darkThemeCss : lightThemeCss;

    if (styleTag.textContent !== targetThemeCss) {
      styleTag.textContent = targetThemeCss;
    }
  }, [colorScheme]);
};

