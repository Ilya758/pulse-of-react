import { Paper, Text } from '@mantine/core';
import { useThemeColorContext } from '@/shared';

export const LazyFeature = () => {
  const { primaryColor } = useThemeColorContext();

  return (
    <Paper p="md" shadow="xs" withBorder>
      <Text c={primaryColor} fw={700}>
        This feature was loaded lazily!
      </Text>
      <Text mt="sm">You can see the network request for this chunk in DevTools.</Text>
    </Paper>
  );
};

