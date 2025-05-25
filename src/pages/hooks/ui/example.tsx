import {
  Container,
  Stack,
  Loader,
  Alert,
  Paper,
  Title,
  List,
  ThemeIcon,
  rem,
  Text,
} from '@mantine/core';
import { useFetch } from '@mantine/hooks';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';
import { Post } from '../model';
import { Choose, If, Otherwise } from '@/shared';

export const Example = () => {
  const {
    data: posts,
    loading,
    error,
  } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5');

  return (
    <>
      {loading && (
        <Container
          size="sm"
          mt="xl"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
          }}
        >
          <Stack align="center" gap="md">
            <Loader color="indigo" size="xl" type="bars" />
            <Text size="lg" c="dimmed">
              Loading posts...
            </Text>
          </Stack>
        </Container>
      )}

      {error && (
        <Container size="sm" mt="xl">
          <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="red" variant="light">
            Failed to fetch posts: {String(error)}
          </Alert>
        </Container>
      )}

      <If condition={!loading && !error}>
        <Choose>
          <If condition={!!posts?.length}>
            <Paper shadow="xs" p="md" withBorder>
              <Title order={4} ta="center" mb="sm">
                Fetched Posts:
              </Title>
              <List
                spacing="xs"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                {posts?.map((post) => (
                  <List.Item key={post.id}>{post.title}</List.Item>
                ))}
              </List>
            </Paper>
          </If>
          <Otherwise>
            <Container size="sm" mt="xl">
              <Text c="dimmed" ta="center">
                No posts found for the example.
              </Text>
            </Container>
          </Otherwise>
        </Choose>
      </If>
    </>
  );
};

