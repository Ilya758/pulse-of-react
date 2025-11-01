import { CodeHighlightTabs } from '@mantine/code-highlight';
import { List, Space, Text, Title } from '@mantine/core';
import { IconFileTypeTs, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import {
  PATTERN_SIGNATURE_CODE,
  USER_PROFILE_CONTAINER_CODE,
  USER_PROFILE_FORM_CODE,
} from '../model';
import { Example } from './example';

export const ContainerAndPresentation: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Container and Presentation Pattern
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          The Container and Presentational pattern proposes separating components into two distinct
          types based on their concerns:
        </Text>
        <List center mt="md" spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Container Components:
            </Text>{' '}
            Are concerned with{' '}
            <Text fs="italic" span>
              how things work
            </Text>
            <Text span>
              . They manage data, state, and application logic, but they don&apos;t render HTML
              directly. Instead, they delegate the rendering to Presentational components.
            </Text>
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Presentational Components:
            </Text>{' '}
            Are concerned with{' '}
            <Text fs="italic" span>
              how things look
            </Text>
            <Text span>
              . They receive data and behavior via props and focus solely on UI. They are often
              "pure" components without their own state.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When to Use This Pattern">
        <Text>
          While the rise of Hooks has made this pattern more flexible, it's most effective in
          specific scenarios:
        </Text>
        <List mt="md" spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Complex Components:
            </Text>{' '}
            When a component has significant internal state, manages complex data, or performs
            multiple side effects, splitting it into a container and one or more presentational
            components improves clarity.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              High Reusability Needed:
            </Text>{' '}
            If you have a piece of UI that needs to be used in many different places with different
            data (e.g., a styled user avatar, a data grid), making it a pure presentational
            component is ideal.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Designer-Developer Collaboration:
            </Text>{' '}
            Presentational components are perfect for designers to work on. They can be developed
            and tested in isolation with mock data (e.g., in Storybook) without needing the full
            application logic.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Separating Business Logic from UI:
            </Text>{' '}
            In large-scale applications, keeping the business logic and data fetching separate from
            the rendering logic is crucial for long-term maintenance.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Pattern Signature">
        <Text>
          The core of the pattern can be summarized by the distinct roles and "shapes" of the two
          component types.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: PATTERN_SIGNATURE_CODE,
              fileName: 'signatures.ts',
              icon: <IconFileTypeTs size={14} />,
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
              Keep Presentational Components Pure
            </Title>
            <Text>
              The most significant benefit comes from presentational components that are{' '}
              <Text fw={700} span>
                pure functions
              </Text>{' '}
              of their props. Avoid giving them local state or side effects. This makes them
              predictable, highly reusable, and easy to test in isolation.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Use Hooks for Container Logic
            </Title>
            <Text>
              Embrace React Hooks for state management (useState, useReducer) and side effects
              (useEffect) inside your container components. This is the modern, idiomatic way to
              implement the "container" part of the pattern in functional components.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Overhead for Simple Components
            </Title>
            <Text>
              For components with minimal logic, creating two separate components can be unnecessary
              boilerplate. In such cases, it's acceptable to have a single component that handles
              both logic and presentation, as long as the separation is clear within the component
              itself.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Prop Drilling
            </Title>
            <Text>
              Deeply nested presentational components can lead to prop drilling, where props have to
              be passed down through many intermediate components. This can be a sign that a
              component is doing too much, or that you might need a state management solution like
              Context API.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Modern Context & Hooks">
        <Text>
          With the introduction of React Hooks, the strict separation of this pattern has become
          less rigid. Hooks like useState, useEffect, and custom hooks allow functional components
          to manage their own state and side effects.
        </Text>
        <Text mt="sm">
          While you might not create separate "Container" and "Presentational" files as often, the
          core principle remains highly relevant . It's still a{' '}
          <Text fw={700} span>
            best practice
          </Text>{' '}
          to distinguish between data/logic handling and rendering within your components. A single
          component might fetch data using a hook and then map that data to smaller, "dumber" UI
          components that just render it.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: User Profile Editor">
        <Text mb="md">
          This example demonstrates a form with user interaction. The container,{' '}
          <code>UserProfileContainer</code>, handles all the logic: fetching initial data, managing
          state changes from user input, and handling the asynchronous save operation with
          notifications.
        </Text>
        <Text mb="md">
          The presentational component, <code>UserProfileForm</code>, is completely controlled by
          its props. It is a{' '}
          <Text fw={700} span>
            dumb
          </Text>{' '}
          component that doesn't know where the data comes from or what happens when the save button
          is clicked; it only knows how to render the form and when to call the functions it was
          given. This makes it highly reusable and easy to test.
        </Text>

        <CodeHighlightTabs
          code={[
            {
              code: USER_PROFILE_CONTAINER_CODE,
              fileName: 'UserProfileContainer.tsx',
              icon: <IconFileTypeTs size={14} />,
              language: 'tsx',
            },
            {
              code: USER_PROFILE_FORM_CODE,
              fileName: 'UserProfileForm.tsx',
              icon: <IconFileTypeTs size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <Example />
    </>
  );
};
