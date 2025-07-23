import { FC, ReactNode, useContext } from 'react';
import { Button, Group } from '@mantine/core';
import { AccordionContext } from '../../../model';
import { useThemeColorContext } from '@/shared';

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
      aria-expanded={isOpen}
      aria-controls={`panel-${id}`}
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

