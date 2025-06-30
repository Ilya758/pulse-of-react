import { Paper, Text } from '@mantine/core';

export const LazyFeature = () => {
  return (
    <Paper p="md" shadow="xs" withBorder>
      <Text c="indigo" fw={700}>
        This feature was loaded lazily!
      </Text>
      <Text mt="sm">You can see the network request for this chunk in DevTools.</Text>
    </Paper>
  );
};

