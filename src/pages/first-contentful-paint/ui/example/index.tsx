import { Card, Text, Badge, Progress, Group, Stack, Alert } from '@mantine/core';
import { IconSpeedboat, IconInfoCircle } from '@tabler/icons-react';
import { useFCPMeasurement } from '../../model';

export const FCPMeasurementExample = () => {
  const { fcp, isMeasuring } = useFCPMeasurement();

  const getFCPRating = (value: number) => {
    if (value <= 1800) return { color: 'green', text: 'Good' };
    if (value <= 3000) return { color: 'yellow', text: 'Needs Improvement' };
    return { color: 'red', text: 'Poor' };
  };

  const getProgress = (value: number) => {
    const percentage = Math.min((value / 3000) * 100, 100);
    return percentage;
  };

  const rating = fcp ? getFCPRating(fcp) : null;

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group>
          <IconSpeedboat size={20} />
          <Text fw={700} size="lg">
            First Contentful Paint Measurement
          </Text>
        </Group>

        <Alert icon={<IconInfoCircle size="16" />} color="blue">
          <Text size="sm">
            This example measures the First Contentful Paint (FCP) of the current page. FCP measures
            when the first piece of DOM content is rendered. Good FCP should be ≤ 1.8 seconds.
          </Text>
        </Alert>

        <Card withBorder p="md" bg="gray.0">
          <Stack gap="sm">
            <Text size="sm" c="dimmed">
              Current Page FCP
            </Text>

            {isMeasuring ? (
              <Group>
                <Text size="xl" fw={700}>
                  Measuring...
                </Text>
              </Group>
            ) : fcp ? (
              <Group>
                <Text size="xl" fw={700}>
                  {fcp}ms
                </Text>
                {rating && (
                  <Badge color={rating.color} variant="light">
                    {rating.text}
                  </Badge>
                )}
              </Group>
            ) : (
              <Text size="xl" fw={700} c="dimmed">
                Unable to measure
              </Text>
            )}

            {fcp && <Progress value={getProgress(fcp)} color={rating?.color} size="sm" mt="xs" />}
          </Stack>
        </Card>

        <Stack gap="xs">
          <Text size="sm" fw={600}>
            FCP Thresholds:
          </Text>
          <Group gap="xs">
            <Badge color="green" size="sm">
              Good
            </Badge>
            <Text size="sm">≤ 1.8s (1800ms)</Text>
          </Group>
          <Group gap="xs">
            <Badge color="yellow" size="sm">
              Needs Improvement
            </Badge>
            <Text size="sm">1.8s - 3.0s</Text>
          </Group>
          <Group gap="xs">
            <Badge color="red" size="sm">
              Poor
            </Badge>
            <Text size="sm">{'> '} 3.0s</Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
};

