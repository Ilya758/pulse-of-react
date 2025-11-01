import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Alert, Code, List, Space, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { LAZY_ERROR_BOUNDARY_CODE, LAZY_LOADING_SIGNATURE_CODE } from '../model/constants';
import { LazyWithErrorBoundaryExample } from './example';

export const LazyLoadingPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Lazy Loading
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          Lazy loading is a technique that defers loading parts of your application until they are
          needed. In React, this is commonly achieved using <Code>React.lazy</Code> and{' '}
          <Code>Suspense</Code> for component-level code splitting. This approach helps reduce
          initial bundle size and improves perceived performance.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When to Use Lazy Loading">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Large Applications:
            </Text>{' '}
            When your app has many routes or features that aren't needed immediately.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Rarely Used Features:
            </Text>{' '}
            For admin panels, settings, or advanced tools that most users won't access on every
            visit.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Heavy Dependencies:
            </Text>{' '}
            When a feature imports large libraries (charts, editors, etc.) that aren't needed on
            initial load.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Route-based Code Splitting:
            </Text>{' '}
            To load page components only when the user navigates to them.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When NOT to Use Lazy Loading">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Critical UI:
            </Text>{' '}
            Don't lazy load components that are essential for the first paint (e.g., navigation,
            hero section).
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Small Apps:
            </Text>{' '}
            If your app is small, lazy loading adds complexity with little benefit.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Above-the-Fold Content:
            </Text>{' '}
            Content visible on initial load should not be lazy loaded.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="How Bundlers Enable Lazy Loading">
        <Text>
          Modern bundlers like Vite and Webpack support code splitting out of the box. When you use
          dynamic <Code>import()</Code> or <Code>React.lazy</Code>, the bundler creates separate
          chunks for these modules. These chunks are loaded on demand, reducing the amount of
          JavaScript that needs to be parsed and executed on initial load.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Pattern Signature">
        <Text>The minimal pattern for lazy loading a component in React:</Text>
        <CodeHighlightTabs
          code={[
            {
              code: LAZY_LOADING_SIGNATURE_CODE,
              fileName: 'signature.tsx',
              icon: <IconFileTypeTsx size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          mt="md"
          radius="md"
          withExpandButton={false}
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Key Caveats & Best Practices">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Show a Good Fallback
            </Title>
            <Text>
              Always provide a user-friendly fallback (spinner, skeleton, etc.) in{' '}
              <Code>Suspense</Code> to avoid blank screens.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Bundle Size Awareness
            </Title>
            <Text>Check your bundle analyzer to ensure code splitting is working as expected.</Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Preload for UX
            </Title>
            <Text>
              For critical routes, consider preloading chunks on hover or after initial load for a
              snappier experience.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Error Boundaries
            </Title>
            <Text>
              Wrap lazy components with an error boundary to handle loading failures gracefully.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Avoid Over-Splitting
            </Title>
            <Text>
              Too many small chunks can hurt performance. Split by route or large feature, not every
              small component.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Handling Errors in Lazy Loading">
        <Text mb="md">
          Handling errors in lazy-loaded React components is crucial for a robust user experience.
          There are two main approaches:
        </Text>
        <List mb="md" spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Using <Code>.catch</Code> on the dynamic import:
            </Text>{' '}
            You can provide a fallback component if the import fails, instead of throwing an error.
            This is useful for non-critical features.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Using an Error Boundary:
            </Text>{' '}
            For critical features, use an ErrorBoundary to catch errors and show a user-friendly
            message, often instructing the user to reload the page.
          </List.Item>
        </List>
        <Alert
          color="red"
          icon={<IconAlertTriangle size="1rem" />}
          mb="md"
          mt="md"
          title="Common Pitfall: Promise Limitation"
        >
          The Promise returned by <Code>React.lazy</Code> can only be resolved or rejected{' '}
          <Text fw={700} span>
            once
          </Text>{' '}
          for a given module path. If the import fails, the fallback will always be shown for that
          path until the page is reloaded. This is a browser-level limitation of ES modules.
        </Alert>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Analyzing Bundle Coverage in DevTools">
        <Text>
          Chrome DevTools provides a{' '}
          <Text fw={700} span>
            Coverage
          </Text>{' '}
          tab that helps you analyze which parts of your JavaScript and CSS are actually used. This
          is useful for identifying unused code and verifying the effectiveness of lazy loading.
        </Text>
        <Space h="sm" />
        <Text fw={700} mb="xs">
          To use the Coverage tab in Chrome DevTools, follow these steps:
        </Text>
        <List mb={16} mt={16} spacing="xs" type="ordered">
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

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: Lazy Feature with React.lazy">
        <Text mb="md">
          Here is a practical example that demonstrates both the <Code>.catch</Code> fallback
          pattern and the ErrorBoundary approach for handling errors in lazy-loaded components. You
          can view the code and interact with the live demo below.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: LAZY_ERROR_BOUNDARY_CODE,
              fileName: 'LazyWithErrorBoundaryExample.tsx',
              icon: <IconFileTypeTsx size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
        <LazyWithErrorBoundaryExample />
      </SectionBlock>
    </>
  );
};
