import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';
import { Code, List, Space, Text, Title } from '@mantine/core';
import { IconFileTypeTs, IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import {
  DISCRIMINATED_UNION_CODE,
  EXAMPLE_CODE,
  STATE_MACHINE_CODE,
  TYPES_CODE,
} from '../model/constants';
import { Example } from './example';

export const StateMachine = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        State Machine
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          State machines are a powerful pattern for managing complex application state with
          predictable transitions. When combined with TypeScript's discriminated unions, they
          provide type-safe state management that prevents impossible states and ensures all state
          transitions are handled correctly.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Understanding State Machines">
        <Text>
          State machines are a mathematical model of computation used to design algorithms and
          computer programs. In React, they help manage complex state transitions in a predictable
          and type-safe manner.
        </Text>
        <Title mb="sm" mt="lg" order={4}>
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
        <CodeHighlight code={DISCRIMINATED_UNION_CODE} language="tsx" mt="md" radius="md" />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When to Use This Pattern">
        <Text mb="md">
          State machines with discriminated unions excel in specific scenarios where you need
          predictable, type-safe state management:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Complex State Logic:
            </Text>{' '}
            When your component has multiple states with different data requirements and complex
            transition rules between them.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Predictable State Transitions:
            </Text>{' '}
            When you need to ensure that state changes follow specific rules and prevent invalid
            state combinations.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Type Safety Requirements:
            </Text>{' '}
            When you want compile-time guarantees that all possible states are handled and
            impossible states are prevented.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Async Operations:
            </Text>{' '}
            When managing loading, success, and error states for asynchronous operations like API
            calls.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Form State Management:
            </Text>{' '}
            When handling complex form states like validation, submission, and error handling.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Multi-step Processes:
            </Text>{' '}
            When managing workflows with multiple steps, each with their own state requirements.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When NOT to Use This Pattern">
        <Text mb="md">
          Understanding when to avoid state machines helps you choose the right pattern for your
          specific use case:
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
              Single state values:
            </Text>{' '}
            When you only need to track a single value without complex transitions or conditions.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Performance-critical scenarios:
            </Text>{' '}
            When the overhead of type checking and discriminated unions would impact performance.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Simple data fetching:
            </Text>{' '}
            For basic API calls - Custom Hooks with useState might be more appropriate.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Pattern Signature">
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

      <SectionBlock initialSpaceAfterDivider="xs" title="Key Caveats & Best Practices">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Use Descriptive State Names:
            </Title>
            <Text>
              Choose clear, descriptive names for your states that reflect the actual condition of
              your application (e.g., <Code>'loading'</Code>, <Code>'error'</Code>,{' '}
              <Code>'success'</Code>).
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Keep States Minimal:
            </Title>
            <Text>
              Each state should only contain the data that's relevant to that specific state. Avoid
              storing data that belongs to other states.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Use Type Guards:
            </Title>
            <Text>
              Create helper functions to check the current state type, making your code more
              readable and maintainable.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Handle All Transitions:
            </Title>
            <Text>
              Ensure your reducer handles all possible action types and state transitions. Use
              TypeScript's exhaustive checking to catch missing cases.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Separate Concerns:
            </Title>
            <Text>
              Keep your state machine logic separate from UI logic. The reducer should be pure and
              not contain side effects.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Memoize State Checks:
            </Title>
            <Text>
              Use <Code>useMemo</Code> for expensive state checks and avoid recreating type guard
              functions on every render.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
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
          code={[
            {
              code: TYPES_CODE,
              fileName: 'types.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'tsx',
            },
            {
              code: STATE_MACHINE_CODE,
              fileName: 'state-machine.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'tsx',
            },
            {
              code: EXAMPLE_CODE,
              fileName: 'example.tsx',
              icon: <IconFileTypeTsx color="#2596be" size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          radius="md"
          withExpandButton={true}
        />

        <Example />
      </SectionBlock>
      <Space h="xl" />
    </>
  );
};
