import { Button, Group } from '@mantine/core';
import { FC, ReactNode, useContext } from 'react';
import { useThemeColorContext } from '@/shared';
import { AccordionContext } from '../../../model';

type Props = {
  children: ReactNode;
  id?: string;
};

export const AccordionHeader: FC<Props> = ({ children, id = '' }) => {
  const ctx = useContext(AccordionContext);
  const { primaryColor } = useThemeColorContext();

  if (!ctx) throw new Error('Accordion.Header must be used within Accordion');

  const isOpen = !!ctx.openItems[id];

  return (
    <Button
      aria-controls={`panel-${id}`}
      aria-expanded={isOpen}
      color={primaryColor}
      fullWidth
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
