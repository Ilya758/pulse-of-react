import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Code, List, Space, Text, Title } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import {
  FACTORY_SIGNATURE_CODE,
  INPUT_FACTORY_EXAMPLE_COMPONENT_CODE,
  INPUT_FACTORY_FUNCTION_CODE,
  INPUT_FACTORY_TYPES_CODE,
} from '../model';
import { Example } from './example';

export const FactoryPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Factory Pattern
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          The Factory pattern is a creational design pattern that provides a way to create objects
          without specifying the exact class of object that will be created. In React, this often
          means creating components or hooks that generate other components or logic based on
          configuration or input, enabling flexible and reusable code.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When to Use This Pattern">
        <Text mb="md">
          The Factory pattern is especially useful when you need to create components or logic
          dynamically based on configuration or runtime data. Consider using it in these scenarios:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Form builders:
            </Text>{' '}
            Generate fields from a schema or config array, allowing dynamic forms.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              UI libraries:
            </Text>{' '}
            Expose pre-configured components (e.g., Button variants, themed components) for
            consistent design.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Dynamic dashboards/widgets:
            </Text>{' '}
            Build UIs where the structure is not known at compile time.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Plugin systems:
            </Text>{' '}
            Register and render new features/components at runtime.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Theming/design systems:
            </Text>{' '}
            Generate components with different styles or behaviors based on theme or config.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Encapsulating creation logic:
            </Text>{' '}
            Centralize and reuse component creation logic for consistency.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Abstraction:
            </Text>{' '}
            Hide implementation details so consumers don’t need to know the specifics of the created
            component.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When NOT to Use This Pattern">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Simple static components:
            </Text>{' '}
            If your components do not require dynamic creation or configuration, factories add
            unnecessary complexity.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Over-abstraction:
            </Text>{' '}
            Avoid using factories when direct component usage is clearer and more maintainable.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Pattern Signature">
        <Text>
          The Factory pattern in React is typically implemented as a function or hook that returns a
          component or logic, often parameterized by configuration or props.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: FACTORY_SIGNATURE_CODE,
              fileName: 'factory.tsx',
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
              TypeScript: Use Generics
            </Title>
            <Text>
              Make your factory functions generic to support different prop types and ensure type
              safety.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              TypeScript: Discriminated Unions
            </Title>
            <Text>
              Use discriminated unions for config objects to enable exhaustive type checking and
              better autocompletion.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              TypeScript: Infer Props
            </Title>
            <Text>
              Use <Code>React.ComponentProps</Code> to infer prop types for components created by
              the factory.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Performance: Memoize Factories
            </Title>
            <Text>
              Use <Code>useMemo</Code> or <Code>useCallback</Code> to avoid recreating
              factory-generated components on every render.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Performance: Avoid Inline Factories in JSX
            </Title>
            <Text>
              Define factories outside of render functions to prevent unnecessary re-renders.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Performance: Component Identity
            </Title>
            <Text>
              Be aware that factories may create new component instances, which can affect React’s
              reconciliation and memoization.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Encapsulate configuration
            </Title>
            <Text>
              Keep the factory API simple and focused on configuration, not implementation details.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Document usage
            </Title>
            <Text>Provide clear documentation and examples for consumers of your factory.</Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Comparison with Other Patterns">
        <Text mb="md">
          The Factory pattern is one of several ways to achieve component reuse and dynamic creation
          in React. Here’s how it compares:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Compound Components:
            </Text>{' '}
            Best for tightly-coupled sets of components that share state via context. Factory is
            more flexible for generating unrelated or highly dynamic components.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Higher-Order Components (HOCs):
            </Text>{' '}
            HOCs wrap and enhance existing components, while factories create new ones from scratch
            or config.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Render Props:
            </Text>{' '}
            Render props expose logic to children, but factories encapsulate both logic and
            structure, returning a ready-to-use component.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Custom Hooks:
            </Text>{' '}
            Hooks encapsulate logic, but factories can encapsulate both logic and UI, and can return
            entire components.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Pattern Variations">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Abstract Factory:
            </Text>{' '}
            A factory that creates families of related components (e.g., a theme factory that
            returns Button, Input, and Card components with the same style).
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Factory with Dependency Injection:
            </Text>{' '}
            Pass dependencies (e.g., services, context) into the factory to create more powerful,
            testable components.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="FAQ">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Can factories return hooks?
            </Text>{' '}
            Not directly—hooks must be called inside components. But factories can return components
            that use hooks internally.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Can I use factories with context?
            </Text>{' '}
            Yes! Factories can create components that consume or provide context.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              How do I test factory-generated components?
            </Text>{' '}
            Test them like any other component—render them with different configs and assert on the
            output.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: Dynamic Input Factory">
        <Text mb="md">
          This example shows how to use the Factory pattern to create a dynamic form input
          component.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: INPUT_FACTORY_FUNCTION_CODE,
              fileName: 'input-factory.tsx',
              language: 'tsx',
            },
            {
              code: INPUT_FACTORY_TYPES_CODE,
              fileName: 'types.ts',
              language: 'ts',
            },
            {
              code: INPUT_FACTORY_EXAMPLE_COMPONENT_CODE,
              fileName: 'example.tsx',
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
        <Example />
      </SectionBlock>
    </>
  );
};
