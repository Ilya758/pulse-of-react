import { useState } from 'react';
import { Paper, Button, Group, Text, Stack, Progress, Alert, Badge, Code } from '@mantine/core';
import {
  IconPhoto,
  IconClock,
  IconSpeedboat,
  IconAlertTriangle,
  IconCheck,
} from '@tabler/icons-react';
import { getRatingColor, getRatingIcon, getRatingMessage } from '../lib';
import type { LcpMetric } from '../model';

export const LcpOptimizationExample = () => {
  const [currentStrategy, setCurrentStrategy] = useState<'baseline' | 'optimized'>('baseline');
  const [lcpMetric, setLcpMetric] = useState<LcpMetric | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateLCP = async (strategy: 'baseline' | 'optimized') => {
    setIsSimulating(true);
    setLcpMetric(null);

    const baseTime = strategy === 'baseline' ? 3200 : 1200;
    const variation = strategy === 'baseline' ? 800 : 300;
    const lcpTime = baseTime + Math.random() * variation;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const rating = lcpTime < 2500 ? 'good' : lcpTime < 4000 ? 'needs-improvement' : 'poor';

    setLcpMetric({
      value: Math.round(lcpTime),
      rating,
      element: strategy === 'baseline' ? 'Large unoptimized image' : 'Optimized WebP image',
    });

    setIsSimulating(false);
  };

  return (
    <Stack gap="md">
      <Paper p="md" withBorder>
        <Group justify="space-between" mb="md">
          <Text fw={600}>LCP Optimization Simulator</Text>
          <Group gap="xs">
            <Badge color={currentStrategy === 'baseline' ? 'red' : 'green'} variant="light">
              {currentStrategy === 'baseline' ? 'Baseline' : 'Optimized'}
            </Badge>
          </Group>
        </Group>

        <Group mb="md">
          <Button
            variant={currentStrategy === 'baseline' ? 'filled' : 'outline'}
            onClick={() => setCurrentStrategy('baseline')}
            size="sm"
          >
            Baseline Strategy
          </Button>
          <Button
            variant={currentStrategy === 'optimized' ? 'filled' : 'outline'}
            onClick={() => setCurrentStrategy('optimized')}
            size="sm"
          >
            Optimized Strategy
          </Button>
        </Group>

        <Button
          onClick={() => simulateLCP(currentStrategy)}
          loading={isSimulating}
          fullWidth
          mb="md"
        >
          {isSimulating ? 'Measuring LCP...' : 'Simulate LCP Measurement'}
        </Button>

        {lcpMetric && (
          <Stack gap="sm">
            <Group justify="space-between">
              <Text size="sm" fw={500}>
                LCP Time:
              </Text>
              <Group gap="xs">
                <Text size="sm" fw={600}>
                  {lcpMetric.value}ms
                </Text>
                <Badge
                  color={getRatingColor(lcpMetric.rating)}
                  size="sm"
                  leftSection={getRatingIcon(lcpMetric.rating)}
                >
                  {lcpMetric.rating}
                </Badge>
              </Group>
            </Group>

            <Group justify="space-between">
              <Text size="sm" fw={500}>
                LCP Element:
              </Text>
              <Code>{lcpMetric.element}</Code>
            </Group>

            <Progress
              value={Math.min((lcpMetric.value / 4000) * 100, 100)}
              color={getRatingColor(lcpMetric.rating)}
              size="sm"
            />

            <Alert
              icon={
                lcpMetric.rating === 'good' ? (
                  <IconCheck size="1rem" />
                ) : (
                  <IconAlertTriangle size="1rem" />
                )
              }
              color={getRatingColor(lcpMetric.rating)}
              variant="light"
            >
              {getRatingMessage(lcpMetric.rating)}
            </Alert>
          </Stack>
        )}
      </Paper>

      <Paper p="md" withBorder>
        <Text fw={600} mb="md">
          Strategy Comparison
        </Text>

        <Stack gap="md">
          <div>
            <Group gap="xs" mb="xs">
              <IconPhoto size={16} />
              <Text fw={500} size="sm">
                Image Optimization
              </Text>
            </Group>
            <Text size="xs" c="dimmed">
              {currentStrategy === 'baseline'
                ? 'Large JPEG image (2.4MB) without optimization'
                : 'WebP image with proper dimensions (280KB) + preload'}
            </Text>
          </div>

          <div>
            <Group gap="xs" mb="xs">
              <IconClock size={16} />
              <Text fw={500} size="sm">
                Resource Loading
              </Text>
            </Group>
            <Text size="xs" c="dimmed">
              {currentStrategy === 'baseline'
                ? 'Standard loading with network delays'
                : 'Preload critical resources + priority hints'}
            </Text>
          </div>

          <div>
            <Group gap="xs" mb="xs">
              <IconSpeedboat size={16} />
              <Text fw={500} size="sm">
                Delivery Strategy
              </Text>
            </Group>
            <Text size="xs" c="dimmed">
              {currentStrategy === 'baseline'
                ? 'No CDN, no compression, no caching'
                : 'CDN delivery + Brotli compression + proper caching'}
            </Text>
          </div>
        </Stack>
      </Paper>
    </Stack>
  );
};

