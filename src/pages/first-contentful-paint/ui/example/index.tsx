import { Alert, Badge, Card, Group, Progress, Stack, Text } from '@mantine/core';
import { IconInfoCircle, IconSpeedboat } from '@tabler/icons-react';
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
    <Card p="lg" radius="md" shadow="sm" withBorder>
      <Stack gap="md">
        <Group>
          <IconSpeedboat size={20} />
          <Text fw={700} size="lg">
            First Contentful Paint Measurement
          </Text>
        </Group>

        <Alert color="blue" icon={<IconInfoCircle size="16" />}>
          <Text size="sm">
            This example measures the First Contentful Paint (FCP) of the current page. FCP measures
            when the first piece of DOM content is rendered. Good FCP should be ≤ 1.8 seconds.
          </Text>
        </Alert>

        <Card bg="gray.0" p="md" withBorder>
          <Stack gap="sm">
            <Text c="dimmed" size="sm">
              Current Page FCP
            </Text>

            {isMeasuring ? (
              <Group>
                <Text fw={700} size="xl">
                  Measuring...
                </Text>
              </Group>
            ) : // biome-ignore lint/style/noNestedTernary: exists as example
            fcp ? (
              <Group>
                <Text fw={700} size="xl">
                  {fcp}ms
                </Text>
                {rating && (
                  <Badge color={rating.color} variant="light">
                    {rating.text}
                  </Badge>
                )}
              </Group>
            ) : (
              <Text c="dimmed" fw={700} size="xl">
                Unable to measure
              </Text>
            )}

            {fcp && <Progress color={rating?.color} mt="xs" size="sm" value={getProgress(fcp)} />}
          </Stack>
        </Card>

        <Stack gap="xs">
          <Text fw={600} size="sm">
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
