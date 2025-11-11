import { CodeHighlightTabs } from '@mantine/code-highlight';
import { List, Space, Text, Title } from '@mantine/core';
import { IconFileTypeJs, IconFileTypeTsx } from '@tabler/icons-react';
import { FC, useEffect } from 'react';
import { SectionBlock } from '@/shared';
import { useTocContent } from '@/widgets/layout';
import {
  BAD_EXAMPLE_DYNAMIC_CONTENT_CODE,
  BAD_EXAMPLE_FONT_CODE,
  BAD_EXAMPLE_IMAGE_CODE,
  CLS_THRESHOLDS,
  CSS_TRANSFORM_CODE,
  GOOD_EXAMPLE_DYNAMIC_CONTENT_CODE,
  GOOD_EXAMPLE_FONT_CODE,
  GOOD_EXAMPLE_IMAGE_CODE,
  LAYOUT_INSTABILITY_API_CODE,
  WEB_VITALS_CLS_CODE,
} from '../model';
import { Example } from './example';

export const CumulativeLayoutShiftPage: FC = () => {
  const { signalContentLoaded } = useTocContent();

  useEffect(signalContentLoaded, []);

  return (
    <>
      <Title order={1}>Cumulative Layout Shift (CLS)</Title>
      <Space h={4} />
      <SectionBlock initialSpaceAfterDivider="xs" title="Core Concept">
        <Text>
          Cumulative Layout Shift (CLS) is a Core Web Vital metric that measures visual stability.
          It quantifies how much unexpected layout shifts occur on a page during its entire
          lifecycle. A high CLS score indicates that elements on the page are moving around as the
          page loads, which can be frustrating for users.
        </Text>
        <Space h="sm" />
        <Text>
          The goal is to have a CLS score of <strong>0.1 or less</strong>. A low CLS score ensures
          that the page is visually stable and provides a better user experience.
        </Text>
      </SectionBlock>
      <SectionBlock initialSpaceAfterDivider="xs" title="How CLS is Calculated">
        <Text>
          CLS is calculated by multiplying two factors: the <strong>Impact Fraction</strong> and the{' '}
          <strong>Distance Fraction</strong>.
        </Text>
        <List mt="md" spacing="xs">
          <List.Item>
            <strong>Impact Fraction:</strong> The percentage of the viewport that is affected by the
            layout shift. It is the area of the shifted element divided by the area of the viewport.
          </List.Item>
          <List.Item>
            <strong>Distance Fraction:</strong> The distance that the element has moved, as a
            percentage of the viewport's largest dimension (width or height).
          </List.Item>
        </List>
        <Text mt="md">
          The formula is: <code>Layout Shift Score = Impact Fraction * Distance Fraction</code>
        </Text>
      </SectionBlock>
      <SectionBlock initialSpaceAfterDivider="xs" title="Common Causes of CLS">
        <List spacing="sm">
          <List.Item>
            <Title order={5}>Images without dimensions</Title>
            <Text>
              When an image loads, it can push content down the page if its dimensions are not
              specified. This is a very common cause of layout shifts.
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  code: BAD_EXAMPLE_IMAGE_CODE,
                  fileName: 'bad.html',
                  icon: <IconFileTypeTsx size={14} />,
                  language: 'html',
                },
                {
                  code: GOOD_EXAMPLE_IMAGE_CODE,
                  fileName: 'good.html',
                  icon: <IconFileTypeTsx size={14} />,
                  language: 'html',
                },
              ]}
              defaultExpanded={false}
              mb="lg"
              mt="md"
              radius="md"
              withExpandButton
            />
          </List.Item>
          <List.Item>
            <Title order={5}>Ads, embeds, and iframes without dimensions</Title>
            <Text>
              Dynamically injected content like ads or embeds can cause significant layout shifts if
              space is not reserved for them.
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  code: BAD_EXAMPLE_DYNAMIC_CONTENT_CODE,
                  fileName: 'bad.js',
                  icon: <IconFileTypeTsx size={14} />,
                  language: 'javascript',
                },
                {
                  code: GOOD_EXAMPLE_DYNAMIC_CONTENT_CODE,
                  fileName: 'good.jsx',
                  icon: <IconFileTypeTsx size={14} />,
                  language: 'jsx',
                },
              ]}
              defaultExpanded={false}
              mb="lg"
              mt="md"
              radius="md"
              withExpandButton
            />
          </List.Item>
          <List.Item>
            <Title order={5}>Web fonts causing FOIT/FOUT</Title>
            <Text>
              Flash of Invisible Text (FOIT) or Flash of Unstyled Text (FOUT) can occur while custom
              fonts are loading, causing text to reflow and shift the layout.
            </Text>
            <CodeHighlightTabs
              code={[
                {
                  code: BAD_EXAMPLE_FONT_CODE,
                  fileName: 'bad.css',
                  icon: <IconFileTypeTsx size={14} />,
                  language: 'css',
                },
                {
                  code: GOOD_EXAMPLE_FONT_CODE,
                  fileName: 'good.html',
                  icon: <IconFileTypeTsx size={14} />,
                  language: 'html',
                },
              ]}
              defaultExpanded={false}
              mb="lg"
              mt="md"
              radius="md"
              withExpandButton
            />
          </List.Item>
        </List>
      </SectionBlock>
      <SectionBlock initialSpaceAfterDivider="xs" title="Expected vs. Unexpected Layout Shifts">
        <Text>
          Not all layout shifts are detrimental. Shifts that occur in response to a user's action
          (like clicking a button or typing in a search bar) are generally acceptable, as long as
          the shift happens within 500 milliseconds of the user input. This proximity makes the
          relationship between the action and the UI change clear to the user.
        </Text>
        <Title mt="md" order={4}>
          Animations and Transitions
        </Title>
        <Text>
          Well-executed animations and transitions can update page content smoothly without causing
          unexpected shifts. Instead of directly manipulating properties like `height`, `width`, or
          `top`, which trigger layout recalculations, you should use the CSS `transform` property.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: CSS_TRANSFORM_CODE,
              fileName: 'good.css',
              icon: <IconFileTypeJs size={14} />,
              language: 'css',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          mt="md"
          radius="md"
          withExpandButton
        />
      </SectionBlock>
      <SectionBlock initialSpaceAfterDivider="xs" title="How to Measure CLS">
        <Text>
          CLS can be measured in a lab environment (like Lighthouse) or in the field (with real user
          data). To measure CLS with JavaScript, you can use the `Layout Instability API` or the
          `web-vitals` library for a more robust solution.
        </Text>
        <CodeHighlightTabs
          code={[
            {
              code: LAYOUT_INSTABILITY_API_CODE,
              fileName: 'layout-instability.js',
              icon: <IconFileTypeJs size={14} />,
              language: 'javascript',
            },
            {
              code: WEB_VITALS_CLS_CODE,
              fileName: 'web-vitals.js',
              icon: <IconFileTypeJs size={14} />,
              language: 'javascript',
            },
          ]}
          defaultExpanded={false}
          mb="lg"
          mt="md"
          radius="md"
          withExpandButton
        />
      </SectionBlock>
      <SectionBlock initialSpaceAfterDivider="xs" title="CLS Thresholds">
        <List mb="md" spacing="xs">
          {CLS_THRESHOLDS.map(({ color, label, value }) => (
            <List.Item key={label}>
              <Text c={color} fw={700} span>
                {label}: {value}
              </Text>
            </List.Item>
          ))}
        </List>
      </SectionBlock>
      <SectionBlock title="Interactive Example">
        <Example />
      </SectionBlock>
    </>
  );
};
