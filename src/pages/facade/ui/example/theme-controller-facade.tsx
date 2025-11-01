import { Card, ColorSwatch, Group, Stack, Text, Title } from '@mantine/core';
import { useThemeColorContext } from '@/shared';
import { COLOR_NAMES } from '../../model';

export function ThemeControllerFacade() {
  const { primaryColor, setPrimaryColor } = useThemeColorContext();

  return (
    <Card padding="lg" radius="md" shadow="sm" withBorder>
      <Title mb="xs" order={5}>
        ThemeControllerFacade
      </Title>
      <Text c="dimmed" mb="md" size="sm">
        This component acts as a Facade for Mantine's color scheme and theme system, exposing a
        simple interface for picking a primary color. The color picker below updates the global app
        theme.
      </Text>
      <Stack gap="md">
        <Group>
          <Text>Primary color:</Text>
          <ColorSwatch color={`var(--mantine-color-${primaryColor}-6)`} />
        </Group>
        <Group>
          {COLOR_NAMES.map((color) => (
            <ColorSwatch
              color={`var(--mantine-color-${color}-6)`}
              key={color}
              onClick={() => setPrimaryColor(color)}
              style={{
                border: primaryColor === color ? '2px solid #000' : undefined,
                cursor: 'pointer',
              }}
              title={color}
            />
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
