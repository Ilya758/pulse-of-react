import { FC, ReactNode, useCallback, useState } from 'react';
import { toggleAccordionItem } from '../../../lib';
import { AccordionContext } from '../../../model';
import { AccordionHeader } from './header';
import { AccordionItem } from './item';
import { AccordionPanel } from './panel';

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
      setOpenItems((prevState) => toggleAccordionItem(prevState, id, allowMultiple));
    },
    [allowMultiple],
  );

  return (
    <AccordionContext.Provider value={{ allowMultiple, openItems, toggleItem }}>
      {children}
    </AccordionContext.Provider>
  );
};

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;
