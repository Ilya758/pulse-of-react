import { createContext } from 'react';

export interface AccordionContextValue {
  allowMultiple: boolean;
  openItems: Record<string, true>;
  toggleItem: (id: string) => void;
}

export const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

