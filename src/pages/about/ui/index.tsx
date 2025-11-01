import {
  Anchor,
  Avatar,
  Container,
  Group,
  Paper,
  Skeleton,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { useImageLoader, useThemeColorContext } from '@/shared';
import authorPic from '/assets/author.jpg';

export const AboutPage = () => {
  const { isLoading: imageLoading, hasError: imageError } = useImageLoader(authorPic);
  const { primaryColor } = useThemeColorContext();
  const { colors } = useMantineTheme();
  const color = colors[primaryColor]?.[6];

  return (
    <Container py="lg" size="md">
      <Paper p="xl" radius="md" shadow="xs" withBorder>
        <Group justify="center" mb="xl">
          {imageLoading && <Skeleton height={150} radius="50%" width={150} />}
          {!(imageLoading || imageError) && (
            <Avatar alt="Author's Name" radius="50%" size={150} src={authorPic} />
          )}
          {!imageLoading && imageError && <Skeleton height={150} radius="50%" width={150} />}
        </Group>
        <Title mb="sm" order={1} ta="center">
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

        <Title mb="md" order={3}>
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
