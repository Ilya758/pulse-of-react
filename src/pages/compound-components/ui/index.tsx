import { FC, useEffect } from 'react';
import { Title, Text, List, Space, Code } from '@mantine/core';
import { IconFileTypeTs, IconInfoCircle } from '@tabler/icons-react';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { PATTERN_SIGNATURE_CODE } from '../model';
import { Example } from './example';

export const CompoundComponentsPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Compound Components
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          Compound Components is a React pattern for creating components that work together as a
          set. The parent component manages shared state and passes it to its children implicitly,
          often using React context or by cloning children. This allows for highly flexible and
          expressive APIs, where consumers compose the UI by nesting subcomponents.
        </Text>
      </SectionBlock>

      <SectionBlock title="When to Use This Pattern" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Compound Components excel in specific scenarios where you need flexible, composable UI
          with shared state management:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Building reusable UI primitives:
            </Text>{' '}
            Creating flexible, composable components like Tabs, Accordions, or Form fields that need
            to coordinate state.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Complex state coordination:
            </Text>{' '}
            When multiple subcomponents need to share and update related state without prop
            drilling.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Design system components:
            </Text>{' '}
            Building components that need to be highly customizable while maintaining consistent
            behavior.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Ergonomic APIs:
            </Text>{' '}
            When you want to provide a natural, declarative API that reads like the final UI
            structure.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Custom UI Controls:
            </Text>{' '}
            When you want to build a set of related UI controls (e.g., Tabs, Accordions,
            ToggleGroups) that need to share state and coordinate behavior.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Flexible Composition:
            </Text>{' '}
            When you want to give consumers the power to compose the UI by nesting subcomponents,
            rather than relying on a fixed API.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Encapsulated State Sharing:
            </Text>{' '}
            When you want to avoid prop drilling and keep state management encapsulated within a
            component set.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="When NOT to Use This Pattern" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Understanding when to avoid Compound Components helps you choose the right pattern for
          your specific use case:
        </Text>
        <List mb="lg" spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Simple state management:
            </Text>{' '}
            For basic state that can be handled with useState or useReducer in a single component.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Cross-cutting concerns:
            </Text>{' '}
            For functionality like authentication, logging, or analytics - use HOCs or Custom Hooks
            instead.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Performance-critical scenarios:
            </Text>{' '}
            When context re-renders would cause performance issues - consider prop drilling or state
            lifting.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Simple data fetching:
            </Text>{' '}
            For API calls and data management - Custom Hooks are more appropriate.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Pattern Signature" initialSpaceAfterDivider="xs">
        <Text>
          The core of the pattern is a parent component that manages state and passes it to its
          children, either via React context or by cloning children and injecting props.
        </Text>
        <CodeHighlightTabs
          mt="md"
          withExpandButton
          defaultExpanded={false}
          radius="md"
          code={[
            {
              fileName: 'signatures.tsx',
              language: 'tsx',
              code: PATTERN_SIGNATURE_CODE,
              icon: <IconFileTypeTs size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Key Caveats & Best Practices" initialSpaceAfterDivider="xs">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Children as API:
            </Title>
            <Text>
              Design your compound components so that the children define the API. This makes the
              component set flexible and expressive for consumers.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Context for Deep Sharing:
            </Title>
            <Text>
              Use React context if you need to share state deeply or avoid prop drilling between
              parent and children.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Document Usage:
            </Title>
            <Text>
              Clearly document how to compose and use your compound components, as the API is less
              explicit than with props alone.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Memoize context value:
            </Title>
            <Text>
              Use <Code>useMemo</Code> to prevent unnecessary context updates and re-renders of all
              consumers.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Split contexts:
            </Title>
            Separate stable data (like configuration) from changing data (like state) into different
            contexts.
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Use React.memo:
            </Title>
            Wrap child components that don't need to re-render when parent state changes.
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Optimize state updates:
            </Title>
            <Text>Use functional updates and avoid creating new objects/arrays unnecessarily.</Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Example: Tabs Component" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Below is a comprehensive example of a Tabs compound component, using Mantine UI for
          styling. The parent <code>Tabs</code> manages the selected tab and passes state to{' '}
          <code>TabList</code> and <code>TabPanel</code> children.
        </Text>
        <Example />
      </SectionBlock>
    </>
  );
};

