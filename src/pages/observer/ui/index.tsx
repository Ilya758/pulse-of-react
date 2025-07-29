import { FC, useEffect } from 'react';
import { Title, Text, List, Space } from '@mantine/core';
import { IconFileTypeTs, IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import {
  OBSERVER_PATTERN_SIGNATURE,
  NEWS_PUBLISHER_CODE,
  NEWS_SUBSCRIBER_CODE,
  NOTIFICATION_SUBSCRIBER_CODE,
  EXAMPLE_USAGE_CODE,
  EXAMPLE_COMPONENT_CODE,
} from '../model';
import { Example } from './example';

export const ObserverPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Observer Pattern
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          The Observer pattern is a behavioral design pattern that defines a one-to-many dependency
          between objects so that when one object (the publisher) changes state, all its dependents
          (subscribers) are notified and updated automatically. In React, this pattern is commonly
          used for event handling, state management, and building reactive systems.
        </Text>
      </SectionBlock>

      <SectionBlock title="When to Use This Pattern" initialSpaceAfterDivider="xs">
        <Text mb="md">
          The Observer pattern excels in scenarios where you need to build reactive, event-driven
          systems with loose coupling between components:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Event-driven architectures:
            </Text>{' '}
            Building systems that need to respond to state changes or events across multiple
            components without tight coupling.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Real-time features:
            </Text>{' '}
            Chat applications, live dashboards, collaborative tools, and any system requiring
            real-time data synchronization.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Notification systems:
            </Text>{' '}
            User notifications, alerts, status updates, and any scenario where multiple components
            need to be notified of changes.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              State synchronization:
            </Text>{' '}
            Keeping multiple components in sync with shared data without prop drilling or complex
            state management.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Custom event systems:
            </Text>{' '}
            Building application-specific event systems for component communication and
            coordination.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Decoupled communication:
            </Text>{' '}
            When you want to avoid direct dependencies between components while still enabling
            communication.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="When NOT to Use This Pattern" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Understanding when to avoid the Observer pattern helps you choose the right solution for
          your specific use case:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Simple state management:
            </Text>{' '}
            For basic state that can be handled with useState, useReducer, or Context API in a
            single component or small component tree.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              One-time data flow:
            </Text>{' '}
            When you only need to pass data down the component tree once, prop drilling or Context
            is more appropriate.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Performance-critical scenarios:
            </Text>{' '}
            When frequent notifications would cause performance issues - consider batching or
            debouncing updates.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Simple parent-child communication:
            </Text>{' '}
            For direct parent-to-child or child-to-parent communication, props and callbacks are
            simpler and more explicit.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Global state management:
            </Text>{' '}
            For application-wide state, consider Redux, Zustand, or React Context instead of
            multiple observers.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Pattern Signature" initialSpaceAfterDivider="xs">
        <Text>
          Here's the core structure of the Observer pattern. This TypeScript interface defines the
          contract that publishers and subscribers must follow:
        </Text>
        <CodeHighlightTabs
          mt="md"
          withExpandButton
          defaultExpanded={false}
          radius="md"
          code={[
            {
              fileName: 'observer-pattern.ts',
              language: 'ts',
              code: OBSERVER_PATTERN_SIGNATURE,
              icon: <IconFileTypeTs size={14} color="#2596be" />,
            },
          ]}
        />
        <Text mt="lg" mb="md">
          The pattern is built around four core elements:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Publisher (Observable):
            </Text>{' '}
            The central object that manages state and maintains a collection of subscribers. It
            provides a clean API for subscription management and state change notifications.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Subscriber:
            </Text>{' '}
            Objects that register with the publisher and implement a standardized update method.
            They automatically receive notifications whenever the publisher's state changes.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Concrete Publisher:
            </Text>{' '}
            A real-world implementation of the publisher interface that encapsulates specific
            business logic and triggers notifications based on state changes.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Concrete Subscriber:
            </Text>{' '}
            Specific subscriber implementations that define custom behavior for handling state
            change notifications from their associated publisher.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Key Caveats & Best Practices" initialSpaceAfterDivider="xs">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Memory Management:
            </Title>
            <Text>
              Always unsubscribe subscribers when they're no longer needed to prevent memory leaks.
              This is especially important in React components that may unmount.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Error Handling:
            </Title>
            <Text>
              Implement proper error handling in subscriber update methods to prevent one failing
              subscriber from breaking the entire notification system.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Performance Optimization:
            </Title>
            <Text>
              Be mindful of the number of subscribers and notification frequency. Consider batching
              updates or using debouncing for high-frequency events.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Type Safety:
            </Title>
            <Text>
              Use TypeScript to ensure type safety between publishers and subscribers, especially
              when passing data through the notification system.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Subscriber Order:
            </Title>
            <Text>
              Don't rely on the order in which subscribers are notified, as this can change and
              create unpredictable behavior.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Avoid Circular Dependencies:
            </Title>
            <Text>
              Be careful when subscribers can also act as publishers, as this can create circular
              dependencies and infinite notification loops.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Cleanup on Unmount:
            </Title>
            <Text>
              Always implement cleanup in React useEffect return functions to unsubscribe
              subscribers when components unmount.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Comparison with Other Patterns" initialSpaceAfterDivider="xs">
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

      <SectionBlock title="Example: News Notification System" initialSpaceAfterDivider="xs">
        <Text mb="md">
          This comprehensive example demonstrates a news notification system using the Observer
          pattern. Users can subscribe to different news categories and receive notifications when
          relevant news is published. The system includes a publisher (NewsPublisher), multiple
          types of subscribers (NewsSubscriber and NotificationSubscriber), and a complete UI for
          testing the pattern.
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'news-publisher.ts',
              language: 'ts',
              code: NEWS_PUBLISHER_CODE,
              icon: <IconFileTypeTs size={14} color="#2596be" />,
            },
            {
              fileName: 'news-subscriber.ts',
              language: 'ts',
              code: NEWS_SUBSCRIBER_CODE,
              icon: <IconFileTypeTs size={14} color="#2596be" />,
            },
            {
              fileName: 'notification-subscriber.ts',
              language: 'ts',
              code: NOTIFICATION_SUBSCRIBER_CODE,
              icon: <IconFileTypeTs size={14} color="#2596be" />,
            },
            {
              fileName: 'use-news-system.ts',
              language: 'tsx',
              code: EXAMPLE_USAGE_CODE,
              icon: <IconFileTypeTsx size={14} color="#2596be" />,
            },
            {
              fileName: 'example.tsx',
              language: 'tsx',
              code: EXAMPLE_COMPONENT_CODE,
              icon: <IconFileTypeTsx size={14} color="#2596be" />,
            },
          ]}
        />
        <Example />
      </SectionBlock>
    </>
  );
};

