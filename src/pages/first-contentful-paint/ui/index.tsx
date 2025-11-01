import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Alert, Code, List, Space, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import { FCP_MEASUREMENT_CODE, FCP_OPTIMIZATION_CODE, FCP_SIGNATURE_CODE } from '../model';
import { FCPMeasurementExample } from './example';

export const FirstContentfulPaintPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        First Contentful Paint (FCP)
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          First Contentful Paint (FCP) is a Core Web Vital that measures the time from when the page
          starts loading to when any part of the page's content is rendered on the screen. Content
          includes text, images (including background images), SVG elements, or non-white{' '}
          <Code>{'<canvas>'}</Code> elements. This metric is crucial for user experience as it
          indicates when users can actually see content on the page.
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Why FCP Matters">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              User Perception:
            </Text>{' '}
            FCP directly impacts how fast users perceive your site to be. A fast FCP creates the
            impression of a responsive, fast-loading site.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Engagement:
            </Text>{' '}
            Users are more likely to stay engaged when they see content quickly rather than staring
            at a blank screen.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              SEO Impact:
            </Text>{' '}
            FCP is a Google ranking factor as part of the Core Web Vitals, affecting search
            rankings.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Conversion Rates:
            </Text>{' '}
            Faster FCP correlates with higher conversion rates and better business outcomes.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="FCP Thresholds & Targets">
        <List mb="md" spacing="xs">
          <List.Item>
            <Text c="green" fw={700} span>
              Good: ≤ 1.8 seconds
            </Text>
          </List.Item>
          <List.Item>
            <Text c="yellow" fw={700} span>
              Needs Improvement: 1.8 - 3.0 seconds
            </Text>
          </List.Item>
          <List.Item>
            <Text c="red" fw={700} span>
              Poor: {'> '} 3.0 seconds
            </Text>
          </List.Item>
        </List>
        <Text>
          The goal is to keep FCP under 1.8 seconds for 75% of your users (75th percentile).
        </Text>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="What Counts as Contentful Paint?">
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Text content:
            </Text>{' '}
            Any rendered text
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Images:
            </Text>{' '}
            Including <Code>{'<img>'}</Code> elements and CSS background-images
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              SVG elements:
            </Text>{' '}
            Non-white SVG content
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Canvas:
            </Text>{' '}
            Non-white <Code>{'<canvas>'}</Code> elements
          </List.Item>
        </List>
        <Alert color="orange" icon={<IconAlertTriangle size="1rem" />} mt="md">
          <Text>
            <Text fw={700} span>
              What doesn't count:
            </Text>{' '}
            White background, iframe content, or content that's initially invisible (opacity: 0 or
            display: none).
          </Text>
        </Alert>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Measuring FCP">
        <Text mb="md">
          You can measure FCP using the Performance Observer API or through browser developer tools:
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
              code: FCP_SIGNATURE_CODE,
              fileName: 'fcp-measurement.ts',
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

      <SectionBlock initialSpaceAfterDivider="xs" title="Common FCP Optimizations">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Server Response Time
            </Title>
            <Text>
              Optimize server-side processing, database queries, and CDN performance. Target TTFB
              (Time to First Byte) under 600ms.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Render-Blocking Resources
            </Title>
            <Text>
              Minimize render-blocking CSS and JavaScript. Use async/defer for scripts and inline
              critical CSS.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Resource Loading
            </Title>
            <Text>
              Use resource hints like preconnect, preload, and prefetch. Optimize images with WebP,
              lazy loading, and proper sizing.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              JavaScript Execution
            </Title>
            <Text>
              Reduce JavaScript bundle size, use code splitting, and minimize main thread work that
              blocks rendering.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Client-Side Rendering
            </Title>
            <Text>
              For SPAs, consider server-side rendering or static generation to deliver content
              faster.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="FCP vs Other Metrics">
        <Text mb="md">Understanding how FCP relates to other performance metrics:</Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              FCP vs LCP (Largest Contentful Paint):
            </Text>{' '}
            FCP measures when any content appears, while LCP measures when the largest content
            element becomes visible.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              FCP vs FID (First Input Delay):
            </Text>{' '}
            FCP measures visual loading, FID measures interactivity. Users expect fast FCP before
            they can interact.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              FCP vs TTFB (Time to First Byte):
            </Text>{' '}
            TTFB measures server response time, which directly impacts FCP. Poor TTFB inevitably
            leads to poor FCP.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Monitoring FCP in Production">
        <Text mb="md">To effectively monitor FCP in production:</Text>
        <List spacing="xs">
          <List.Item>
            <Text fw={700} span>
              Use Real User Monitoring (RUM):
            </Text>{' '}
            Collect FCP data from actual users, not just lab tests
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Segment by Device/Network:
            </Text>{' '}
            Analyze FCP performance across different devices, connection speeds, and geographic
            locations
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Set Performance Budgets:
            </Text>{' '}
            Establish FCP thresholds and alert when they're exceeded
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Correlate with Business Metrics:
            </Text>{' '}
            Track how FCP changes impact conversion rates, bounce rates, and user engagement
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="FCP Optimization Example">
        <Text mb="md">
          Here's a comprehensive example showing various FCP optimization techniques in a React
          application:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: FCP_OPTIMIZATION_CODE,
              fileName: 'fcp-optimizations.tsx',
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

      <SectionBlock initialSpaceAfterDivider="xs" title="Example: Live FCP Measurement">
        <Text mb="md">
          This interactive example measures the current page's First Contentful Paint in real-time.
          It demonstrates how to implement FCP monitoring in your application:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: FCP_MEASUREMENT_CODE,
              fileName: 'useFCPMeasurement.ts',
              icon: <IconFileTypeTsx size={14} />,
              language: 'typescript',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
        <FCPMeasurementExample />
      </SectionBlock>
    </>
  );
};
