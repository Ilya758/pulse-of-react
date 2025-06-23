import { useState, useCallback, ReactNode, FC } from 'react';
import { AccordionItem } from './item';
import { AccordionHeader } from './header';
import { AccordionPanel } from './panel';
import { AccordionContext } from '../../../model';
import { toggleAccordionItem } from '../../../lib';

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
        return toggleAccordionItem(prevState, id, allowMultiple);
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

