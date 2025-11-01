import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Text } from '@mantine/core';
import { ThemeControllerFacade } from './theme-controller-facade';

const THEME_CONTROLLER_FACADE_CODE = `import { Card, Title, Text, Group, ColorSwatch, Stack } from '@mantine/core';
import { useThemeColorContext } from '@/shared';
import { COLOR_NAMES } from '../../model';

export function ThemeControllerFacade() {
  const { primaryColor, setPrimaryColor } = useThemeColorContext();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={5} mb="xs">
        ThemeControllerFacade
      </Title>
      <Text size="sm" c="dimmed" mb="md">
        This component acts as a Facade for Mantine's color scheme and theme system, exposing a
        simple interface for picking a primary color. The color picker below updates the global app
        theme.
      </Text>
      <Stack gap="md">
        <Group>
          <Text>Primary color:</Text>
          <ColorSwatch color={\`var(--mantine-color-\${primaryColor}-6)\`} />
        </Group>
        <Group>
          {COLOR_NAMES.map((color) => (
            <ColorSwatch
              key={color}
              color={\`var(--mantine-color-\${color}-6)\`}
              onClick={() => setPrimaryColor(color)}
              style={{
                cursor: 'pointer',
                border: primaryColor === color ? '2px solid #000' : undefined,
              }}
              title={color}
            />
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
`;

export const Example = () => (
  <>
    <Text mb="md">
      This example demonstrates how to use the Facade pattern to wrap Mantine's color scheme and
      theme system, exposing a simple interface for toggling dark/light mode and picking a primary
      color.
    </Text>
    <CodeHighlightTabs
      code={[
        {
          code: THEME_CONTROLLER_FACADE_CODE,
          fileName: 'ThemeControllerFacade.tsx',
          language: 'tsx',
        },
      ]}
      defaultExpanded={false}
      mb="lg"
      radius="md"
      withExpandButton
    />
    <ThemeControllerFacade />
  </>
);
