import { useEffect } from 'react';

import { Title, List, Text, Paper, Code, Space } from '@mantine/core';
import { IconFileTypeTs } from '@tabler/icons-react';
import { SectionBlock } from '@/shared';
import { USE_FETCH_HOOK_CODE } from '../model';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Example } from './example';
import { useTocContent } from '@/widgets/layout';

export const HooksPage = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        React Hooks
      </Title>

      <SectionBlock title="Understanding React Hooks" initialSpaceAfterDivider="xs">
        <Text>
          Hooks are functions that let you "hook into" React state and lifecycle features from
          function components. They were introduced in React 16.8 and allow you to use state and
          other React features without writing a class.
        </Text>
        <Title order={4} mt="lg" mb="sm">
          Why use Hooks?
        </Title>
        <List spacing="xs">
          <List.Item>
            <strong>Reusable logic:</strong> Extract stateful logic from a component so it can be
            tested independently and reused.
          </List.Item>
          <List.Item>
            <strong>Simpler components:</strong> Avoid the complexity of `this` keyword and
            lifecycle methods in class components.
          </List.Item>
          <List.Item>
            <strong>Easier to understand:</strong> Code tends to be more straightforward and easier
            to follow.
          </List.Item>
        </List>

        <Title order={4} mt="lg" mb="sm">
          Common Hooks
        </Title>
        <Text mb="xs">Here are a couple of the most frequently used built-in Hooks:</Text>
        <Paper withBorder p="sm" radius="md" mb="sm">
          <Title order={5}>
            <code>useState</code>
          </Title>
          <Text>
            Allows you to add state to functional components. You call it with the initial state,
            and it returns an array with the current state value and a function to update it. For
            example: <Code>const [count, setCount] = useState(0);</Code>
          </Text>
        </Paper>
        <Paper withBorder p="sm" radius="md">
          <Title order={5}>
            <code>useEffect</code>
          </Title>
          <Text>
            Lets you perform side effects in functional components. This is similar to
            `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class
            components, combined. For example, fetching data, subscriptions, or manually changing
            the DOM.
          </Text>
        </Paper>
        <Text mt="md">
          There are many other built-in hooks like <Code>useContext</Code>, <Code>useReducer</Code>{' '}
          (which you might be familiar with from other patterns!), <Code>useCallback</Code>,{' '}
          <Code>useMemo</Code>, and <Code>useRef</Code>. You can also create your own custom Hooks
          to reuse stateful logic between different components.
        </Text>
      </SectionBlock>

      <SectionBlock title="Rules of Hooks" initialSpaceAfterDivider="xs">
        <Text>
          Hooks have a few simple rules you need to follow to ensure they work correctly and to
          avoid bugs. These rules are enforced by the ESLint plugin for Hooks.
        </Text>
        <List mt="md" spacing="sm" type="ordered">
          <List.Item>
            <Title order={5} mb={4}>
              Only Call Hooks at the Top Level
            </Title>
            <Text>
              Don't call Hooks inside loops, conditions, or nested functions. Instead, always use
              Hooks at the top level of your React function, before any early returns. This ensures
              that Hooks are called in the same order each time a component renders, which allows
              React to correctly preserve the state of Hooks between multiple <Code>useState</Code>{' '}
              and <Code>useEffect</Code> calls.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mt="sm" mb={4}>
              Only Call Hooks from React Functions
            </Title>
            <Text>Don't call Hooks from regular JavaScript functions. Instead, you can:</Text>
            <List mt="xs" spacing="xs" listStyleType="disc" withPadding>
              <List.Item>Call Hooks from React function components.</List.Item>
              <List.Item>Call Hooks from custom Hooks (we learned about these earlier!).</List.Item>
            </List>
            <Text mt="xs">
              Following this rule ensures that all stateful logic in a component is clearly visible
              from its source code.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Example: Custom useFetch hook" initialSpaceAfterDivider="xs">
        <Text mb="md">
          This example demonstrates fetching data using a custom <code>useFetch</code> hook. The
          hook itself (shown below) utilizes <code>useState</code> and <code>useEffect</code>. The
          data it fetches is typed using the <code>Post</code> interface.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'useFetch.ts',
              language: 'ts',
              code: USE_FETCH_HOOK_CODE,
              icon: <IconFileTypeTs size={14} color="#2596be" />,
            },
          ]}
        />
      </SectionBlock>

      <Example />

      <Space h="xl" />
    </>
  );
};

