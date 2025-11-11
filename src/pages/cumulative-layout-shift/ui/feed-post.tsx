import { Avatar, Box, Group, Paper, Text } from '@mantine/core';
import { Post } from '../model';

type Props = {
  post: Post;
};

export const FeedPost = ({ post }: Props) => (
  <Paper p="md" withBorder>
    <Group>
      <Avatar alt={post.name} radius="xl" src={post.avatar} />
      <Box>
        <Text fw={500}>{post.name}</Text>
        <Text size="sm">{post.text}</Text>
      </Box>
    </Group>
  </Paper>
);
