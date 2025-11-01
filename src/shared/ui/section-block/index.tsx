import { Divider, MantineSize, Space, Text, Title } from '@mantine/core';
import React from 'react';

const visuallyHiddenStyle: React.CSSProperties = {
  border: 0,
  clip: 'rect(0, 0, 0, 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

type Props = {
  title: React.ReactNode;
  children: React.ReactNode;
  initialSpaceAfterDivider?: MantineSize | (string & {}) | number;
};

export const SectionBlock: React.FC<Props> = ({
  title,
  children,
  initialSpaceAfterDivider = 'md',
}) => (
  <>
    <Title order={2} style={visuallyHiddenStyle}>
      {typeof title === 'string' ? title : 'Section'}
    </Title>
    <Divider
      label={
        <Text c="dimmed" fw={500} fz="lg" ta="center">
          {title}
        </Text>
      }
      labelPosition="center"
      my="lg"
    />
    <Space h={initialSpaceAfterDivider} />
    {children}
  </>
);
