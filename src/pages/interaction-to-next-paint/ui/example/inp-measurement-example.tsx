import {
  Alert,
  Badge,
  Button,
  Card,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { IconClock, IconHandClick, IconInfoCircle, IconRefresh } from '@tabler/icons-react';
import {
  INP_RATING_COLORS,
  INP_RATING_TEXT,
  INP_STATUS_COLORS,
  INP_STATUS_TEXT,
  useINPMeasurement,
} from '../../model';

const getProgress = (value: number) => {
  const percentage = Math.min((value / 1000) * 100, 100);

  return percentage;
};

const formatTime = (timestamp: number | null) => {
  if (!timestamp) {
    return 'N/A';
  }

  const date = new Date(timestamp);

  return date.toLocaleTimeString();
};

const getStatusColor = (isMeasuring: boolean, inp: number | null) => {
  if (isMeasuring) {
    return INP_STATUS_COLORS.listening;
  }
  if (inp !== null) {
    return INP_STATUS_COLORS.complete;
  }
  return INP_STATUS_COLORS.waiting;
};

export const INPMeasurementExample = () => {
  const { inp, interactionCount, isMeasuring, lastInteractionTime, rating, simulateInteraction } =
    useINPMeasurement();

  return (
    <Card p="lg" radius="md" shadow="sm" withBorder>
      <Stack gap="md">
        <Group>
          <IconHandClick size={20} />
          <Text fw={700} size="lg">
            Interaction to Next Paint Measurement
          </Text>
        </Group>

        <Alert color="blue" icon={<IconInfoCircle size="16" />}>
          <Text size="sm">
            This example measures the Interaction to Next Paint (INP) of the current page. INP
            measures the latency of all user interactions throughout the page lifecycle, reporting
            the worst interaction. Good INP should be ≤ 200ms.
          </Text>
        </Alert>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <Card bg="gray.0" p="md" withBorder>
            <Stack gap="sm">
              <Group>
                <IconClock size={16} />
                <Text c="dimmed" size="sm">
                  Current INP Value
                </Text>
              </Group>

              {isMeasuring && (
                <Group>
                  <Text fw={700} size="xl">
                    Measuring...
                  </Text>
                  <Badge color="blue" variant="light">
                    Active
                  </Badge>
                </Group>
              )}

              {!isMeasuring && inp !== null && (
                <Group>
                  <Text fw={700} size="xl">
                    {inp}ms
                  </Text>
                  {rating && (
                    <Badge color={INP_RATING_COLORS[rating]} variant="light">
                      {INP_RATING_TEXT[rating]}
                    </Badge>
                  )}
                </Group>
              )}

              {!isMeasuring && inp === null && (
                <Text c="dimmed" fw={700} size="xl">
                  No interactions yet
                </Text>
              )}

              {inp !== null && (
                <Progress
                  color={rating ? INP_RATING_COLORS[rating] : 'gray'}
                  mt="xs"
                  size="sm"
                  value={getProgress(inp)}
                />
              )}
            </Stack>
          </Card>

          <Card bg="gray.0" p="md" withBorder>
            <Stack gap="sm">
              <Text c="dimmed" size="sm">
                Interaction Statistics
              </Text>

              <Group justify="space-between">
                <Text size="sm">Total Interactions:</Text>
                <Badge size="sm" variant="outline">
                  {interactionCount}
                </Badge>
              </Group>

              <Group justify="space-between">
                <Text size="sm">Last Interaction:</Text>
                <Text c="dimmed" size="sm">
                  {formatTime(lastInteractionTime)}
                </Text>
              </Group>

              <Group justify="space-between">
                <Text size="sm">Status:</Text>
                <Badge color={getStatusColor(isMeasuring, inp)} size="sm" variant="light">
                  {isMeasuring && INP_STATUS_TEXT.listening}
                  {!isMeasuring && inp !== null && INP_STATUS_TEXT.complete}
                  {!isMeasuring && inp === null && INP_STATUS_TEXT.waiting}
                </Badge>
              </Group>
            </Stack>
          </Card>
        </SimpleGrid>

        <Card bg="blue.0" p="md" withBorder>
          <Stack gap="sm">
            <Text fw={600} size="sm">
              Test Interactions
            </Text>
            <Text c="dimmed" size="sm">
              Click the buttons below to simulate user interactions and see how they affect INP:
            </Text>
            <Group>
              <Button onClick={() => simulateInteraction(50)} size="sm" variant="light">
                Quick Click (50ms)
              </Button>
              <Button
                color="yellow"
                onClick={() => simulateInteraction(250)}
                size="sm"
                variant="light"
              >
                Medium Task (250ms)
              </Button>
              <Button
                color="red"
                onClick={() => simulateInteraction(600)}
                size="sm"
                variant="light"
              >
                Heavy Task (600ms)
              </Button>
              <Button
                leftSection={<IconRefresh size={14} />}
                onClick={() => simulateInteraction()}
                size="sm"
                variant="outline"
              >
                Simulate Random
              </Button>
            </Group>
          </Stack>
        </Card>

        <Alert color="gray" icon={<IconInfoCircle size="16" />}>
          <Text size="sm">
            <Text fw={700} span>
              Tip:
            </Text>{' '}
            Interact with different elements on this page (buttons, links, form inputs) to see real
            INP measurements. The measurement captures the worst interaction latency over time.
          </Text>
        </Alert>
      </Stack>
    </Card>
  );
};
