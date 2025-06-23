import { Title, Text } from '@mantine/core';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Accordion } from './accordion';
import {
  ACCORDION_PARENT_CODE,
  ACCORDION_ITEM_CODE,
  ACCORDION_HEADER_CODE,
  ACCORDION_PANEL_CODE,
  ACCORDION_USAGE_CODE,
} from '../../model';

export const Example = () => {
  return (
    <>
      <Title order={4} mb="sm">
        Accordion Compound Component Example
      </Title>
      <Text mb="md">
        This advanced example demonstrates a custom Accordion built with the Compound Components
        pattern. It supports both single and multiple open panels, uses context for state sharing,
        and is fully composed from subcomponents. All UI is styled with Mantine.
      </Text>
      <CodeHighlightTabs
        withExpandButton
        defaultExpanded={false}
        radius="md"
        mb="lg"
        code={[
          {
            fileName: 'usage.tsx',
            language: 'tsx',
            code: ACCORDION_USAGE_CODE,
          },
          {
            fileName: 'Accordion.tsx',
            language: 'tsx',
            code: ACCORDION_PARENT_CODE,
          },
          {
            fileName: 'AccordionItem.tsx',
            language: 'tsx',
            code: ACCORDION_ITEM_CODE,
          },
          {
            fileName: 'AccordionHeader.tsx',
            language: 'tsx',
            code: ACCORDION_HEADER_CODE,
          },
          {
            fileName: 'AccordionPanel.tsx',
            language: 'tsx',
            code: ACCORDION_PANEL_CODE,
          },
        ]}
      />
      <Accordion allowMultiple={false} defaultOpenItems={['item1']}>
        <Accordion.Item id="item1">
          <Accordion.Header>What is Compound Components?</Accordion.Header>
          <Accordion.Panel>
            Compound Components is a React pattern where a parent component manages state and passes
            it to its children implicitly, allowing for flexible and expressive composition.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item id="item2">
          <Accordion.Header>Why use this pattern?</Accordion.Header>
          <Accordion.Panel>
            It enables advanced UI patterns (like Accordions, Tabs, Menus) where subcomponents can
            coordinate via shared state, without prop drilling.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item id="item3">
          <Accordion.Header>How is state shared?</Accordion.Header>
          <Accordion.Panel>
            State is shared using React context or by cloning children and injecting props, so all
            subcomponents can access and update shared state.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

