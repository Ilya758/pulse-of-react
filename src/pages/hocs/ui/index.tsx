import { useEffect } from 'react';
import { Title, List, Text, Space } from '@mantine/core';
import { IconFileTypeTs, IconInfoCircle } from '@tabler/icons-react';
import { SectionBlock } from '@/shared';
import {
  DASHBOARD_COMPONENT_CODE,
  WITH_AUTH_HOC_CODE,
  WITH_LOADING_HOC_CODE,
  WITH_ANALYTICS_HOC_CODE,
  HOC_PATTERN_SIGNATURE,
  HOC_PATTERN_USAGE,
} from '../model';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Example } from './example';
import { useTocContent } from '@/widgets/layout';

export const HocsPage = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Higher-Order Components (HOCs)
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          Higher-Order Components (HOCs) are a pattern in React for reusing component logic. A HOC
          is a function that takes a component and returns a new component with enhanced
          functionality. This pattern allows you to abstract common behavior into reusable pieces of
          code.
        </Text>
        <Text mt="md">
          The term "Higher-Order Component" comes from the concept of higher-order functions in
          functional programming. Just as a higher-order function is a function that takes a
          function as an argument and/or returns a function, a HOC is a function that takes a
          component as an argument and returns a new component.
        </Text>
      </SectionBlock>

      <SectionBlock title="When to Use HOCs" initialSpaceAfterDivider="xs">
        <Text>HOCs are most effective in specific scenarios. Consider using them when:</Text>
        <List mt="sm" spacing="xs" withPadding={false}>
          <List.Item>
            <strong>Cross-Cutting Concerns:</strong> When you need to add functionality that spans
            across multiple components, such as authentication, logging, or error handling.
          </List.Item>
          <List.Item>
            <strong>Code Reuse:</strong> When you have behavior that needs to be shared between
            multiple components without duplicating code.
          </List.Item>
          <List.Item>
            <strong>Component Enhancement:</strong> When you need to add features to components
            without modifying their original code.
          </List.Item>
          <List.Item>
            <strong>Abstraction of Complex Logic:</strong> When you want to separate complex logic
            from presentational components.
          </List.Item>
          <List.Item>
            <strong>Props Manipulation:</strong> When you need to transform or inject props into
            components.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Pattern Signature" initialSpaceAfterDivider="xs">
        <Text mb="md">
          At its core, a HOC is a function that takes a component and returns a new component with
          enhanced functionality. Here's a simple example:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              fileName: 'withFeature.tsx',
              code: HOC_PATTERN_SIGNATURE,
              language: 'tsx',
            },
            {
              fileName: 'usage.tsx',
              code: HOC_PATTERN_USAGE,
              language: 'tsx',
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Key Caveats & Best Practices" initialSpaceAfterDivider="xs">
        <Text>When working with HOCs, it's important to be aware of these key considerations:</Text>
        <List mt="md" spacing="sm" type="unordered" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} mb={4} c="orange">
              Don't Modify the Original Component
            </Title>
            <Text>
              HOCs should enhance components, not modify them. Always return a new component that
              wraps the original one. This preserves the original component's behavior and makes the
              HOC more predictable and maintainable.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mb={4} c="orange">
              Pass Through Unrelated Props
            </Title>
            <Text>
              Use the spread operator to pass through props that aren't related to the HOC's
              functionality. This ensures that the wrapped component receives all the props it
              expects, maintaining its original interface.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mb={4} c="orange">
              Use Descriptive Names
            </Title>
            <Text>
              Name your HOCs with a "with" prefix to clearly indicate their purpose (e.g., withAuth,
              withLogging). This makes it clear that the component is being enhanced with additional
              functionality.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mb={4} c="orange">
              Avoid Wrapper Hell
            </Title>
            <Text>
              Be cautious when composing multiple HOCs, as it can lead to deeply nested component
              hierarchies that are hard to debug and maintain. Consider using composition or custom
              hooks as alternatives in some cases.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mb={4} c="orange">
              Handle Prop Types Carefully
            </Title>
            <Text>
              Ensure proper TypeScript typing for both the HOC and the wrapped component to maintain
              type safety and good developer experience. This includes properly typing the props
              that the HOC adds to the wrapped component.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mb={4} c="orange">
              Consider Performance Implications
            </Title>
            <Text>
              Be mindful of performance when using HOCs. Each HOC creates a new component, which can
              impact rendering performance if used excessively. Use React.memo or other optimization
              techniques when necessary.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Example: Authentication HOC" initialSpaceAfterDivider="xs">
        <Text mb="md">
          This example demonstrates a practical implementation of an authentication HOC. The HOC
          adds authentication state and login functionality to any component it wraps, allowing for
          easy reuse of authentication logic across different parts of the application.
        </Text>

        <Text mb="md">Here are some common HOC patterns you might encounter:</Text>

        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'withAuth.ts',
              language: 'ts',
              code: WITH_AUTH_HOC_CODE,
              icon: <IconFileTypeTs size={14} />,
            },
            {
              fileName: 'withLoading.ts',
              language: 'ts',
              code: WITH_LOADING_HOC_CODE,
              icon: <IconFileTypeTs size={14} />,
            },
            {
              fileName: 'withAnalytics.ts',
              language: 'ts',
              code: WITH_ANALYTICS_HOC_CODE,
              icon: <IconFileTypeTs size={14} />,
            },
            {
              fileName: 'dashboard.tsx',
              language: 'ts',
              code: DASHBOARD_COMPONENT_CODE,
              icon: <IconFileTypeTs size={14} />,
            },
          ]}
        />

        <Text mb="md">
          Now, let's see how these patterns can be applied in a real-world scenario:
        </Text>

        <Example />
      </SectionBlock>

      <Space h="xl" />
    </>
  );
};

