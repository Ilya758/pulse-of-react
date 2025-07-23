export const PATTERN_SIGNATURE_CODE = `// Abstract Compound Component Pattern Signature
// Parent manages shared state and passes it to children via context or props
const Parent = ({ children }) => {
  // shared state and logic here
  return (
    <ParentContext.Provider value={/* shared state and actions */}>
      {children}
    </ParentContext.Provider>
  );
};

// Compound subcomponents consume context/props from parent
Parent.Item = ({ children }) => <div>{children}</div>;
Parent.Header = ({ id, children }) => {
  const context = useContext(ParentContext);
  // use context to determine state and actions
  return (
    <button /* onClick, aria-expanded, etc. */>
      {children}
    </button>
  );
};
Parent.Panel = ({ id, children }) => {
  const context = useContext(ParentContext);
  // use context to determine visibility
  return context.isVisible(id) ? <div>{children}</div> : null;
};
`;

export const ACCORDION_CONTEXT_CODE = `
import { createContext } from 'react';

export interface AccordionContextValue {
  openItems: Record<string, true>;
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

export const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);
`;

export const ACCORDION_PARENT_CODE = `
import { useState, useCallback, ReactNode, FC } from 'react';
import { AccordionItem } from './item';
import { AccordionHeader } from './header';
import { AccordionPanel } from './panel';
import { AccordionContext } from './context';

type Props = {
  allowMultiple?: boolean;
  children: ReactNode;
  defaultOpenItems?: string[];
};

export const Accordion: FC<Props> & {
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
  Panel: typeof AccordionPanel;
} = ({ allowMultiple = false, defaultOpenItems = [], children }) => {
  const [openItems, setOpenItems] = useState<Record<string, true>>(() => {
    const obj: Record<string, true> = {};
    defaultOpenItems.forEach((id) => {
      obj[id] = true;
    });
    return obj;
  });

  const toggleItem = useCallback(
    (id: string) => {
      setOpenItems((prevState) => {
        const isOpen = !!prevState[id];
        if (allowMultiple) {
          if (isOpen) {
            return Object.keys(prevState).reduce<Record<string, true>>((acc, key) => {
              if (key !== id) acc[key] = true;
              return acc;
            }, {});
          }
          return { ...prevState, [id]: true };
        }
        return isOpen ? {} : { [id]: true };
      });
    },
    [allowMultiple],
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      {children}
    </AccordionContext.Provider>
  );
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;
`;

export const ACCORDION_ITEM_CODE = `
import { ReactElement, FC, Children, isValidElement, cloneElement } from 'react';

type Props = {
  id: string;
  children: ReactElement | ReactElement[];
};

type WithIdProp = { id?: string };

export const AccordionItem: FC<Props> = ({ id, children }) => (
  <div data-accordion-item={id} style={{ marginBottom: '0.75rem' }}>
    {Children.map(children, (child) =>
      isValidElement(child) ? cloneElement(child as ReactElement<WithIdProp>, { id }) : child,
    )}
  </div>
);
`;

export const ACCORDION_HEADER_CODE = `
import { FC, ReactNode, useContext } from 'react';
import { Button, Group } from '@mantine/core';
import { AccordionContext } from './context';
import { useThemeColorContext } from '@/shared';

type Props = {
  children: ReactNode;
  id: string;
};

export const AccordionHeader: FC<Props> = ({ children, id }) => {
  const ctx = useContext(AccordionContext);
  const { primaryColor } = useThemeColorContext();

  if (!ctx) throw new Error('Accordion.Header must be used within Accordion');
  
  const isOpen = !!ctx.openItems[id];
  
  return (
    <Button
      aria-expanded={isOpen}
      aria-controls={\`panel-\${id}\`}
      color={primaryColor}
      fullWidth
      mb={4}
      onClick={() => ctx.toggleItem(id)}
      variant={isOpen ? 'filled' : 'light'}
    >
      <Group justify="space-between">
        <span>{children}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </Group>
    </Button>
  );
};
`;

export const ACCORDION_PANEL_CODE = `
import { FC, ReactNode, useContext } from 'react';
import { Collapse, Box } from '@mantine/core';
import { AccordionContext } from './context';

type Props = {
  id: string;
  children: ReactNode;
};

export const AccordionPanel: FC<Props> = ({ id, children }) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion.Panel must be used within Accordion');
  return (
    <Collapse in={!!ctx.openItems[id]} id={\`panel-\${id}\`} transitionDuration={200}>
      <Box p="md" bg="gray.0" style={{ borderRadius: 8 }}>
        {children}
      </Box>
    </Collapse>
  );
};
`;

export const ACCORDION_USAGE_CODE = `
export const Example = () => {
  return (
    <Accordion allowMultiple defaultOpenItems={['item1']}>
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
  );
};`;

