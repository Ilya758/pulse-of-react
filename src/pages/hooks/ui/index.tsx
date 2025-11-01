import { CodeHighlightTabs } from '@mantine/code-highlight';

import { Code, List, Paper, Space, Text, Title } from '@mantine/core';
import { IconFileTypeTs } from '@tabler/icons-react';
import { useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { USE_FETCH_HOOK_CODE } from '../model';
import { Example } from './example';

export const HooksPage = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        React Hooks
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          Hooks are functions that let you use state and other React features in functional
          components. They allow you to write cleaner, more reusable, and easier-to-understand React
          code by encapsulating stateful logic and side effects. Key built-in hooks include{' '}
          <code>useState</code> for managing local state and <code>useEffect</code> for handling
          side effects. Developers can also create custom Hooks to share logic between components.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Understanding React Hooks">
        <Text>
          Hooks are functions that let you "hook into" React state and lifecycle features from
          function components. They were introduced in React 16.8 and allow you to use state and
          other React features without writing a class.
        </Text>
        <Title mb="sm" mt="lg" order={4}>
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

        <Title mb="sm" mt="lg" order={4}>
          Common Hooks
        </Title>
        <Text mb="xs">Here are a couple of the most frequently used built-in Hooks:</Text>
        <Paper mb="sm" p="sm" radius="md" withBorder>
          <Title order={5}>
            <code>useState</code>
          </Title>
          <Text>
            Allows you to add state to functional components. You call it with the initial state,
            and it returns an array with the current state value and a function to update it. For
            example: <Code>const [count, setCount] = useState(0);</Code>
          </Text>
        </Paper>
        <Paper p="sm" radius="md" withBorder>
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

      <SectionBlock initialSpaceAfterDivider="xs" title="When to Use Hooks">
        <Text>
          Hooks should be your go-to for managing state and side effects in all new functional
          components. Consider using Hooks when:
        </Text>
        <List mt="sm" spacing="xs" withPadding={false}>
          <List.Item>
            You need to add local state to a functional component (use <code>useState</code>).
          </List.Item>
          <List.Item>
            You need to perform side effects, such as data fetching, subscriptions, or manually
            changing the DOM (use <code>useEffect</code>).
          </List.Item>
          <List.Item>
            You want to share stateful logic between multiple components (create a custom Hook).
          </List.Item>
          <List.Item>
            You need to access context (use <code>useContext</code>).
          </List.Item>
          <List.Item>
            You need to optimize performance by memoizing values or functions (use{' '}
            <code>useMemo</code> and <code>useCallback</code>).
          </List.Item>
          <List.Item>You are migrating class components to functional components.</List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Rules of Hooks">
        <Text>
          Hooks have a few simple rules you need to follow to ensure they work correctly and to
          avoid bugs. These rules are enforced by the ESLint plugin for Hooks.
        </Text>
        <List mt="md" spacing="sm" type="ordered">
          <List.Item>
            <Title mb={4} order={5}>
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
            <Title mb={4} order={5}>
              Only Call Hooks from React Functions
            </Title>
            <Text>Don't call Hooks from regular JavaScript functions. Instead, you can:</Text>
            <List listStyleType="disc" mt="xs" spacing="xs" withPadding>
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

      <SectionBlock initialSpaceAfterDivider="xs" title="Pros of Using Hooks">
        <List spacing="xs" style={{ listStylePosition: 'inside' }} withPadding>
          <List.Item>
            <strong>Improved Readability & Simplicity:</strong> Hooks make components easier to read
            and understand by co-locating related logic, rather than scattering it across lifecycle
            methods in class components.
          </List.Item>
          <List.Item>
            <strong>Reusable Stateful Logic:</strong> Custom Hooks allow you to extract and reuse
            stateful logic across different components without changing your component hierarchy
            (avoiding issues like "wrapper hell").
          </List.Item>
          <List.Item>
            <strong>No `this` Keyword:</strong> Functional components with Hooks don't use the{' '}
            <code>this</code> keyword, which can be a source of confusion in JavaScript.
          </List.Item>
          <List.Item>
            <strong>Easier Testing:</strong> Logic within custom Hooks can be tested independently,
            making unit testing more straightforward.
          </List.Item>
          <List.Item>
            <strong>Better Composition:</strong> Hooks provide a more flexible way to compose
            behavior into components compared to patterns like higher-order components or render
            props in many scenarios.
          </List.Item>
          <List.Item>
            <strong>Smooth Transition from Classes:</strong> Hooks offer a way to use React features
            without classes, aligning with the functional programming paradigm.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Cons of Using Hooks">
        <List spacing="xs" withPadding>
          <List.Item>
            <strong>Learning Curve:</strong> Understanding the rules of Hooks and concepts like
            closures, dependency arrays for <code>useEffect</code>, <code>useCallback</code>, and{' '}
            <code>useMemo</code> can take time.
          </List.Item>
          <List.Item>
            <strong>Rules Must Be Followed:</strong> The "Rules of Hooks" (e.g., only call Hooks at
            the top level) are essential for them to work correctly and require discipline or
            linting tools.
          </List.Item>
          <List.Item>
            <strong>Dependency Array Pitfalls:</strong> Incorrectly managing the dependency array of{' '}
            <code>useEffect</code>, <code>useMemo</code>, and <code>useCallback</code> can lead to
            stale closures, infinite loops, or missed updates.
          </List.Item>
          <List.Item>
            <strong>Can Be Verbose for Simple Cases:</strong> While powerful, for very simple
            components, Hooks might introduce a bit more boilerplate compared to a plain functional
            component without state or side effects.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: Custom useFetch hook">
        <Text mb="md">
          This example demonstrates fetching data using a custom <code>useFetch</code> hook. The
          hook itself (shown below) utilizes <code>useState</code> and <code>useEffect</code>. The
          data it fetches is typed using the <code>Post</code> interface.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: USE_FETCH_HOOK_CODE,
              fileName: 'useFetch.ts',
              icon: <IconFileTypeTs size={14} />,
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <Example />

      <Space h="xl" />
    </>
  );
};
