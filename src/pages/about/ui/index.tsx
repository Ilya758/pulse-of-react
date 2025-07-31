import {
  Container,
  Title,
  Text,
  Paper,
  Avatar,
  Group,
  Anchor,
  Skeleton,
  useMantineTheme,
} from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { useImageLoader } from '@/shared';

import authorPic from '/assets/author.jpg';
import { useThemeColorContext } from '@/shared';

export const AboutPage = () => {
  const { isLoading: imageLoading, hasError: imageError } = useImageLoader(authorPic);
  const { primaryColor } = useThemeColorContext();
  const { colors } = useMantineTheme();
  const color = colors[primaryColor]?.[6];

  return (
    <Container size="md" py="lg">
      <Paper shadow="xs" p="xl" radius="md" withBorder>
        <Group justify="center" mb="xl">
          {imageLoading && <Skeleton height={150} width={150} radius="50%" />}
          {!imageLoading && !imageError && (
            <Avatar src={authorPic} alt="Author's Name" size={150} radius="50%" />
          )}
          {!imageLoading && imageError && <Skeleton height={150} width={150} radius="50%" />}
        </Group>
        <Title order={1} ta="center" mb="sm">
          About the Author
        </Title>

        <Text fz="lg" mb="md">
          Hello! I'm Illia, the "Pulse-Of-React" creator.
        </Text>
        <Text mb="md">
          I'm deeply passionate about web development — from crafting algorithmic solutions and
          building complex, scalable architectures to applying critical optimizations and sharing
          knowledge with the developer community. This project was born out of a desire to give back
          and share the experience I've gained over the years.
        </Text>
        <Text mb="lg">
          Truth be told, I don't see myself just as a developer — I'm a software engineer. My drive
          comes from building tailor-made, high-performance, and scalable solutions that stand the
          test of time.
        </Text>

        <Title order={3} mb="md">
          Connect with Me
        </Title>
        <Group gap="lg">
          <Anchor c={color} href="https://github.com/Ilya758" target="_blank" underline="hover">
            <Group gap="xs">
              <IconBrandGithub stroke={1.5} />
              <Text>GitHub</Text>
            </Group>
          </Anchor>
          <Anchor
            c={color}
            href="https://www.linkedin.com/in/illia-skaryna/"
            target="_blank"
            underline="hover"
          >
            <Group gap="xs">
              <IconBrandLinkedin stroke={1.5} />
              <Text c={color}>LinkedIn</Text>
            </Group>
          </Anchor>
        </Group>
      </Paper>
    </Container>
  );
};

