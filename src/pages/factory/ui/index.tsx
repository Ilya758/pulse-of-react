import { FC, useEffect } from 'react';
import { Title, Text, List, Space, Code } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import {
  FACTORY_SIGNATURE_CODE,
  INPUT_FACTORY_FUNCTION_CODE,
  INPUT_FACTORY_EXAMPLE_COMPONENT_CODE,
  INPUT_FACTORY_TYPES_CODE,
} from '../model';
import { Example } from './example';

export const FactoryPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Factory Pattern
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          The Factory pattern is a creational design pattern that provides a way to create objects
          without specifying the exact class of object that will be created. In React, this often
          means creating components or hooks that generate other components or logic based on
          configuration or input, enabling flexible and reusable code.
        </Text>
      </SectionBlock>

      <SectionBlock title="When to Use This Pattern" initialSpaceAfterDivider="xs">
        <Text mb="md">
          The Factory pattern is especially useful when you need to create components or logic
          dynamically based on configuration or runtime data. Consider using it in these scenarios:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Form builders:
            </Text>{' '}
            Generate fields from a schema or config array, allowing dynamic forms.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              UI libraries:
            </Text>{' '}
            Expose pre-configured components (e.g., Button variants, themed components) for
            consistent design.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Dynamic dashboards/widgets:
            </Text>{' '}
            Build UIs where the structure is not known at compile time.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Plugin systems:
            </Text>{' '}
            Register and render new features/components at runtime.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Theming/design systems:
            </Text>{' '}
            Generate components with different styles or behaviors based on theme or config.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Encapsulating creation logic:
            </Text>{' '}
            Centralize and reuse component creation logic for consistency.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Abstraction:
            </Text>{' '}
            Hide implementation details so consumers don’t need to know the specifics of the created
            component.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="When NOT to Use This Pattern" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Simple static components:
            </Text>{' '}
            If your components do not require dynamic creation or configuration, factories add
            unnecessary complexity.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Over-abstraction:
            </Text>{' '}
            Avoid using factories when direct component usage is clearer and more maintainable.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Pattern Signature" initialSpaceAfterDivider="xs">
        <Text>
          The Factory pattern in React is typically implemented as a function or hook that returns a
          component or logic, often parameterized by configuration or props.
        </Text>
        <CodeHighlightTabs
          mt="md"
          withExpandButton
          defaultExpanded={false}
          radius="md"
          code={[
            {
              fileName: 'factory.tsx',
              language: 'tsx',
              code: FACTORY_SIGNATURE_CODE,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Key Caveats & Best Practices" initialSpaceAfterDivider="xs">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              TypeScript: Use Generics
            </Title>
            <Text>
              Make your factory functions generic to support different prop types and ensure type
              safety.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              TypeScript: Discriminated Unions
            </Title>
            <Text>
              Use discriminated unions for config objects to enable exhaustive type checking and
              better autocompletion.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              TypeScript: Infer Props
            </Title>
            <Text>
              Use <Code>React.ComponentProps</Code> to infer prop types for components created by
              the factory.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Performance: Memoize Factories
            </Title>
            <Text>
              Use <Code>useMemo</Code> or <Code>useCallback</Code> to avoid recreating
              factory-generated components on every render.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Performance: Avoid Inline Factories in JSX
            </Title>
            <Text>
              Define factories outside of render functions to prevent unnecessary re-renders.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Performance: Component Identity
            </Title>
            <Text>
              Be aware that factories may create new component instances, which can affect React’s
              reconciliation and memoization.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Encapsulate configuration
            </Title>
            <Text>
              Keep the factory API simple and focused on configuration, not implementation details.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Document usage
            </Title>
            <Text>Provide clear documentation and examples for consumers of your factory.</Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Comparison with Other Patterns" initialSpaceAfterDivider="xs">
        <Text mb="md">
          The Factory pattern is one of several ways to achieve component reuse and dynamic creation
          in React. Here’s how it compares:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Compound Components:
            </Text>{' '}
            Best for tightly-coupled sets of components that share state via context. Factory is
            more flexible for generating unrelated or highly dynamic components.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Higher-Order Components (HOCs):
            </Text>{' '}
            HOCs wrap and enhance existing components, while factories create new ones from scratch
            or config.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Render Props:
            </Text>{' '}
            Render props expose logic to children, but factories encapsulate both logic and
            structure, returning a ready-to-use component.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Custom Hooks:
            </Text>{' '}
            Hooks encapsulate logic, but factories can encapsulate both logic and UI, and can return
            entire components.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Pattern Variations" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Abstract Factory:
            </Text>{' '}
            A factory that creates families of related components (e.g., a theme factory that
            returns Button, Input, and Card components with the same style).
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Factory with Dependency Injection:
            </Text>{' '}
            Pass dependencies (e.g., services, context) into the factory to create more powerful,
            testable components.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="FAQ" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Can factories return hooks?
            </Text>{' '}
            Not directly—hooks must be called inside components. But factories can return components
            that use hooks internally.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Can I use factories with context?
            </Text>{' '}
            Yes! Factories can create components that consume or provide context.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              How do I test factory-generated components?
            </Text>{' '}
            Test them like any other component—render them with different configs and assert on the
            output.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Example: Dynamic Input Factory" initialSpaceAfterDivider="xs">
        <Text mb="md">
          This example shows how to use the Factory pattern to create a dynamic form input
          component.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'input-factory.tsx',
              language: 'tsx',
              code: INPUT_FACTORY_FUNCTION_CODE,
            },
            {
              fileName: 'types.ts',
              language: 'ts',
              code: INPUT_FACTORY_TYPES_CODE,
            },
            {
              fileName: 'example.tsx',
              language: 'tsx',
              code: INPUT_FACTORY_EXAMPLE_COMPONENT_CODE,
            },
          ]}
        />
        <Example />
      </SectionBlock>
    </>
  );
};

