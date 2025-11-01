import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Alert, Code, List, Space, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { CONSUMER_CODE, CONTEXT_CODE, EXAMPLE_CODE, PROVIDER_CODE } from '../model/constants';
import { Example } from './example';

export const ContextProvidersPage: React.FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Context Providers
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          The React Context API provides a way to pass data through the component tree without
          having to pass props down manually at every level. It's designed to share data that can be
          considered "global" for a tree of React components, such as the current authenticated
          user, theme, or preferred language.
        </Text>
        <Text mt="sm">The API revolves around three main parts:</Text>
        <List mt="sm" spacing="xs" type="ordered">
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
              <List listStyleType="disc" mt="xs" withPadding>
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

      <SectionBlock initialSpaceAfterDivider="md" title="When to Use Context">
        <List spacing="xs" type="ordered">
          <List.Item>
            <Title mb="xs" order={5}>
              Global Data Management:
            </Title>
            <Text>
              For data that many components need access to, regardless of their depth in the
              component tree (e.g., user authentication status, UI theme, language settings).
            </Text>
          </List.Item>
          <List.Item>
            <Title mb="xs" order={5}>
              Avoiding Prop Drilling:
            </Title>
            <Text>
              When you find yourself passing the same props through many layers of intermediate
              components that don't actually use the props themselves.
            </Text>
          </List.Item>
          <List.Item>
            <Title mb="xs" order={5}>
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

      <SectionBlock initialSpaceAfterDivider="md" title="Pattern Signature">
        <Text>
          Implementing Context involves creating the context, providing a value, and consuming it.
        </Text>
        <Space h="md" />
        <CodeHighlightTabs
          code={[
            {
              code: CONTEXT_CODE,
              fileName: 'MyContext.ts',
              icon: <IconFileTypeTsx size={14} />,
              language: 'tsx',
            },
            {
              code: PROVIDER_CODE,
              fileName: 'MyProvider.tsx',
              icon: <IconFileTypeTsx size={14} />,
              language: 'tsx',
            },
            {
              code: CONSUMER_CODE,
              fileName: 'MyComponent.tsx (Consuming)',
              icon: <IconFileTypeTsx size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          radius="md"
          withExpandButton={true}
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="md" title="Key Caveats & Best Practices">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Performance:
            </Title>
            <Text>
              Context uses reference identity to determine when to re-render. If the value passed to
              the Provider changes (even if it's a new object/array with the same content), all
              consuming components will re-render. To optimize, you can:
              <List listStyleType="disc" mt="xs" withPadding>
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
            <Title c="orange" mb="xs" mt="sm" order={5}>
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
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Provider Placement:
            </Title>
            <Text>
              Place Providers as deep as possible in the component tree, encompassing only the
              components that need access to that specific context. Avoid wrapping your entire
              application in a single, massive provider if only a small part needs the data.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Readability and Alternatives:
            </Title>
            <Text>
              While Context is powerful, for very complex state management scenarios, dedicated
              libraries like Redux, Zustand, or Recoil might offer more robust solutions with better
              tooling and performance optimizations out-of-the-box.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
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
          color="red"
          icon={<IconAlertTriangle size="1rem" />}
          mt="lg"
          radius="md"
          title="Common Pitfall: Object Identity in Provider Value"
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

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: User Preferences Context">
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
          code={[
            {
              code: EXAMPLE_CODE,
              fileName: 'Example.tsx',
              icon: <IconFileTypeTsx size={14} />,
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
