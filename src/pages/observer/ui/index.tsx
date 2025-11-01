import { CodeHighlightTabs } from '@mantine/code-highlight';
import { List, Space, Text, Title } from '@mantine/core';
import { IconFileTypeTs, IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import {
  EXAMPLE_COMPONENT_CODE,
  EXAMPLE_USAGE_CODE,
  NEWS_PUBLISHER_CODE,
  NEWS_SUBSCRIBER_CODE,
  NOTIFICATION_SUBSCRIBER_CODE,
  OBSERVER_PATTERN_SIGNATURE,
} from '../model';
import { Example } from './example';

export const ObserverPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Observer Pattern
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          The Observer pattern is a behavioral design pattern that defines a one-to-many dependency
          between objects so that when one object (the publisher) changes state, all its dependents
          (subscribers) are notified and updated automatically. In React, this pattern is commonly
          used for event handling, state management, and building reactive systems.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When to Use This Pattern">
        <Text mb="md">
          The Observer pattern excels in scenarios where you need to build reactive, event-driven
          systems with loose coupling between components:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Event-driven architectures:
            </Text>{' '}
            Building systems that need to respond to state changes or events across multiple
            components without tight coupling.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Real-time features:
            </Text>{' '}
            Chat applications, live dashboards, collaborative tools, and any system requiring
            real-time data synchronization.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Notification systems:
            </Text>{' '}
            User notifications, alerts, status updates, and any scenario where multiple components
            need to be notified of changes.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              State synchronization:
            </Text>{' '}
            Keeping multiple components in sync with shared data without prop drilling or complex
            state management.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Custom event systems:
            </Text>{' '}
            Building application-specific event systems for component communication and
            coordination.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Decoupled communication:
            </Text>{' '}
            When you want to avoid direct dependencies between components while still enabling
            communication.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="When NOT to Use This Pattern">
        <Text mb="md">
          Understanding when to avoid the Observer pattern helps you choose the right solution for
          your specific use case:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Simple state management:
            </Text>{' '}
            For basic state that can be handled with useState, useReducer, or Context API in a
            single component or small component tree.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              One-time data flow:
            </Text>{' '}
            When you only need to pass data down the component tree once, prop drilling or Context
            is more appropriate.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Performance-critical scenarios:
            </Text>{' '}
            When frequent notifications would cause performance issues - consider batching or
            debouncing updates.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Simple parent-child communication:
            </Text>{' '}
            For direct parent-to-child or child-to-parent communication, props and callbacks are
            simpler and more explicit.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Global state management:
            </Text>{' '}
            For application-wide state, consider Redux, Zustand, or React Context instead of
            multiple observers.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Pattern Signature">
        <Text>
          Here's the core structure of the Observer pattern. This TypeScript interface defines the
          contract that publishers and subscribers must follow:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: OBSERVER_PATTERN_SIGNATURE,
              fileName: 'observer-pattern.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'ts',
            },
          ]}
          defaultExpanded={false}
          mt="md"
          radius="md"
          withExpandButton
        />
        <Text mb="md" mt="lg">
          The pattern is built around four core elements:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Publisher (Observable):
            </Text>{' '}
            The central object that manages state and maintains a collection of subscribers. It
            provides a clean API for subscription management and state change notifications.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Subscriber:
            </Text>{' '}
            Objects that register with the publisher and implement a standardized update method.
            They automatically receive notifications whenever the publisher's state changes.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Concrete Publisher:
            </Text>{' '}
            A real-world implementation of the publisher interface that encapsulates specific
            business logic and triggers notifications based on state changes.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Concrete Subscriber:
            </Text>{' '}
            Specific subscriber implementations that define custom behavior for handling state
            change notifications from their associated publisher.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Key Caveats & Best Practices">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Memory Management:
            </Title>
            <Text>
              Always unsubscribe subscribers when they're no longer needed to prevent memory leaks.
              This is especially important in React components that may unmount.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Error Handling:
            </Title>
            <Text>
              Implement proper error handling in subscriber update methods to prevent one failing
              subscriber from breaking the entire notification system.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Performance Optimization:
            </Title>
            <Text>
              Be mindful of the number of subscribers and notification frequency. Consider batching
              updates or using debouncing for high-frequency events.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Type Safety:
            </Title>
            <Text>
              Use TypeScript to ensure type safety between publishers and subscribers, especially
              when passing data through the notification system.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Subscriber Order:
            </Title>
            <Text>
              Don't rely on the order in which subscribers are notified, as this can change and
              create unpredictable behavior.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Avoid Circular Dependencies:
            </Title>
            <Text>
              Be careful when subscribers can also act as publishers, as this can create circular
              dependencies and infinite notification loops.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Cleanup on Unmount:
            </Title>
            <Text>
              Always implement cleanup in React useEffect return functions to unsubscribe
              subscribers when components unmount.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Comparison with Other Patterns">
        <List spacing="xs">
          <List.Item>
            <b>Observer vs Pub/Sub:</b> Observer is more direct (publisher knows about subscribers),
            while Pub/Sub uses an intermediary (publishers and subscribers don't know about each
            other - sort of EventEmitter).
          </List.Item>
          <List.Item>
            <b>Observer vs Context:</b> Context provides global state sharing, while Observer
            enables dynamic subscription to specific events or state changes.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: News Notification System">
        <Text mb="md">
          This comprehensive example demonstrates a news notification system using the Observer
          pattern. Users can subscribe to different news categories and receive notifications when
          relevant news is published. The system includes a publisher (NewsPublisher), multiple
          types of subscribers (NewsSubscriber and NotificationSubscriber), and a complete UI for
          testing the pattern.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: NEWS_PUBLISHER_CODE,
              fileName: 'news-publisher.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'ts',
            },
            {
              code: NEWS_SUBSCRIBER_CODE,
              fileName: 'news-subscriber.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'ts',
            },
            {
              code: NOTIFICATION_SUBSCRIBER_CODE,
              fileName: 'notification-subscriber.ts',
              icon: <IconFileTypeTs color="#2596be" size={14} />,
              language: 'ts',
            },
            {
              code: EXAMPLE_USAGE_CODE,
              fileName: 'use-news-system.ts',
              icon: <IconFileTypeTsx color="#2596be" size={14} />,
              language: 'tsx',
            },
            {
              code: EXAMPLE_COMPONENT_CODE,
              fileName: 'example.tsx',
              icon: <IconFileTypeTsx color="#2596be" size={14} />,
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
