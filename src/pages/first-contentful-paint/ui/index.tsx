import { FC, useEffect } from 'react';
import { Title, Text, List, Space, Code, Alert } from '@mantine/core';
import { IconInfoCircle, IconFileTypeTsx, IconAlertTriangle } from '@tabler/icons-react';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';

import { FCPMeasurementExample } from './example';
import { FCP_SIGNATURE_CODE, FCP_OPTIMIZATION_CODE, FCP_MEASUREMENT_CODE } from '../model';

export const FirstContentfulPaintPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        First Contentful Paint (FCP)
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          First Contentful Paint (FCP) is a Core Web Vital that measures the time from when the page
          starts loading to when any part of the page's content is rendered on the screen. Content
          includes text, images (including background images), SVG elements, or non-white{' '}
          <Code>{'<canvas>'}</Code> elements. This metric is crucial for user experience as it
          indicates when users can actually see content on the page.
        </Text>
      </SectionBlock>

      <SectionBlock title="Why FCP Matters" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              User Perception:
            </Text>{' '}
            FCP directly impacts how fast users perceive your site to be. A fast FCP creates the
            impression of a responsive, fast-loading site.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Engagement:
            </Text>{' '}
            Users are more likely to stay engaged when they see content quickly rather than staring
            at a blank screen.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              SEO Impact:
            </Text>{' '}
            FCP is a Google ranking factor as part of the Core Web Vitals, affecting search
            rankings.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Conversion Rates:
            </Text>{' '}
            Faster FCP correlates with higher conversion rates and better business outcomes.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="FCP Thresholds & Targets" initialSpaceAfterDivider="xs">
        <List spacing="xs" mb="md">
          <List.Item>
            <Text span fw={700} c="green">
              Good: ≤ 1.8 seconds
            </Text>
          </List.Item>
          <List.Item>
            <Text span fw={700} c="yellow">
              Needs Improvement: 1.8 - 3.0 seconds
            </Text>
          </List.Item>
          <List.Item>
            <Text span fw={700} c="red">
              Poor: {'> '} 3.0 seconds
            </Text>
          </List.Item>
        </List>
        <Text>
          The goal is to keep FCP under 1.8 seconds for 75% of your users (75th percentile).
        </Text>
      </SectionBlock>

      <SectionBlock title="What Counts as Contentful Paint?" initialSpaceAfterDivider="xs">
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Text content:
            </Text>{' '}
            Any rendered text
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Images:
            </Text>{' '}
            Including <Code>{'<img>'}</Code> elements and CSS background-images
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              SVG elements:
            </Text>{' '}
            Non-white SVG content
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Canvas:
            </Text>{' '}
            Non-white <Code>{'<canvas>'}</Code> elements
          </List.Item>
        </List>
        <Alert icon={<IconAlertTriangle size="1rem" />} color="orange" mt="md">
          <Text>
            <Text span fw={700}>
              What doesn't count:
            </Text>{' '}
            White background, iframe content, or content that's initially invisible (opacity: 0 or
            display: none).
          </Text>
        </Alert>
      </SectionBlock>

      <SectionBlock title="Measuring FCP" initialSpaceAfterDivider="xs">
        <Text mb="md">
          You can measure FCP using the Performance Observer API or through browser developer tools:
        </Text>
        <List spacing="xs" mb="md">
          <List.Item>
            <Text span fw={700}>
              Chrome DevTools:
            </Text>{' '}
            Lighthouse panel, Performance tab, or Web Vitals extension
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              PerformanceObserver API:
            </Text>{' '}
            Programmatic measurement in your application
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              web-vitals library:
            </Text>{' '}
            Easy-to-use library for measuring all Core Web Vitals
          </List.Item>
        </List>
        <CodeHighlightTabs
          mt="md"
          withExpandButton={false}
          defaultExpanded={false}
          radius="md"
          code={[
            {
              fileName: 'fcp-measurement.ts',
              language: 'typescript',
              code: FCP_SIGNATURE_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Common FCP Optimizations" initialSpaceAfterDivider="xs">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Server Response Time
            </Title>
            <Text>
              Optimize server-side processing, database queries, and CDN performance. Target TTFB
              (Time to First Byte) under 600ms.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Render-Blocking Resources
            </Title>
            <Text>
              Minimize render-blocking CSS and JavaScript. Use async/defer for scripts and inline
              critical CSS.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Resource Loading
            </Title>
            <Text>
              Use resource hints like preconnect, preload, and prefetch. Optimize images with WebP,
              lazy loading, and proper sizing.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              JavaScript Execution
            </Title>
            <Text>
              Reduce JavaScript bundle size, use code splitting, and minimize main thread work that
              blocks rendering.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Client-Side Rendering
            </Title>
            <Text>
              For SPAs, consider server-side rendering or static generation to deliver content
              faster.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="FCP vs Other Metrics" initialSpaceAfterDivider="xs">
        <Text mb="md">Understanding how FCP relates to other performance metrics:</Text>
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              FCP vs LCP (Largest Contentful Paint):
            </Text>{' '}
            FCP measures when any content appears, while LCP measures when the largest content
            element becomes visible.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              FCP vs FID (First Input Delay):
            </Text>{' '}
            FCP measures visual loading, FID measures interactivity. Users expect fast FCP before
            they can interact.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              FCP vs TTFB (Time to First Byte):
            </Text>{' '}
            TTFB measures server response time, which directly impacts FCP. Poor TTFB inevitably
            leads to poor FCP.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Monitoring FCP in Production" initialSpaceAfterDivider="xs">
        <Text mb="md">To effectively monitor FCP in production:</Text>
        <List spacing="xs">
          <List.Item>
            <Text span fw={700}>
              Use Real User Monitoring (RUM):
            </Text>{' '}
            Collect FCP data from actual users, not just lab tests
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Segment by Device/Network:
            </Text>{' '}
            Analyze FCP performance across different devices, connection speeds, and geographic
            locations
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Set Performance Budgets:
            </Text>{' '}
            Establish FCP thresholds and alert when they're exceeded
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Correlate with Business Metrics:
            </Text>{' '}
            Track how FCP changes impact conversion rates, bounce rates, and user engagement
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="FCP Optimization Example" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Here's a comprehensive example showing various FCP optimization techniques in a React
          application:
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'fcp-optimizations.tsx',
              language: 'typescript',
              code: FCP_OPTIMIZATION_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Example: Live FCP Measurement" initialSpaceAfterDivider="xs">
        <Text mb="md">
          This interactive example measures the current page's First Contentful Paint in real-time.
          It demonstrates how to implement FCP monitoring in your application:
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'useFCPMeasurement.ts',
              language: 'typescript',
              code: FCP_MEASUREMENT_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
        <FCPMeasurementExample />
      </SectionBlock>
    </>
  );
};

