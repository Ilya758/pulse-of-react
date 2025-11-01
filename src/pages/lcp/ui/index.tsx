import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Alert, Badge, Group, List, Space, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconFileTypeTsx, IconInfoCircle } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import {
  LCP_CDN_OPTIMIZATION_CODE,
  LCP_IMAGE_OPTIMIZATION_CODE,
  LCP_METRICS_CODE,
  LCP_MONITORING_CODE,
  LCP_OPTIMIZATION_CODE,
  LCP_REACT_OPTIMIZATION_CODE,
} from '../model';
import { LcpOptimizationExample } from './example';

export const LcpPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Space h={4} />
      <Title mb="lg" order={1}>
        Largest Contentful Paint (LCP)
      </Title>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
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

      <SectionBlock initialSpaceAfterDivider="xs" title="What Counts as LCP">
        <Text mb="md">
          LCP considers several types of elements when determining the largest contentful paint:
        </Text>
        <List spacing="xs">
          <List.Item>
            <Group gap="xs">
              <Text fw={700} span>
                Images:
              </Text>{' '}
              Including img elements, SVG images, and CSS background images
            </Group>
          </List.Item>
          <List.Item>
            <Group gap="xs">
              <Text fw={700} span>
                Text Elements:
              </Text>{' '}
              Block-level elements containing text nodes (paragraphs, headings, etc.)
            </Group>
          </List.Item>
          <List.Item>
            <Group gap="xs">
              <Text fw={700} span>
                Video Elements:
              </Text>{' '}
              The poster image of a video element
            </Group>
          </List.Item>
          <List.Item>
            <Group gap="xs">
              <Text fw={700} span>
                Canvas Elements:
              </Text>{' '}
              Elements that have been painted with bitmap content
            </Group>
          </List.Item>
        </List>

        <Alert color="yellow" icon={<IconAlertTriangle size="1rem" />} mt="md">
          <Text fw={700} span>
            Note:
          </Text>{' '}
          Elements that are removed from the DOM (like animated banners) are not considered for LCP.
          The LCP candidate must remain visible in the viewport when the page finishes loading.
        </Alert>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="LCP Thresholds">
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

      <SectionBlock initialSpaceAfterDivider="xs" title="How LCP is Measured">
        <Text mb="md">LCP measurement involves four key parts of the loading process:</Text>
        <List spacing="sm">
          <List.Item>
            <Title mb="xs" order={5}>
              Time to First Byte (TTFB)
            </Title>
            <Text>
              Time from when the user requests the page to when the browser receives the first byte
              of the HTML response.
            </Text>
          </List.Item>
          <List.Item>
            <Title mb="xs" order={5}>
              Resource Load Delay
            </Title>
            <Text>
              Time from TTFB to when the browser starts loading the LCP resource (image, font,
              etc.).
            </Text>
          </List.Item>
          <List.Item>
            <Title mb="xs" order={5}>
              Resource Load Time
            </Title>
            <Text>Time it takes to load the LCP resource itself.</Text>
          </List.Item>
          <List.Item>
            <Title mb="xs" order={5}>
              Element Render Delay
            </Title>
            <Text>
              Time from when the resource finishes loading until the element is fully rendered.
            </Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Measuring LCP in Practice">
        <Text mb="md">You can measure LCP using both browser APIs and web vitals libraries:</Text>
        <CodeHighlightTabs
          code={[
            {
              code: LCP_METRICS_CODE,
              fileName: 'lcp-metrics.js',
              icon: <IconFileTypeTsx size={14} />,
              language: 'javascript',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Core LCP Optimization Strategies">
        <Text mb="md">
          Optimizing LCP involves addressing the four main parts of the LCP timeline. Here are the
          most effective strategies:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: LCP_OPTIMIZATION_CODE,
              fileName: 'lcp-optimization.html',
              icon: <IconFileTypeTsx size={14} />,
              language: 'html',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="React-Specific LCP Optimization">
        <Text mb="md">
          In React applications, you have additional tools and patterns to optimize LCP:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: LCP_REACT_OPTIMIZATION_CODE,
              fileName: 'react-lcp-optimization.tsx',
              icon: <IconFileTypeTsx size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Image Optimization for LCP">
        <Text mb="md">
          Images are often the LCP element. Here's how to optimize them effectively:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: LCP_IMAGE_OPTIMIZATION_CODE,
              fileName: 'image-optimization.tsx',
              icon: <IconFileTypeTsx size={14} />,
              language: 'tsx',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="CDN and Delivery Optimization">
        <Text mb="md">
          Content delivery networks and caching strategies play a crucial role in LCP performance:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: LCP_CDN_OPTIMIZATION_CODE,
              fileName: 'cdn-optimization.js',
              icon: <IconFileTypeTsx size={14} />,
              language: 'javascript',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Real User Monitoring (RUM)">
        <Text mb="md">
          Monitoring LCP in production helps you understand real-world performance:
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: LCP_MONITORING_CODE,
              fileName: 'lcp-monitoring.js',
              icon: <IconFileTypeTsx size={14} />,
              language: 'javascript',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          radius="md"
          withExpandButton
        />
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Key Best Practices">
        <List icon={<IconInfoCircle size={16} />} spacing="sm">
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Preload Critical Resources
            </Title>
            <Text>Use link rel="preload" for LCP candidates like hero images and fonts.</Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Optimize Server Response
            </Title>
            <Text>
              Reduce TTFB through CDN usage, server optimization, and proper caching headers.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Compress and Transform Images
            </Title>
            <Text>Use modern formats (WebP, AVIF), proper sizing, and compression techniques.</Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Eliminate Render-Blocking Resources
            </Title>
            <Text>
              Inline critical CSS, defer non-critical JavaScript, and optimize font loading.
            </Text>
          </List.Item>
          <List.Item>
            <Title c="orange" mb="xs" order={5}>
              Use Resource Hints
            </Title>
            <Text>Implement DNS prefetch, preconnect, and prefetch strategically.</Text>
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Common Pitfalls to Avoid">
        <List spacing="sm">
          <List.Item>
            <Text fw={700} span>
              Lazy Loading Above-the-Fold Content:
            </Text>{' '}
            Never lazy load your LCP candidate element.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Client-Side Only Rendering:
            </Text>{' '}
            Server-side rendering significantly improves LCP for content-heavy pages.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Large Unoptimized Images:
            </Text>{' '}
            Always compress and resize images appropriately for the viewport.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Slow Font Loading:
            </Text>{' '}
            Use font-display: swap to prevent invisible text while fonts load.
          </List.Item>
          <List.Item>
            <Text fw={700} span>
              Excessive Third-Party Scripts:
            </Text>{' '}
            Minimize and optimize third-party dependencies that can block rendering.
          </List.Item>
        </List>
      </SectionBlock>

      <SectionBlock initialSpaceAfterDivider="xs" title="Interactive LCP Optimization Example">
        <Text mb="md">
          Try the interactive simulator below to understand how different optimization strategies
          affect LCP performance:
        </Text>
        <LcpOptimizationExample />
      </SectionBlock>
    </>
  );
};
