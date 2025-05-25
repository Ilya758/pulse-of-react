import { Code, List, Space, Text, Title } from '@mantine/core';
import { Example } from './example';
import { useEffect } from 'react';
import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';
import { IconInfoCircle, IconFileTypeTsx, IconFileTypeTs } from '@tabler/icons-react';
import { SectionBlock } from '@/shared';
import { EXAMPLE_CODE, REDUCER_CODE, TYPES_CODE } from '../model';
import { useTocContent } from '@/widgets/layout';

export const UseReducerStateManagement = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        State Management with useReducer
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          The <Code>useReducer</Code> hook is a powerful tool for managing complex state in React.
          It's particularly useful when your state logic involves multiple sub-values or when the
          next state depends on the previous one. Think of it as a more structured alternative to
          multiple <Code>useState</Code> calls, inspired by Redux patterns.
        </Text>
      </SectionBlock>

      <SectionBlock title="When to Use useReducer" initialSpaceAfterDivider="md">
        <List spacing="xs">
          <List.Item>
            <Title order={5} mb="xs">
              Complex State Logic:
            </Title>
            <Text>
              When state updates are intricate and involve multiple interdependent values.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              Predictable State Transitions:
            </Title>
            <Text>
              When the next state is derived from the previous state in a well-defined manner.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              Centralized Updates:
            </Title>
            <Text>
              To consolidate state update logic in one place (the reducer function), improving code
              organization and maintainability.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mt="sm" mb="xs">
              Performance Optimization:
            </Title>
            <Text>
              Can help avoid prop drilling or deeply nested context updates by passing down a{' '}
              <Code>dispatch</Code> function instead of multiple state setters.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Hook Signature" initialSpaceAfterDivider="md">
        <CodeHighlight
          language="tsx"
          radius="md"
          code={`const [state, dispatch] = useReducer(reducer, initialState, init);`}
        />
        <Space h="md" />
        <Text>
          The <Code>useReducer</Code> accepts three arguments:
        </Text>
        <List>
          <List.Item>
            <Code>reducer</Code>: A pure function <Code>(state, action) ={'>'} newState</Code> that
            specifies how the state updates in response to actions.
          </List.Item>
          <List.Item>
            <Code>initialState</Code>: The initial value of the state.
          </List.Item>
          <List.Item>
            <Code>init</Code> (optional): An initializer function. If provided, the initial state
            will be set to <Code>init(initialState)</Code>. This is useful for resetting state or
            computing initial state lazily.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Key Caveats & Best Practices" initialSpaceAfterDivider="md">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Reducer Purity:
            </Title>
            <Text>
              Reducers must be pure functions. They should not have side effects (e.g., API calls,
              localStorage manipulation) and should return a new state object rather than mutating
              the existing state directly.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Action Objects:
            </Title>
            <Text>
              Define clear and descriptive action types. Typically, an action is an object with a{' '}
              <Code>type</Code> property (a string) and an optional <Code>payload</Code> carrying
              data.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Dispatching Actions:
            </Title>
            <Text>
              The <Code>dispatch</Code> function returned by <Code>useReducer</Code> is stable and
              won't change between re-renders. You can safely pass it down to child components
              without worrying about performance issues due to re-creation.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Complex State Structure:
            </Title>
            <Text>
              For very complex state, consider splitting your reducer into multiple smaller reducers
              that manage specific parts of the state, similar to Redux's{' '}
              <Code>combineReducers</Code>.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Lazy Initialization with <Code>init</Code>:
            </Title>
            <Text>
              Use the third <Code>init</Code> argument for computationally expensive initial state
              or when you need to reset the state based on props.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Example: Table Editor">
        <CodeHighlightTabs
          withExpandButton={true}
          defaultExpanded={false}
          radius="md"
          code={[
            {
              fileName: 'reducer.ts',
              language: 'tsx',
              code: REDUCER_CODE,
              icon: <IconFileTypeTs size={14} color="#2596be" />,
            },
            {
              fileName: 'types.ts',
              language: 'tsx',
              code: TYPES_CODE,
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

