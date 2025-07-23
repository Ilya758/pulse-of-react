import { FC, ReactNode } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import { CodeHighlightAdapterProvider, createHighlightJsAdapter } from '@mantine/code-highlight';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import { useHighlightJsStyleManager } from '../model';
import { useThemeColorContext } from '@/shared';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('javascript', typescript);
hljs.registerLanguage('jsx', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('css', scss);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);

const highlightJsAdapter = createHighlightJsAdapter(hljs);

const HighlightJsThemeEffect = () => {
  useHighlightJsStyleManager();
  return null;
};

type Props = {
  children: ReactNode;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const { primaryColor } = useThemeColorContext();

  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider
        theme={{
          fontFamily: 'Outfit, sans-serif',
          headings: { fontFamily: 'Outfit, sans-serif' },
          primaryColor,
          primaryShade: 6,
        }}
      >
        <CodeHighlightAdapterProvider adapter={highlightJsAdapter}>
          <HighlightJsThemeEffect />
          {children}
        </CodeHighlightAdapterProvider>
      </MantineProvider>
    </>
  );
};

