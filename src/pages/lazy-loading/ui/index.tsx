import { FC, useEffect } from 'react';
import { Title, Text, List, Space, Code, Alert } from '@mantine/core';
import { IconInfoCircle, IconFileTypeTsx, IconAlertTriangle } from '@tabler/icons-react';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';

import { LazyWithErrorBoundaryExample } from './example';
import { LAZY_ERROR_BOUNDARY_CODE, LAZY_LOADING_SIGNATURE_CODE } from '../model/constants';

export const LazyLoadingPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Lazy Loading
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          Lazy loading is a technique that defers loading parts of your application until they are
          needed. In React, this is commonly achieved using <Code>React.lazy</Code> and{' '}
          <Code>Suspense</Code> for component-level code splitting. This approach helps reduce
          initial bundle size and improves perceived performance.
        </Text>
      </SectionBlock>

      <SectionBlock title="When to Use Lazy Loading" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Large Applications:
            </Text>{' '}
            When your app has many routes or features that aren't needed immediately.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Rarely Used Features:
            </Text>{' '}
            For admin panels, settings, or advanced tools that most users won't access on every
            visit.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Heavy Dependencies:
            </Text>{' '}
            When a feature imports large libraries (charts, editors, etc.) that aren't needed on
            initial load.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Route-based Code Splitting:
            </Text>{' '}
            To load page components only when the user navigates to them.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="When NOT to Use Lazy Loading" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Critical UI:
            </Text>{' '}
            Don't lazy load components that are essential for the first paint (e.g., navigation,
            hero section).
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Small Apps:
            </Text>{' '}
            If your app is small, lazy loading adds complexity with little benefit.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Above-the-Fold Content:
            </Text>{' '}
            Content visible on initial load should not be lazy loaded.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="How Bundlers Enable Lazy Loading" initialSpaceAfterDivider="xs">
        <Text>
          Modern bundlers like Vite and Webpack support code splitting out of the box. When you use
          dynamic <Code>import()</Code> or <Code>React.lazy</Code>, the bundler creates separate
          chunks for these modules. These chunks are loaded on demand, reducing the amount of
          JavaScript that needs to be parsed and executed on initial load.
        </Text>
      </SectionBlock>

      <SectionBlock title="Pattern Signature" initialSpaceAfterDivider="xs">
        <Text>The minimal pattern for lazy loading a component in React:</Text>
        <CodeHighlightTabs
          mt="md"
          withExpandButton={false}
          defaultExpanded={false}
          radius="md"
          code={[
            {
              fileName: 'signature.tsx',
              language: 'tsx',
              code: LAZY_LOADING_SIGNATURE_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Key Caveats & Best Practices" initialSpaceAfterDivider="xs">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Show a Good Fallback
            </Title>
            <Text>
              Always provide a user-friendly fallback (spinner, skeleton, etc.) in{' '}
              <Code>Suspense</Code> to avoid blank screens.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Bundle Size Awareness
            </Title>
            <Text>Check your bundle analyzer to ensure code splitting is working as expected.</Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Preload for UX
            </Title>
            <Text>
              For critical routes, consider preloading chunks on hover or after initial load for a
              snappier experience.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Error Boundaries
            </Title>
            <Text>
              Wrap lazy components with an error boundary to handle loading failures gracefully.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Avoid Over-Splitting
            </Title>
            <Text>
              Too many small chunks can hurt performance. Split by route or large feature, not every
              small component.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Handling Errors in Lazy Loading" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Handling errors in lazy-loaded React components is crucial for a robust user experience.
          There are two main approaches:
        </Text>
        <List spacing="xs" mb="md">
          <List.Item>
            <Text span fw={700}>
              Using <Code>.catch</Code> on the dynamic import:
            </Text>{' '}
            You can provide a fallback component if the import fails, instead of throwing an error.
            This is useful for non-critical features.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Using an Error Boundary:
            </Text>{' '}
            For critical features, use an ErrorBoundary to catch errors and show a user-friendly
            message, often instructing the user to reload the page.
          </List.Item>
        </List>
        <Alert
          icon={<IconAlertTriangle size="1rem" />}
          color="red"
          mt="md"
          mb="md"
          title="Common Pitfall: Promise Limitation"
        >
          The Promise returned by <Code>React.lazy</Code> can only be resolved or rejected{' '}
          <Text span fw={700}>
            once
          </Text>{' '}
          for a given module path. If the import fails, the fallback will always be shown for that
          path until the page is reloaded. This is a browser-level limitation of ES modules.
        </Alert>
      </SectionBlock>

      <SectionBlock title="Analyzing Bundle Coverage in DevTools" initialSpaceAfterDivider="xs">
        <Text>
          Chrome DevTools provides a{' '}
          <Text span fw={700}>
            Coverage
          </Text>{' '}
          tab that helps you analyze which parts of your JavaScript and CSS are actually used. This
          is useful for identifying unused code and verifying the effectiveness of lazy loading.
        </Text>
        <Space h="sm" />
        <Text fw={700} mb="xs">
          To use the Coverage tab in Chrome DevTools, follow these steps:
        </Text>
        <List type="ordered" spacing="xs" mt={16} mb={16}>
          <List.Item>Open DevTools (F12 or Cmd+Opt+I)</List.Item>
          <List.Item>Press Ctrl+Shift+P (Cmd+Shift+P on Mac) and type "Coverage"</List.Item>
          <List.Item>Click "Show Coverage"</List.Item>
          <List.Item>Click the reload button in the Coverage tab</List.Item>
          <List.Item>Interact with your app to load lazy chunks</List.Item>
          <List.Item>
            See which JS/CSS is used (gray section of the bar) vs unused (red section of the bar).
          </List.Item>
        </List>
        <Text>This helps you verify that lazy loading is working and identify unused code.</Text>
      </SectionBlock>

      <SectionBlock title="Example: Lazy Feature with React.lazy" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Here is a practical example that demonstrates both the <Code>.catch</Code> fallback
          pattern and the ErrorBoundary approach for handling errors in lazy-loaded components. You
          can view the code and interact with the live demo below.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'LazyWithErrorBoundaryExample.tsx',
              language: 'tsx',
              code: LAZY_ERROR_BOUNDARY_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
        <LazyWithErrorBoundaryExample />
      </SectionBlock>
    </>
  );
};

