import { Button, Card, Group, Loader, Skeleton, Stack } from '@mantine/core';
import { useCallback, useRef, useState } from 'react';
import { POSTS, Post, SIMULATED_DELAY } from '../model';
import { FeedPost } from './feed-post';

type Props = {
  isOptimized: boolean;
};

export const Feed = ({ isOptimized }: Props) => {
  const postKey = useRef(0);
  const skeletonKey = useRef(0);
  const [posts, setPosts] = useState<Array<Post | { id: number }>>([
    { ...POSTS[0], id: postKey.current++ },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadPost = useCallback(() => {
    setIsLoading(true);

    if (isOptimized) {
      setPosts((prevPosts) => [{ id: skeletonKey.current++ }, ...prevPosts]);
    }

    setTimeout(() => {
      const loadedCount = posts.filter((p) => 'name' in p).length;
      const template = POSTS[loadedCount % POSTS.length] ?? POSTS[0];
      const nextPost = { ...template, id: postKey.current++ };

      if (isOptimized) {
        setPosts((prevPosts) => {
          const newPosts = [...prevPosts];
          const skeletonIndex = newPosts.findIndex((item) => !('name' in item));

          if (skeletonIndex !== -1) {
            newPosts[skeletonIndex] = nextPost;
          }

          return newPosts;
        });
      } else {
        setPosts((prevPosts) => [nextPost, ...prevPosts]);
      }

      setIsLoading(false);
    }, SIMULATED_DELAY);
  }, [isOptimized, posts]);

  return (
    <Card p="lg" withBorder>
      <Stack>
        <Button disabled={isLoading} fullWidth onClick={handleLoadPost}>
          <Group gap="xs">
            {isLoading ? <Loader color="white" size="sm" /> : null}
            <span>Load new post</span>
          </Group>
        </Button>
        {posts.map((post) =>
          post && 'name' in post ? (
            <FeedPost key={post.id} post={post as Post} />
          ) : (
            <Skeleton h={80} key={post?.id} />
          ),
        )}
      </Stack>
    </Card>
  );
};
