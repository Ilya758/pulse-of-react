import { CodeHighlightTabs } from '@mantine/code-highlight';
import { List, Space, Text, Title } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { FACADE_SIGNATURE_CODE } from '../model';
import { Example } from './example';

export const FacadePage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Facade Pattern
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          In React, the Facade pattern is about providing a simple, unified interface to a set of
          complex logic, APIs, or third-party libraries. A Facade in React is often a custom hook,
          utility, or component that hides implementation details and exposes a clean, app-specific
          API.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When to Use This Pattern">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Abstracting third-party libraries:
            </Text>{' '}
            Use a Facade to wrap libraries like Mantine, date-fns, or analytics, so your app code
            doesn’t depend on their APIs directly.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Centralizing complex logic:
            </Text>{' '}
            Move API calls, theming, or other intricate logic into a Facade to keep components
            simple.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Decoupling from external APIs:
            </Text>{' '}
            Hide implementation details and dependencies behind a Facade, making future migrations
            or refactors easier.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Providing a stable, testable API:
            </Text>{' '}
            Expose a clean, app-specific API for your business logic, making it easier to test and
            maintain.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Pattern Signature">
        <Text mb="md">
          The minimal Facade in React is a function, hook, or component that wraps complexity:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: FACADE_SIGNATURE_CODE,
              fileName: 'ThemeControllerFacade.tsx',
              language: 'tsx',
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Key Caveats & Best Practices">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Decouple from External APIs
            </Title>
            <Text>
              Facades help decouple your app from third-party libraries and APIs, making it easier
              to swap or upgrade dependencies.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Centralize Logic
            </Title>
            <Text>
              Centralize complex logic and error handling in the Facade to keep your components
              clean and focused.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Keep Facades Focused
            </Title>
            <Text>
              Avoid creating "god objects"—a Facade should only expose what your app needs, not
              everything from the underlying library.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Document the API
            </Title>
            <Text>
              Clearly document the Facade’s API for your team to ensure consistent usage and easier
              onboarding.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Stable Interface
            </Title>
            <Text>
              Keep the Facade’s interface stable for consumers, even if the underlying
              implementation changes.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Handle Errors Internally
            </Title>
            <Text>
              Handle errors and edge cases inside the Facade so consumers don’t have to deal with
              low-level details.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Comparison with Other Patterns">
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

      <SectionBlock initialSpaceAfterDivider="xs" title="FAQ">
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

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: Theme Controller Facade">
        <Example />
      </SectionBlock>
    </>
  );
};
