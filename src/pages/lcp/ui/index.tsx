import { FC, useEffect } from 'react';
import { Title, Text, List, Space, Alert, Badge, Group } from '@mantine/core';
import { IconInfoCircle, IconFileTypeTsx, IconAlertTriangle } from '@tabler/icons-react';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';

import { LcpOptimizationExample } from './example';
import {
  LCP_METRICS_CODE,
  LCP_OPTIMIZATION_CODE,
  LCP_REACT_OPTIMIZATION_CODE,
  LCP_MONITORING_CODE,
  LCP_IMAGE_OPTIMIZATION_CODE,
  LCP_CDN_OPTIMIZATION_CODE,
} from '../model';

export const LcpPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, [signalContentLoaded]);

  return (
    <>
      <Space h={4} />
      <Title order={1} mb="lg">
        Largest Contentful Paint (LCP)
      </Title>

      <SectionBlock title="Core Concept" initialSpaceAfterDivider="xs">
        <Text>
          Largest Contentful Paint (LCP) is one of the three Core Web Vitals metrics, and it
          represents how quickly the main content of a web page becomes visible to users. LCP
          measures the time from when the user initiates loading the page until the largest image or
          text block becomes visible within the viewport.
        </Text>
        <Space h="sm" />
        <Text>
          A fast LCP helps reassure the user that the page is actually loading and improving the
          perceived performance. The goal is to keep LCP under 2.5 seconds for optimal user
          experience.
        </Text>
      </SectionBlock>

      <SectionBlock title="What Counts as LCP" initialSpaceAfterDivider="xs">
        <Text mb="md">
          LCP considers several types of elements when determining the largest contentful paint:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Group gap="xs">
              <Text span fw={700}>
                Images:
              </Text>{' '}
              Including img elements, SVG images, and CSS background images
            </Group>
          </List.Item>
          <List.Item>
            <Group gap="xs">
              <Text span fw={700}>
                Text Elements:
              </Text>{' '}
              Block-level elements containing text nodes (paragraphs, headings, etc.)
            </Group>
          </List.Item>
          <List.Item>
            <Group gap="xs">
              <Text span fw={700}>
                Video Elements:
              </Text>{' '}
              The poster image of a video element
            </Group>
          </List.Item>
          <List.Item>
            <Group gap="xs">
              <Text span fw={700}>
                Canvas Elements:
              </Text>{' '}
              Elements that have been painted with bitmap content
            </Group>
          </List.Item>
        </List>

        <Alert icon={<IconAlertTriangle size="1rem" />} color="yellow" mt="md">
          <Text span fw={700}>
            Note:
          </Text>{' '}
          Elements that are removed from the DOM (like animated banners) are not considered for LCP.
          The LCP candidate must remain visible in the viewport when the page finishes loading.
        </Alert>
      </SectionBlock>

      <SectionBlock title="LCP Thresholds" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Google recommends the following LCP thresholds for optimal user experience:
        </Text>
        <Group gap="xs" mb="md">
          <Badge color="green" size="lg" variant="light">
            Good
          </Badge>
          <Text>≤ 2.5 seconds</Text>
        </Group>
        <Group gap="xs" mb="md">
          <Badge color="yellow" size="lg" variant="light">
            Needs Improvement
          </Badge>
          <Text>2.5 - 4.0 seconds</Text>
        </Group>
        <Group gap="xs">
          <Badge color="red" size="lg" variant="light">
            Poor
          </Badge>
          <Text>≥ 4.0 seconds</Text>
        </Group>
      </SectionBlock>

      <SectionBlock title="How LCP is Measured" initialSpaceAfterDivider="xs">
        <Text mb="md">LCP measurement involves four key parts of the loading process:</Text>
        <List spacing="sm">
          <List.Item>
            <Title order={5} mb="xs">
              Time to First Byte (TTFB)
            </Title>
            <Text>
              Time from when the user requests the page to when the browser receives the first byte
              of the HTML response.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mb="xs">
              Resource Load Delay
            </Title>
            <Text>
              Time from TTFB to when the browser starts loading the LCP resource (image, font,
              etc.).
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} mb="xs">
              Resource Load Time
            </Title>
            <Text>Time it takes to load the LCP resource itself.</Text>
          </List.Item>
          <List.Item>
            <Title order={5} mb="xs">
              Element Render Delay
            </Title>
            <Text>
              Time from when the resource finishes loading until the element is fully rendered.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Measuring LCP in Practice" initialSpaceAfterDivider="xs">
        <Text mb="md">You can measure LCP using both browser APIs and web vitals libraries:</Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'lcp-metrics.js',
              language: 'javascript',
              code: LCP_METRICS_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Core LCP Optimization Strategies" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Optimizing LCP involves addressing the four main parts of the LCP timeline. Here are the
          most effective strategies:
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'lcp-optimization.html',
              language: 'html',
              code: LCP_OPTIMIZATION_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="React-Specific LCP Optimization" initialSpaceAfterDivider="xs">
        <Text mb="md">
          In React applications, you have additional tools and patterns to optimize LCP:
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'react-lcp-optimization.tsx',
              language: 'tsx',
              code: LCP_REACT_OPTIMIZATION_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Image Optimization for LCP" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Images are often the LCP element. Here's how to optimize them effectively:
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'image-optimization.tsx',
              language: 'tsx',
              code: LCP_IMAGE_OPTIMIZATION_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="CDN and Delivery Optimization" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Content delivery networks and caching strategies play a crucial role in LCP performance:
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'cdn-optimization.js',
              language: 'javascript',
              code: LCP_CDN_OPTIMIZATION_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Real User Monitoring (RUM)" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Monitoring LCP in production helps you understand real-world performance:
        </Text>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          mb="lg"
          code={[
            {
              fileName: 'lcp-monitoring.js',
              language: 'javascript',
              code: LCP_MONITORING_CODE,
              icon: <IconFileTypeTsx size={14} />,
            },
          ]}
        />
      </SectionBlock>

      <SectionBlock title="Key Best Practices" initialSpaceAfterDivider="xs">
        <List spacing="sm" icon={<IconInfoCircle size={16} />}>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Preload Critical Resources
            </Title>
            <Text>Use link rel="preload" for LCP candidates like hero images and fonts.</Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Optimize Server Response
            </Title>
            <Text>
              Reduce TTFB through CDN usage, server optimization, and proper caching headers.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Compress and Transform Images
            </Title>
            <Text>Use modern formats (WebP, AVIF), proper sizing, and compression techniques.</Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Eliminate Render-Blocking Resources
            </Title>
            <Text>
              Inline critical CSS, defer non-critical JavaScript, and optimize font loading.
            </Text>
          </List.Item>
          <List.Item>
            <Title order={5} c="orange" mb="xs">
              Use Resource Hints
            </Title>
            <Text>Implement DNS prefetch, preconnect, and prefetch strategically.</Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Common Pitfalls to Avoid" initialSpaceAfterDivider="xs">
        <List spacing="sm">
          <List.Item>
            <Text span fw={700}>
              Lazy Loading Above-the-Fold Content:
            </Text>{' '}
            Never lazy load your LCP candidate element.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Client-Side Only Rendering:
            </Text>{' '}
            Server-side rendering significantly improves LCP for content-heavy pages.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Large Unoptimized Images:
            </Text>{' '}
            Always compress and resize images appropriately for the viewport.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Slow Font Loading:
            </Text>{' '}
            Use font-display: swap to prevent invisible text while fonts load.
          </List.Item>
          <List.Item>
            <Text span fw={700}>
              Excessive Third-Party Scripts:
            </Text>{' '}
            Minimize and optimize third-party dependencies that can block rendering.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock title="Interactive LCP Optimization Example" initialSpaceAfterDivider="xs">
        <Text mb="md">
          Try the interactive simulator below to understand how different optimization strategies
          affect LCP performance:
        </Text>
        <LcpOptimizationExample />
      </SectionBlock>
    </>
  );
};

