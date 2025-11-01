import { Container, Group, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconBook, IconFolderOpen, IconGauge, IconMapSearch, IconTools } from '@tabler/icons-react';
import { useThemeColorContext } from '@/shared';

export const HomePage = () => {
  const { primaryColor } = useThemeColorContext();

  return (
    <Container mx="auto" py="xl" size="lg">
      <Paper p="xl" radius="md" shadow="md" withBorder>
        <Title mb="lg" order={1} ta="center">
          Welcome to Pulse-Of-React!
        </Title>
        <Text fz="lg" mb="xl" ta="center">
          Your finger on the beat of modern React development. Explore essential concepts, ecosystem
          trends, and practical design patterns.
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mb="xl" spacing="xl">
          <Paper p="lg" radius="md" shadow="xs" withBorder>
            <Group>
              <ThemeIcon color={primaryColor} radius="md" size="xl" variant="light">
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
          <Paper p="lg" radius="md" shadow="xs" withBorder>
            <Group>
              <ThemeIcon color={primaryColor} radius="md" size="xl" variant="light">
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

        <Title mb="lg" mt="xl" order={2} ta="center">
          Inside This Project
        </Title>

        <SimpleGrid cols={{ base: 1, md: 3 }} mb="xl" spacing="lg">
          <Stack>
            <Group>
              <ThemeIcon color={primaryColor} radius="md" size="lg" variant="light">
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
              <ThemeIcon color={primaryColor} radius="md" size="lg" variant="light">
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
              <ThemeIcon color={primaryColor} radius="md" size="lg" variant="light">
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
