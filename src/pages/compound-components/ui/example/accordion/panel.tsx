import { Box, Collapse } from '@mantine/core';
import { FC, ReactNode, useContext } from 'react';
import { AccordionContext } from '../../../model';

type Props = {
  id?: string;
  children: ReactNode;
};

export const AccordionPanel: FC<Props> = ({ id = '', children }) => {
  const ctx = useContext(AccordionContext);

  if (!ctx) throw new Error('Accordion.Panel must be used within Accordion');

  return (
    <Collapse id={`panel-${id}`} in={!!ctx.openItems[id]} transitionDuration={200}>
      <Box p="md" style={{ borderRadius: 8 }}>
        {children}
      </Box>
    </Collapse>
  );
};
