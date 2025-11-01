import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Code, List, Space, Text, Title } from '@mantine/core';
import { IconFileTypeTs, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { PATTERN_SIGNATURE_CODE } from '../model';
import { Example } from './example';

export const CompoundComponentsPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Compound Components
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          Compound Components is a React pattern for creating components that work together as a
          set. The parent component manages shared state and passes it to its children implicitly,
          often using React context or by cloning children. This allows for highly flexible and
          expressive APIs, where consumers compose the UI by nesting subcomponents.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When to Use This Pattern">
        <Text mb="md">
          Compound Components excel in specific scenarios where you need flexible, composable UI
          with shared state management:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Building reusable UI primitives:
            </Text>{' '}
            Creating flexible, composable components like Tabs, Accordions, or Form fields that need
            to coordinate state.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Complex state coordination:
            </Text>{' '}
            When multiple subcomponents need to share and update related state without prop
            drilling.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Design system components:
            </Text>{' '}
            Building components that need to be highly customizable while maintaining consistent
            behavior.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Ergonomic APIs:
            </Text>{' '}
            When you want to provide a natural, declarative API that reads like the final UI
            structure.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Custom UI Controls:
            </Text>{' '}
            When you want to build a set of related UI controls (e.g., Tabs, Accordions,
            ToggleGroups) that need to share state and coordinate behavior.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Flexible Composition:
            </Text>{' '}
            When you want to give consumers the power to compose the UI by nesting subcomponents,
            rather than relying on a fixed API.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Encapsulated State Sharing:
            </Text>{' '}
            When you want to avoid prop drilling and keep state management encapsulated within a
            component set.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When NOT to Use This Pattern">
        <Text mb="md">
          Understanding when to avoid Compound Components helps you choose the right pattern for
          your specific use case:
        </Text>
        <List mb="lg" spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Simple state management:
            </Text>{' '}
            For basic state that can be handled with useState or useReducer in a single component.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Cross-cutting concerns:
            </Text>{' '}
            For functionality like authentication, logging, or analytics - use HOCs or Custom Hooks
            instead.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Performance-critical scenarios:
            </Text>{' '}
            When context re-renders would cause performance issues - consider prop drilling or state
            lifting.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Simple data fetching:
            </Text>{' '}
            For API calls and data management - Custom Hooks are more appropriate.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Pattern Signature">
        <Text>
          The core of the pattern is a parent component that manages state and passes it to its
          children, either via React context or by cloning children and injecting props.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: PATTERN_SIGNATURE_CODE,
              fileName: 'signatures.tsx',
              icon: <IconFileTypeTs size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          mt="md"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Key Caveats & Best Practices">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Children as API:
            </Title>
            <Text>
              Design your compound components so that the children define the API. This makes the
              component set flexible and expressive for consumers.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Context for Deep Sharing:
            </Title>
            <Text>
              Use React context if you need to share state deeply or avoid prop drilling between
              parent and children.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Document Usage:
            </Title>
            <Text>
              Clearly document how to compose and use your compound components, as the API is less
              explicit than with props alone.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Memoize context value:
            </Title>
            <Text>
              Use <Code>useMemo</Code> to prevent unnecessary context updates and re-renders of all
              consumers.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Split contexts:
            </Title>
            Separate stable data (like configuration) from changing data (like state) into different
            contexts.
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Use React.memo:
            </Title>
            Wrap child components that don't need to re-render when parent state changes.
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Optimize state updates:
            </Title>
            <Text>Use functional updates and avoid creating new objects/arrays unnecessarily.</Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: Tabs Component">
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
