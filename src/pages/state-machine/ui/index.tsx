import { Code, List, Space, Text, Title } from '@mantine/core';
import { useEffect } from 'react';
import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';
import { IconInfoCircle, IconFileTypeTsx, IconFileTypeTs } from '@tabler/icons-react';
import { SectionBlock } from '@/shared';
import {
  TYPES_CODE,
  STATE_MACHINE_CODE,
  EXAMPLE_CODE,
  DISCRIMINATED_UNION_CODE,
} from '../model/constants';
import { useTocContent } from '@/widgets/layout';
import { Example } from './example';

export const StateMachine = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        State Machine with Discriminated Unions
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          State machines are a powerful pattern for managing complex application state with
          predictable transitions. When combined with TypeScript's discriminated unions, they
          provide type-safe state management that prevents impossible states and ensures all state
          transitions are handled correctly.
        </Text>
      </SectionBlock>

      <SectionBlock title="Understanding State Machines" initialSpaceAfterDivider="xs">
        <Text>
          State machines are a mathematical model of computation used to design algorithms and
          computer programs. In React, they help manage complex state transitions in a predictable
          and type-safe manner.
        </Text>
        <Title order={4} mt="lg" mb="sm">
          What are Discriminated Unions?
        </Title>
        <Text>
          Discriminated unions (also called tagged unions) are a TypeScript feature that allows you
          to create a union type where each member has a common property (the discriminator) with a
          unique literal value. This enables exhaustive type checking and prevents impossible state
          combinations.
        </Text>
        <Space h="md" />
        <Text>
          In the context of state machines, each state is represented as a separate type with a
          <Code>type</Code> property that acts as the discriminator:
        </Text>
        <CodeHighlight mt="md" language="tsx" radius="md" code={DISCRIMINATED_UNION_CODE} />
      </SectionBlock>

      <SectionBlock title="When to Use This Pattern" initialSpaceAfterDivider="xs">
        <Text mb="md">
          State machines with discriminated unions excel in specific scenarios where you need
          predictable, type-safe state management:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Complex State Logic:
            </Text>{' '}
            When your component has multiple states with different data requirements and complex
            transition rules between them.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Predictable State Transitions:
            </Text>{' '}
            When you need to ensure that state changes follow specific rules and prevent invalid
            state combinations.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Type Safety Requirements:
            </Text>{' '}
            When you want compile-time guarantees that all possible states are handled and
            impossible states are prevented.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Async Operations:
            </Text>{' '}
            When managing loading, success, and error states for asynchronous operations like API
            calls.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Form State Management:
            </Text>{' '}
            When handling complex form states like validation, submission, and error handling.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Multi-step Processes:
            </Text>{' '}
            When managing workflows with multiple steps, each with their own state requirements.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="When NOT to Use This Pattern" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Understanding when to avoid state machines helps you choose the right pattern for your
          specific use case:
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
              Single state values:
            </Text>{' '}
            When you only need to track a single value without complex transitions or conditions.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Performance-critical scenarios:
            </Text>{' '}
            When the overhead of type checking and discriminated unions would impact performance.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Simple data fetching:
            </Text>{' '}
            For basic API calls - Custom Hooks with useState might be more appropriate.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Pattern Signature" initialSpaceAfterDivider="xs">
        <Text>
          The core of the state machine pattern consists of three main parts: states, actions, and a
          reducer.
        </Text>
        <List mt="md">
          <List.Item>
            <Code>States</Code>: The different conditions your application can be in, each with
            their own data structure.
          </List.Item>
          <List.Item>
            <Code>Actions</Code>: Events that can trigger state transitions, typically dispatched to
            a reducer function.
          </List.Item>
          <List.Item>
            <Code>Reducer</Code>: A pure function that takes the current state and an action,
            returning the new state based on the transition rules.
          </List.Item>
        </List>
        <Space h="md" />
        <Text>
          This pattern is particularly powerful when combined with React's <Code>useReducer</Code>{' '}
          hook, providing a predictable way to manage complex state logic.
        </Text>
      </SectionBlock>

      <SectionBlock title="Key Caveats & Best Practices" initialSpaceAfterDivider="xs">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Use Descriptive State Names:
            </Title>
            <Text>
              Choose clear, descriptive names for your states that reflect the actual condition of
              your application (e.g., <Code>'loading'</Code>, <Code>'error'</Code>,{' '}
              <Code>'success'</Code>).
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Keep States Minimal:
            </Title>
            <Text>
              Each state should only contain the data that's relevant to that specific state. Avoid
              storing data that belongs to other states.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Use Type Guards:
            </Title>
            <Text>
              Create helper functions to check the current state type, making your code more
              readable and maintainable.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Handle All Transitions:
            </Title>
            <Text>
              Ensure your reducer handles all possible action types and state transitions. Use
              TypeScript's exhaustive checking to catch missing cases.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Separate Concerns:
            </Title>
            <Text>
              Keep your state machine logic separate from UI logic. The reducer should be pure and
              not contain side effects.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Memoize State Checks:
            </Title>
            <Text>
              Use <Code>useMemo</Code> for expensive state checks and avoid recreating type guard
              functions on every render.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Document State Transitions:
            </Title>
            <Text>
              Clearly document which actions can transition to which states to help other developers
              understand the state machine flow.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Example: User Registration Multi-Step Modal">
        <CodeHighlightTabs
          withExpandButton={true}
          defaultExpanded={false}
          radius="md"
          code={[
            {
              fileName: 'types.ts',
              language: 'tsx',
              code: TYPES_CODE,
              icon: <IconFileTypeTs size={14} color="#2596be" />,
            },
            {
              fileName: 'state-machine.ts',
              language: 'tsx',
              code: STATE_MACHINE_CODE,
              icon: <IconFileTypeTs size={14} color="#2596be" />,
            },
            {
              fileName: 'example.tsx',
              language: 'tsx',
              code: EXAMPLE_CODE,
              icon: <IconFileTypeTsx size={14} color="#2596be" />,
            },
          ]}
        />

        <Example />
      </SectionBlock>
      <Space h="xl" />
    </>
  );
};

