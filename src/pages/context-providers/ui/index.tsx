import { Code, List, Space, Text, Title, Alert } from '@mantine/core';
import { Example } from './example';
import { useEffect } from 'react';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { IconFileTypeTsx, IconInfoCircle, IconAlertTriangle } from '@tabler/icons-react';
import { SectionBlock } from '@/shared';
import { EXAMPLE_CODE, PROVIDER_CODE, CONSUMER_CODE, CONTEXT_CODE } from '../model/constants';
import { useTocContent } from '@/widgets/layout';

export const ContextProvidersPage: React.FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Context Providers
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          The React Context API provides a way to pass data through the component tree without
          having to pass props down manually at every level. It's designed to share data that can be
          considered "global" for a tree of React components, such as the current authenticated
          user, theme, or preferred language.
        </Text>
        <Text mt="sm">The API revolves around three main parts:</Text>
        <List spacing="xs" mt="sm" type="ordered">
          <List.Item>
            <Text>
              <Code>React.createContext()</Code>: This function creates a Context object. When React
              renders a component that subscribes to this Context object, it will read the current
              context value from the closest matching <Code>Provider</Code> above it in the tree.
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <Code>Context.Provider</Code>: Every Context object comes with a Provider React
              component that allows consuming components to subscribe to context changes. The
              Provider component accepts a <Code>value</Code> prop to be passed to consuming
              components that are descendants of this Provider. One Provider can be connected to
              many consumers. Providers can be nested to override values deeper within the tree.
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              <Code>Context.Consumer</Code> or <Code>useContext()</Code> Hook: Consuming components
              can read the context value in two ways:
              <List listStyleType="disc" withPadding mt="xs">
                <List.Item>
                  <Code>Context.Consumer</Code>: A React component that subscribes to context
                  changes. It requires a function as a child (a render prop) that receives the
                  current context value and returns a React node.
                </List.Item>
                <List.Item>
                  <Code>useContext(MyContext)</Code>: A React Hook that lets you read the context.
                  It accepts the context object itself (the result of{' '}
                  <Code>React.createContext</Code>) and returns the current context value. This is
                  the more common and often simpler way to consume context in functional components.
                </List.Item>
              </List>
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="When to Use Context" initialSpaceAfterDivider="md">
        <List spacing="xs" type="ordered">
          <List.Item>
            <Title order={5} mb="xs">
              Global Data Management:
            </Title>
            <Text>
              For data that many components need access to, regardless of their depth in the
              component tree (e.g., user authentication status, UI theme, language settings).
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mb="xs">
              Avoiding Prop Drilling:
            </Title>
            <Text>
              When you find yourself passing the same props through many layers of intermediate
              components that don't actually use the props themselves.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mb="xs">
              Managing Complex State:
            </Title>
            <Text>
              While not a full-fledged state management library like Redux or Zustand, Context can
              be used in conjunction with <Code>useReducer</Code> to manage more complex state that
              needs to be shared across different parts of your application.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Pattern Signature" initialSpaceAfterDivider="md">
        <Text>
          Implementing Context involves creating the context, providing a value, and consuming it.
        </Text>
        <Space h="md" />
        <CodeHighlightTabs
          withExpandButton={true}
          defaultExpanded={false}
          radius="md"
          code={[
            {
              fileName: 'MyContext.ts',
              language: 'tsx',
              code: CONTEXT_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
            {
              fileName: 'MyProvider.tsx',
              language: 'tsx',
              code: PROVIDER_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
            {
              fileName: 'MyComponent.tsx (Consuming)',
              language: 'tsx',
              code: CONSUMER_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Key Caveats & Best Practices" initialSpaceAfterDivider="md">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Performance:
            </Title>
            <Text>
              Context uses reference identity to determine when to re-render. If the value passed to
              the Provider changes (even if it's a new object/array with the same content), all
              consuming components will re-render. To optimize, you can:
              <List listStyleType="disc" withPadding mt="xs">
                <List.Item>
                  Memoize the value passed to the Provider using <Code>useMemo</Code> or by ensuring
                  it's stable (e.g., state from <Code>useState</Code> or <Code>useReducer</Code>).
                </List.Item>
                <List.Item>
                  Split contexts if different parts of the application need different, unrelated
                  pieces of data. This way, updates to one context don't cause re-renders for
                  components only consuming another.
                </List.Item>
              </List>
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Default Value Importance:
            </Title>
            <Text>
              The default value in <Code>React.createContext(defaultValue)</Code> is used when a
              component does not have a matching Provider above it in the tree. This is useful for
              testing components in isolation or for components that can function without the
              context being present.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Provider Placement:
            </Title>
            <Text>
              Place Providers as deep as possible in the component tree, encompassing only the
              components that need access to that specific context. Avoid wrapping your entire
              application in a single, massive provider if only a small part needs the data.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Readability and Alternatives:
            </Title>
            <Text>
              While Context is powerful, for very complex state management scenarios, dedicated
              libraries like Redux, Zustand, or Recoil might offer more robust solutions with better
              tooling and performance optimizations out-of-the-box.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mt="sm" mb="xs">
              Type Safety with TypeScript:
            </Title>
            <Text>
              When using TypeScript, clearly define the type of your context value. If a context
              might not be available (e.g., no Provider in the tree), type its value as{' '}
              <Code>MyContextType | undefined</Code> and always check for <Code>undefined</Code> in
              consumers before accessing its properties to prevent runtime errors.
            </Text>
          </List.Item>
        </List>
        <Alert
          icon={<IconAlertTriangle size="1rem" />}
          title="Common Pitfall: Object Identity in Provider Value"
          color="red"
          radius="md"
          mt="lg"
        >
          A common mistake is passing a new object or array directly in the <Code>value</Code> prop
          of the Provider on every render, like{' '}
          <Code>{'<MyContext.Provider value={{ message, setMessage }}>'}</Code>. This causes all
          consumers to re-render because the <Code>value</Code> prop is a new object reference each
          time, even if its contents are identical. Instead, memoize the value or ensure it's a
          stable reference (e.g., state from <Code>useState</Code> or <Code>useReducer</Code>, or
          use <Code>useMemo</Code>).
        </Alert>
      </SectionBlock>

      <SectionBlock title="Example: User Preferences Context" initialSpaceAfterDivider="xs">
        <Text mb="md">
          This example demonstrates a more comprehensive use of Context API combined with{' '}
          <Code>useReducer</Code>
          to manage a "User Preferences" state. It includes settings for theme (light/dark/system),
          notification preferences, and the number of items to display per page. The{' '}
          <Code>UserPreferencesProvider</Code> makes these settings available to various components.
          The <Code>SettingsPanel</Code> allows modification of these preferences, the{' '}
          <Code>DisplayPreferences</Code> component shows the current state, and the{' '}
          <Code>MockContent</Code> component dynamically adjusts its appearance and content based on
          these shared preferences, showcasing how context can facilitate communication and state
          sharing across different parts of an application.
        </Text>
        <CodeHighlightTabs
          withExpandButton={true}
          defaultExpanded={false}
          radius="md"
          code={[
            {
              fileName: 'Example.tsx',
              language: 'tsx',
              code: EXAMPLE_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
        <Example />
      </SectionBlock>
      <Space h="xl" />
    </>
  );
};

