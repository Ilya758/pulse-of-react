import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Alert, Code, List, Space, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import {
  INP_EVENT_LISTENER_CODE,
  INP_MEASUREMENT_CODE,
  INP_OPTIMIZATION_CODE,
  INP_SIGNATURE_CODE,
  INP_WEB_WORKERS_CODE,
} from '../model';
import { INPMeasurementExample } from './example';

export const InteractionToNextPaintPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Interaction to Next Paint (INP)
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          Interaction to Next Paint (INP) is a Core Web Vital that measures the latency of all user
          interactions throughout the page lifecycle, reporting the worst interaction. It captures
          the time from when a user first interacts with your page (clicks, taps, or key presses) to
          when the browser is able to present the visual feedback from that interaction. INP is
          crucial for perceived responsiveness and user experience.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Why INP Matters">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              User Experience:
            </Text>{' '}
            INP directly measures how responsive your site feels to users. Fast interactions create
            a smooth, professional experience.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Engagement:
            </Text>{' '}
            Users are more likely to engage with sites that respond quickly to their actions. Slow
            interactions frustrate users and increase bounce rates.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Business Impact:
            </Text>{' '}
            Better interaction responsiveness correlates with higher conversion rates and user
            satisfaction.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              SEO Ranking:
            </Text>{' '}
            INP is a Google ranking factor as part of the Core Web Vitals, affecting search
            rankings.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="INP Thresholds & Targets">
        <List mb="md" spacing="xs">
          <List.Item>
            <Text c="green" fw={700} span>
              Good: ≤ 200 milliseconds
            </Text>
          </List.Item>
          <List.Item>
            <Text c="yellow" fw={700} span>
              Needs Improvement: 200 - 500 milliseconds
            </Text>
          </List.Item>
          <List.Item>
            <Text c="red" fw={700} span>
              Poor: {'>'} 500 milliseconds
            </Text>
          </List.Item>
        </List>
        <Text>
          The goal is to keep INP under 200ms for 75% of your users (75th percentile). INP measures
          all interactions during the entire page session, not just the first interaction.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="What Counts as an Interaction?">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Clicks:
            </Text>{' '}
            Mouse clicks on interactive elements
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Taps:
            </Text>{' '}
            Touch interactions on mobile devices
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Key Presses:
            </Text>{' '}
            Keyboard interactions with form inputs and other interactive elements
          </List.Item>
        </List>
        <Alert color="orange" icon={<IconAlertTriangle size="1rem" />} mt="md">
          <Text>
            <Text fw={700} span>
              What doesn't count:
            </Text>{' '}
            Scrolling, hovering, or mouse movements without clicks. These are considered continuous
            interactions and are measured differently.
          </Text>
        </Alert>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Understanding INP Components">
        <Text mb="md">Each interaction latency consists of three main phases:</Text>
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title mb="xs" order={5}>
              Input Delay
            </Title>
            <Text>
              Time from user interaction to when the main thread starts processing the event
              handler. This is often caused by long-running JavaScript tasks blocking the main
              thread.
            </Text>
          </List.Item>
          <List.Item>
            <Title mb="xs" order={5}>
              Processing Time
            </Title>
            <Text>
              Time spent executing the event handler code. This includes JavaScript execution,
              layout calculations, style recalculation, and rendering.
            </Text>
          </List.Item>
          <List.Item>
            <Title mb="xs" order={5}>
              Presentation Delay
            </Title>
            <Text>
              Time from when event handler finishes to when the browser paints the next frame. This
              can be affected by other work queued on the main thread.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Measuring INP">
        <Text mb="md">
          You can measure INP using the Performance Observer API or through browser developer tools:
        </Text>
        <List mb="md" spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Chrome DevTools:
            </Text>{' '}
            Lighthouse panel, Performance tab, or Web Vitals extension
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              PerformanceObserver API:
            </Text>{' '}
            Programmatic measurement in your application
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              web-vitals library:
            </Text>{' '}
            Easy-to-use library for measuring all Core Web Vitals
          </List.Item>
        </List>
        <CodeHighlightTabs
          code={[
            {
              code: INP_SIGNATURE_CODE,
              fileName: 'inp-measurement.ts',
              icon: <IconFileTypeTsx size={14} />,
              language: 'typescript',
            },
          ]}
          defaultExpanded={false}
          mt="md"
          radius="md"
          withExpandButton={false}
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Common INP Optimizations">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Reduce Main Thread Work
            </Title>
            <Text>
              Break up long-running JavaScript tasks using <Code>setTimeout(..., 0)</Code>,{' '}
              <Code>requestIdleCallback</Code>, or <Code>requestAnimationFrame</Code>. Avoid
              blocking the main thread with heavy computations.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Optimize Event Handlers
            </Title>
            <Text>
              Use passive event listeners where appropriate, debounce expensive handlers, and
              minimize the work done in critical event handlers.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Use React Concurrency Features
            </Title>
            <Text>
              Leverage <Code>startTransition</Code> for non-urgent updates and{' '}
              <Code>useDeferredValue</Code> for expensive computations to keep the UI responsive.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Offload Work to Web Workers
            </Title>
            <Text>
              Move heavy computations, data processing, and complex calculations to Web Workers to
              prevent blocking the main thread.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Optimize Rendering
            </Title>
            <Text>
              Minimize layout thrashing, avoid forced synchronous layouts, and use CSS containment
              to limit the scope of browser calculations.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="INP vs Other Metrics">
        <Text mb="md">Understanding how INP relates to other performance metrics:</Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              INP vs FID (First Input Delay):
            </Text>{' '}
            FID only measures the first interaction, while INP measures all interactions and reports
            the worst one. INP provides a more complete picture of responsiveness.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              INP vs TTI (Time to Interactive):
            </Text>{' '}
            TTI measures when the page becomes fully interactive, while INP measures the actual
            responsiveness of ongoing interactions throughout the page lifecycle.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              INP vs CLS (Cumulative Layout Shift):
            </Text>{' '}
            INP measures interaction responsiveness, while CLS measures visual stability. Both are
            important for good user experience but measure different aspects.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="React-Specific INP Optimizations">
        <Text mb="md">Here are React-specific techniques to improve INP:</Text>
        <CodeHighlightTabs
          code={[
            {
              code: INP_OPTIMIZATION_CODE,
              fileName: 'react-inp-optimizations.tsx',
              icon: <IconFileTypeTsx size={14} />,
              language: 'typescript',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Optimizing Event Listeners">
        <Text mb="md">Proper event listener optimization is crucial for good INP:</Text>
        <CodeHighlightTabs
          code={[
            {
              code: INP_EVENT_LISTENER_CODE,
              fileName: 'event-listener-optimizations.ts',
              icon: <IconFileTypeTsx size={14} />,
              language: 'typescript',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Using Web Workers for Heavy Tasks">
        <Text mb="md">
          Offload computationally expensive tasks to Web Workers to keep the main thread responsive:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: INP_WEB_WORKERS_CODE,
              fileName: 'web-worker-example.ts',
              icon: <IconFileTypeTsx size={14} />,
              language: 'typescript',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Monitoring INP in Production">
        <Text mb="md">To effectively monitor INP in production:</Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Use Real User Monitoring (RUM):
            </Text>{' '}
            Collect INP data from actual users across different devices and network conditions
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Segment by Interaction Type:
            </Text>{' '}
            Analyze INP performance for different types of interactions (clicks, taps, keyboard)
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Track Worst Interactions:
            </Text>{' '}
            Focus on optimizing the interactions that contribute to high INP values
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Set Performance Budgets:
            </Text>{' '}
            Establish INP thresholds and alert when they're exceeded
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Correlate with User Behavior:
            </Text>{' '}
            Track how INP changes impact user engagement, conversion rates, and satisfaction
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: Live INP Measurement">
        <Text mb="md">
          This interactive example measures the current page's Interaction to Next Paint in
          real-time. It demonstrates how to implement INP monitoring in your application and shows
          how different types of interactions affect the metric:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: INP_MEASUREMENT_CODE,
              fileName: 'useINPMeasurement.ts',
              icon: <IconFileTypeTsx size={14} />,
              language: 'typescript',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
        <INPMeasurementExample />
      </SectionBlock>
    </>
  );
};
