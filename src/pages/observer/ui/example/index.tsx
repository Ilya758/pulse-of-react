import { useCallback, useState } from 'react';
import {
  Stack,
  Title,
  Text,
  Button,
  Group,
  Paper,
  Badge,
  Textarea,
  Select,
  TextInput,
  Switch,
  MultiSelect,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useNewsSystem, CATEGORIES, NewsCategory, NewsItem } from '../../model';

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
      setNewNews({ title: '', content: '', category: 'technology' });
    }
  }, [newNews, addNews]);

  return (
    <Stack gap="xl">
      <div>
        <Title order={3} mb="xs">
          News Notification System
        </Title>
        <Text size="sm" c="dimmed">
          This example demonstrates the Observer pattern with a news notification system. Users
          subscribe to news categories and receive real-time notifications when relevant news is
          published.
        </Text>
      </div>

      <Paper shadow="xs" p="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={4}>Add News</Title>
            <Badge>Total Subscribers: {subscriberCount}</Badge>
          </Group>
          <Text size="xs" c="dimmed">
            Subscribers: 2 user subscribers + 1 notification subscriber = {subscriberCount} total
          </Text>

          <TextInput
            label="News Title"
            placeholder="Enter news title"
            value={newNews.title}
            onChange={(e) => setNewNews((prev) => ({ ...prev, title: e.target.value }))}
          />

          <Select
            label="Category"
            data={CATEGORIES}
            value={newNews.category}
            onChange={(value) =>
              setNewNews((prev) => ({ ...prev, category: value as NewsCategory }))
            }
          />

          <Textarea
            label="Content"
            placeholder="Enter news content"
            value={newNews.content}
            onChange={(e) => setNewNews((prev) => ({ ...prev, content: e.target.value }))}
            minRows={3}
          />

          <Button
            onClick={handleAddNews}
            leftSection={<IconPlus size={16} />}
            disabled={!newNews.title.trim() || !newNews.content.trim()}
          >
            Publish News
          </Button>
          {(!newNews.title.trim() || !newNews.content.trim()) && (
            <Text size="xs" c="dimmed" ta="center">
              {!newNews.title.trim() &&
                !newNews.content.trim() &&
                'Please enter both title and content'}
            </Text>
          )}
        </Stack>
      </Paper>

      <Paper shadow="xs" p="md" withBorder>
        <Title order={4} mb="md">
          Subscriber Configuration
        </Title>
        <Text size="sm" c="dimmed" mb="md">
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
                    label="Enable notifications"
                    checked={user.preferences.notifications}
                    onChange={(event) =>
                      toggleUserNotifications({
                        userId: user.id,
                        enabled: event.currentTarget.checked,
                      })
                    }
                    size="sm"
                  />
                </Group>
                <MultiSelect
                  label="Subscribed Categories"
                  placeholder="Select categories"
                  data={CATEGORIES}
                  value={Array.from(user.preferences.categories)}
                  onChange={(value) =>
                    updateUserCategories({
                      userId: user.id,
                      categories: value as NewsCategory[],
                    })
                  }
                  size="sm"
                  searchable
                  clearable
                />
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

