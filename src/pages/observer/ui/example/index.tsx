import {
  Badge,
  Button,
  Group,
  MultiSelect,
  Paper,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { CATEGORIES, NewsCategory, NewsItem, useNewsSystem } from '../../model';

export const Example = () => {
  const { addNews, subscriberCount, users, toggleUserNotifications, updateUserCategories } =
    useNewsSystem();
  const [newNews, setNewNews] = useState<Omit<NewsItem, 'id' | 'timestamp'>>({
    category: 'technology',
    content: '',
    title: '',
  });

  const handleAddNews = useCallback(() => {
    if (newNews.title && newNews.content) {
      addNews(newNews);
      setNewNews({ category: 'technology', content: '', title: '' });
    }
  }, [newNews, addNews]);

  return (
    <Stack gap="xl">
      <div>
        <Title mb="xs" order={3}>
          News Notification System
        </Title>
        <Text c="dimmed" size="sm">
          This example demonstrates the Observer pattern with a news notification system. Users
          subscribe to news categories and receive real-time notifications when relevant news is
          published.
        </Text>
      </div>

      <Paper p="md" shadow="xs" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={4}>Add News</Title>
            <Badge>Total Subscribers: {subscriberCount}</Badge>
          </Group>
          <Text c="dimmed" size="xs">
            Subscribers: 2 user subscribers + 1 notification subscriber = {subscriberCount} total
          </Text>

          <TextInput
            label="News Title"
            onChange={(e) => setNewNews((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Enter news title"
            value={newNews.title}
          />

          <Select
            data={CATEGORIES}
            label="Category"
            onChange={(value) =>
              setNewNews((prev) => ({ ...prev, category: value as NewsCategory }))
            }
            value={newNews.category}
          />

          <Textarea
            label="Content"
            minRows={3}
            onChange={(e) => setNewNews((prev) => ({ ...prev, content: e.target.value }))}
            placeholder="Enter news content"
            value={newNews.content}
          />

          <Button
            disabled={!(newNews.title.trim() && newNews.content.trim())}
            leftSection={<IconPlus size={16} />}
            onClick={handleAddNews}
          >
            Publish News
          </Button>
          {!(newNews.title.trim() && newNews.content.trim()) && (
            <Text c="dimmed" size="xs" ta="center">
              {!(newNews.title.trim() || newNews.content.trim())
                && 'Please enter both title and content'}
            </Text>
          )}
        </Stack>
      </Paper>

      <Paper p="md" shadow="xs" withBorder>
        <Title mb="md" order={4}>
          Subscriber Configuration
        </Title>
        <Text c="dimmed" mb="md" size="sm">
          This shows how different subscribers (users) are configured to receive only specific types
          of news. You can dynamically change which categories each user subscribes to and whether
          they have notifications enabled. When you publish news, only users subscribed to that
          category will receive notifications.
        </Text>
        <Stack gap="md">
          {users.map((user) => (
            <Paper key={user.id} p="sm" withBorder>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text fw={500}>{user.name}</Text>
                  <Switch
                    checked={user.preferences.notifications}
                    label="Enable notifications"
                    onChange={(event) =>
                      toggleUserNotifications({
                        enabled: event.currentTarget.checked,
                        userId: user.id,
                      })
                    }
                    size="sm"
                  />
                </Group>
                <MultiSelect
                  clearable
                  data={CATEGORIES}
                  label="Subscribed Categories"
                  onChange={(value) =>
                    updateUserCategories({
                      categories: value as NewsCategory[],
                      userId: user.id,
                    })
                  }
                  placeholder="Select categories"
                  searchable
                  size="sm"
                  value={Array.from(user.preferences.categories)}
                />
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};
