import { useThemeColorContext } from '@/shared';
import { Container, Title, Text, Paper, SimpleGrid, ThemeIcon, Stack, Group } from '@mantine/core';
import { IconBook, IconFolderOpen, IconTools, IconGauge, IconMapSearch } from '@tabler/icons-react';

export const HomePage = () => {
  const { primaryColor } = useThemeColorContext();

  return (
    <Container size="lg" py="xl">
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Title order={1} ta="center" mb="lg">
          Welcome to Pulse-Of-React!
        </Title>
        <Text fz="lg" ta="center" mb="xl">
          Your finger on the beat of modern React development. Explore essential concepts, ecosystem
          trends, and practical design patterns.
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mb="xl">
          <Paper p="lg" shadow="xs" withBorder radius="md">
            <Group>
              <ThemeIcon color={primaryColor} variant="light" size="xl" radius="md">
                <IconBook size="1.5rem" />
              </ThemeIcon>
              <Title order={3}>React's Vital Signs</Title>
            </Group>
            <Text mt="md">
              Understanding the core principles and patterns that define modern, efficient React
              development. This includes how design patterns help create scalable architectures and
              manage state effectively.
            </Text>
          </Paper>
          <Paper p="lg" shadow="xs" withBorder radius="md">
            <Group>
              <ThemeIcon color={primaryColor} variant="light" size="xl" radius="md">
                <IconGauge size="1.5rem" />
              </ThemeIcon>
              <Title order={3}>Optimizing React Performance</Title>
            </Group>
            <Text mt="md">
              Discover key strategies and techniques for building high-performance React
              applications. Learn about memoization, code splitting, lazy loading, and how to
              effectively profile and optimize your components.
            </Text>
          </Paper>
        </SimpleGrid>

        <Title order={2} ta="center" mb="lg" mt="xl">
          Inside This Project
        </Title>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mb="xl">
          <Stack>
            <Group>
              <ThemeIcon color={primaryColor} variant="light" size="lg" radius="md">
                <IconFolderOpen size="1.2rem" />
              </ThemeIcon>
              <Title order={4}>Structure</Title>
            </Group>
            <Text size="sm">
              This project follows a Feature-Sliced Design (FSD) inspired architecture to promote
              modularity and scalability.
            </Text>
          </Stack>
          <Stack>
            <Group>
              <ThemeIcon color={primaryColor} variant="light" size="lg" radius="md">
                <IconTools size="1.2rem" />
              </ThemeIcon>
              <Title order={4}>Tech Stack</Title>
            </Group>
            <Text size="sm">
              Built with React, TypeScript, and Vite for fast development. Mantine provides a rich
              UI component library, enabling dynamic theming and responsive layouts. Highlight.js is
              used for code highlighting.
            </Text>
          </Stack>
          <Stack>
            <Group>
              <ThemeIcon color={primaryColor} variant="light" size="lg" radius="md">
                <IconMapSearch size="1.2rem" />
              </ThemeIcon>
              <Title order={4}>Navigating This Guide</Title>
            </Group>
            <Text size="sm">
              Each topic is presented with a clear explanation, code examples, and use cases. Use
              the navigation to jump between different topics and explore at your own pace.
            </Text>
          </Stack>
        </SimpleGrid>
      </Paper>
    </Container>
  );
};

