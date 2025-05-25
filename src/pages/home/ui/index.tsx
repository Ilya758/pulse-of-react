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
  IconCode,
  IconFolderOpen,
  IconTools,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <Container size="lg" py="xl">
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Title order={1} ta="center" mb="lg">
          Welcome to React Design Patterns!
        </Title>
        <Text fz="lg" ta="center" mb="xl">
          A curated collection of React design patterns, explained with practical examples to help
          you build robust and maintainable applications.
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mb="xl">
          <Paper p="lg" shadow="xs" withBorder radius="md">
            <Group>
              <ThemeIcon variant="light" size="xl" radius="md" color="indigo">
                <IconBook size="1.5rem" />
              </ThemeIcon>
              <Title order={3}>Why Design Patterns?</Title>
            </Group>
            <Text mt="md">
              Design patterns are reusable solutions to commonly occurring problems within a given
              context. In React, they help in creating scalable, maintainable, and efficient
              component architectures, managing state effectively, and improving code readability.
            </Text>
          </Paper>
          <Paper p="lg" shadow="xs" withBorder radius="md">
            <Group>
              <ThemeIcon variant="light" size="xl" radius="md" color="indigo">
                <IconPuzzle size="1.5rem" />
              </ThemeIcon>
              <Title order={3}>What You'll Find</Title>
            </Group>
            <Text mt="md">
              Explore a variety of patterns including state management solutions (like
              `useReducer`), component composition techniques, custom hook implementations, and
              more. Each pattern is demonstrated with clear code examples and explanations.
            </Text>
          </Paper>
        </SimpleGrid>

        <Title order={2} ta="center" mb="lg" mt="xl">
          Project Insights
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
              modularity and scalability. You'll find code organized into `pages`, `widgets`,
              `features`, `entities`, and `shared` layers.
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
              Built with React, TypeScript, Vite for fast development, Mantine for a rich UI
              component library, and Highlight.js for code highlighting.
            </Text>
          </Stack>
          <Stack>
            <Group>
              <ThemeIcon variant="light" size="lg" radius="md" color="indigo">
                <IconCode size="1.2rem" />
              </ThemeIcon>
              <Title order={4}>Key Features</Title>
            </Group>
            <Text size="sm">
              Includes dynamic theme toggling (light/dark modes), responsive layout, and clear
              navigation to explore different design pattern examples.
            </Text>
          </Stack>
        </SimpleGrid>

        <Title order={2} ta="center" mb="lg" mt="xl">
          Explore Patterns
        </Title>
        <Text ta="center" mb="xl">
          Dive into the examples and see these patterns in action.
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
        </Group>
      </Paper>
    </Container>
  );
};

