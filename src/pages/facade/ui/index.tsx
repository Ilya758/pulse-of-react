import { FC, useEffect } from 'react';
import { Title, Text, Space, List } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { Example } from './example';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { FACADE_SIGNATURE_CODE } from '../model';

export const FacadePage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Facade Pattern
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          In React, the Facade pattern is about providing a simple, unified interface to a set of
          complex logic, APIs, or third-party libraries. A Facade in React is often a custom hook,
          utility, or component that hides implementation details and exposes a clean, app-specific
          API.
        </Text>
      </SectionBlock>

      <SectionBlock title="When to Use This Pattern" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Abstracting third-party libraries:
            </Text>{' '}
            Use a Facade to wrap libraries like Mantine, date-fns, or analytics, so your app code
            doesn’t depend on their APIs directly.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Centralizing complex logic:
            </Text>{' '}
            Move API calls, theming, or other intricate logic into a Facade to keep components
            simple.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Decoupling from external APIs:
            </Text>{' '}
            Hide implementation details and dependencies behind a Facade, making future migrations
            or refactors easier.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Providing a stable, testable API:
            </Text>{' '}
            Expose a clean, app-specific API for your business logic, making it easier to test and
            maintain.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Pattern Signature" initialSpaceAfterDivider="xs">
        <Text mb="md">
          The minimal Facade in React is a function, hook, or component that wraps complexity:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              fileName: 'ThemeControllerFacade.tsx',
              language: 'tsx',
              code: FACADE_SIGNATURE_CODE,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Key Caveats & Best Practices" initialSpaceAfterDivider="xs">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Decouple from External APIs
            </Title>
            <Text>
              Facades help decouple your app from third-party libraries and APIs, making it easier
              to swap or upgrade dependencies.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Centralize Logic
            </Title>
            <Text>
              Centralize complex logic and error handling in the Facade to keep your components
              clean and focused.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Keep Facades Focused
            </Title>
            <Text>
              Avoid creating "god objects"—a Facade should only expose what your app needs, not
              everything from the underlying library.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Document the API
            </Title>
            <Text>
              Clearly document the Facade’s API for your team to ensure consistent usage and easier
              onboarding.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Stable Interface
            </Title>
            <Text>
              Keep the Facade’s interface stable for consumers, even if the underlying
              implementation changes.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Handle Errors Internally
            </Title>
            <Text>
              Handle errors and edge cases inside the Facade so consumers don’t have to deal with
              low-level details.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Comparison with Other Patterns" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <b>Facade vs Adapter:</b> Facade simplifies and unifies, Adapter reshapes one API to
            another.
          </List.Item>
          <List.Item>
            <b>Facade vs HOC:</b> HOC enhances components, Facade abstracts logic or APIs.
          </List.Item>
          <List.Item>
            <b>Facade vs Context:</b> Context shares state, Facade hides complexity and provides a
            stable API.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="FAQ" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <b>Can a Facade be a hook?</b> Yes, in React, a custom hook is a common form of Facade.
          </List.Item>
          <List.Item>
            <b>Should I use a Facade for every library?</b> Only when it adds value—don’t
            over-abstract.
          </List.Item>
          <List.Item>
            <b>How do I test code that uses a Facade?</b> Mock the Facade in your tests, not the
            underlying library.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Example: Theme Controller Facade" initialSpaceAfterDivider="xs">
        <Example />
      </SectionBlock>
    </>
  );
};

