import {
  Alert,
  Container,
  List,
  Loader,
  Paper,
  rem,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useFetch } from '@mantine/hooks';
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons-react';
import { Choose, If, Otherwise, useThemeColorContext } from '@/shared';
import { Post } from '../model';

export const Example = () => {
  const { primaryColor } = useThemeColorContext();
  const {
    data: posts,
    loading,
    error,
  } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5');

  return (
    <>
      {loading && (
        <Container
          mt="xl"
          size="sm"
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minHeight: '200px',
          }}
        >
          <Stack align="center" gap="md">
            <Loader color={primaryColor} size="xl" type="bars" />
            <Text c="dimmed" size="lg">
              Loading posts...
            </Text>
          </Stack>
        </Container>
      )}

      {error && (
        <Container mt="xl" size="sm">
          <Alert color="red" icon={<IconAlertCircle size="1rem" />} title="Error!" variant="light">
            Failed to fetch posts: {String(error)}
          </Alert>
        </Container>
      )}

      <If condition={!(loading || error)}>
        <Choose>
          <If condition={!!posts?.length}>
            <Paper p="md" shadow="xs" withBorder>
              <Title mb="sm" order={4} ta="center">
                Fetched Posts:
              </Title>
              <List
                center
                icon={
                  <ThemeIcon color="teal" radius="xl" size={24}>
                    <IconCircleCheck style={{ height: rem(16), width: rem(16) }} />
                  </ThemeIcon>
                }
                spacing="xs"
              >
                {posts?.map((post) => (
                  <List.Item key={post.id}>{post.title}</List.Item>
                ))}
              </List>
            </Paper>
          </If>
          <Otherwise>
            <Container mt="xl" size="sm">
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
