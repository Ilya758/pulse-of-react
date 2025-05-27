import {
  Container,
  Title,
  Text,
  Paper,
  SimpleGrid,
  ThemeIcon,
  Stack,
  Button,
  Group,
} from '@mantine/core';
import {
  IconRocket,
  IconBook,
  IconPuzzle,
  IconFolderOpen,
  IconTools,
  IconGauge,
  IconMapSearch,
  IconShare3,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
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
              <ThemeIcon variant="light" size="xl" radius="md" color="indigo">
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
              <ThemeIcon variant="light" size="xl" radius="md" color="indigo">
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
              <ThemeIcon variant="light" size="lg" radius="md" color="indigo">
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
              <ThemeIcon variant="light" size="lg" radius="md" color="indigo">
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
              <ThemeIcon variant="light" size="lg" radius="md" color="indigo">
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

        <Title order={2} ta="center" mb="lg" mt="xl">
          Explore Patterns
        </Title>
        <Text ta="center" mb="xl">
          Dive deep into a curated collection of React design patterns. These practical examples
          reflect current best practices and will help you build cutting-edge applications.
        </Text>
        <Group justify="center">
          <Button
            component={Link}
            to="/state-management"
            size="lg"
            leftSection={<IconRocket size="1.2rem" />}
            color="indigo"
          >
            State Management
          </Button>
          <Button
            component={Link}
            to="/hooks"
            variant="outline"
            size="lg"
            leftSection={<IconPuzzle size="1.2rem" />}
            color="indigo"
          >
            Hooks Examples
          </Button>
          <Button
            component={Link}
            to="/render-props"
            size="lg"
            leftSection={<IconShare3 size="1.2rem" />}
            color="indigo"
          >
            Render Props
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

