import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';
import { Code, List, Space, Text, Title } from '@mantine/core';
import { IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { DATA_PROVIDER_CODE, EXAMPLE_CODE, RENDER_PROPS_CODE } from '../model/constants';
import { Example } from './example';

export const RenderPropsPage: React.FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Render Props
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          The term "render prop" refers to a technique for sharing code between React components
          using a prop whose value is a function. A component with a render prop takes a function
          that returns a React element and calls it instead of implementing its own rendering logic.
          This pattern is powerful for exposing data or behavior from a component to its parent,
          allowing the parent to control the rendering.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="md" title="When to Use Render Props">
        <List spacing="xs" type="ordered">
          <List.Item>
            <Title mb="xs" order={5}>
              Sharing Cross-Cutting Concerns:
            </Title>
            <Text>
              When you have a piece of logic or state that needs to be reused by multiple
              components, but those components need to render different UIs based on that
              logic/state. For example, a component that fetches data and lets its consumer decide
              how to display it.
            </Text>
          </List.Item>
          <List.Item>
            <Title mb="xs" order={5}>
              Exposing Data to Parent Components:
            </Title>
            <Text>
              Render props allow a child component to share data or state with its parent component
              without rigidly defining how that data should be displayed. The parent component
              provides the rendering logic.
            </Text>
          </List.Item>
          <List.Item>
            <Title mb="xs" order={5}>
              Avoiding Wrapper Hell:
            </Title>
            <Text>
              Can be an alternative to Higher-Order Components (HOCs) and can help avoid deeply
              nested component trees that sometimes result from excessive HOC usage.
            </Text>
          </List.Item>
          <List.Item>
            <Title mb="xs" order={5}>
              Better Prop Type Inference:
            </Title>
            <Text>
              TypeScript can often infer prop types more easily with render props compared to HOCs.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="md" title="Pattern Signature">
        <Text>
          A common way to implement a render prop is to have a prop (often named <Code>render</Code>{' '}
          or <Code>children</Code> if it's the only one) that is a function. This function receives
          arguments from the component and returns JSX.
        </Text>
        <Space h="md" />
        <CodeHighlight code={RENDER_PROPS_CODE} language="tsx" radius="md" />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="md" title="Key Caveats & Best Practices">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Prop Naming:
            </Title>
            <Text>
              While <Code>render</Code> is a common name for a render prop, you can name it
              anything. If the render prop is the primary way to use the component, using{' '}
              <Code>children</Code> as a function is a very idiomatic pattern in React.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Performance Considerations:
            </Title>
            <Text>
              Be mindful that if the render prop is defined inline as an arrow function in the
              parent component's render method, it will create a new function on every render. This
              can lead to unnecessary re-renders of the component that accepts the render prop if
              it's not memoized correctly (e.g., with <Code>React.memo</Code>). Consider defining
              the render function outside the render path or memoizing it with{' '}
              <Code>useCallback</Code>.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Readability:
            </Title>
            <Text>
              While powerful, overuse or overly complex render prop implementations can sometimes
              make code harder to follow. Strive for clarity.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" mt="sm" order={5}>
              Alternatives:
            </Title>
            <Text>
              Consider custom Hooks as an alternative for sharing stateful logic, especially if no
              UI rendering is directly involved in the shared logic itself. Hooks can often lead to
              simpler code.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Example: Form Manager">
        <Text mb="md">
          This example showcases a <Code>FormManager</Code> component. It encapsulates form state
          logic (values, touched fields, submission handling) and exposes it along with helper
          functions to its children via a render prop. The consuming component then has full control
          over rendering the form UI, demonstrating a powerful separation of concerns for complex
          forms.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: DATA_PROVIDER_CODE,
              fileName: 'FormManager.tsx',
              icon: <IconFileTypeTsx size={14} />,
              language: 'tsx',
            },
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
