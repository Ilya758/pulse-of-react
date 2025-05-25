import React from 'react';
import { Title, Divider, Text, Space, MantineSize } from '@mantine/core';

const visuallyHiddenStyle: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
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
}) => {
  return (
    <>
      <Title order={2} style={visuallyHiddenStyle}>
        {typeof title === 'string' ? title : 'Section'}
      </Title>
      <Divider
        my="lg"
        label={
          <Text c="dimmed" ta="center" fz="lg" fw={500}>
            {title}
          </Text>
        }
        labelPosition="center"
      />
      <Space h={initialSpaceAfterDivider} />
      {children}
    </>
  );
};

