import { FC, ReactNode, useContext } from 'react';
import { Collapse, Box } from '@mantine/core';
import { AccordionContext } from '../../../model';

type Props = {
  id?: string;
  children: ReactNode;
};

export const AccordionPanel: FC<Props> = ({ id = '', children }) => {
  const ctx = useContext(AccordionContext);

  if (!ctx) throw new Error('Accordion.Panel must be used within Accordion');

  return (
    <Collapse in={!!ctx.openItems[id]} id={`panel-${id}`} transitionDuration={200}>
      <Box p="md" bg="gray.0" style={{ borderRadius: 8 }}>
        {children}
      </Box>
    </Collapse>
  );
};

