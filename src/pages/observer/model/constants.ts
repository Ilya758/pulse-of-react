import { NewsCategory, User } from './types';

export const OBSERVER_PATTERN_SIGNATURE = `// Observer Pattern Signature
interface Subscriber<T> {
  update(data: T): void;
  id: string;
}

interface Publisher<T> {
  subscribe(subscriber: Subscriber<T>): void;
  unsubscribe(subscriberId: string): void;
  notify(data: T): void;
}

// Concrete Publisher
class NewsPublisher implements Publisher<NewsItem> {
  private subscribers: Subscriber<NewsItem>[] = [];

  subscribe(subscriber: Subscriber<NewsItem>): void {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriberId: string): void {
    this.subscribers = this.subscribers.filter(sub => sub.id !== subscriberId);
  }

  notify(data: NewsItem): void {
    this.subscribers.forEach(subscriber => subscriber.update(data));
  }
}

// Concrete Subscriber with optimized category lookup
class NewsSubscriber implements Subscriber<NewsItem> {
  constructor(public id: string, private user: User) {}

  update(news: NewsItem): void {
    // Using Set for O(1) lookup instead of array.includes() O(n)
    if (this.user.preferences.categories.has(news.category)) {
      // Handle the news update
      console.log(\`User \${this.user.name} received: \${news.title}\`);
    }
  }
}`;

export const NEWS_PUBLISHER_CODE = `import { Publisher, Subscriber, NewsItem } from '../model/types';

export class NewsPublisher implements Publisher<NewsItem> {
  private subscribers: Subscriber<NewsItem>[] = [];

  subscribe(subscriber: Subscriber<NewsItem>): void {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriberId: string): void {
    this.subscribers = this.subscribers.filter(sub => sub.id !== subscriberId);
  }

  notify(data: NewsItem): void {
    this.subscribers.forEach(subscriber => subscriber.update(data));
  }

  // Helper method to add news
  addNews(news: Omit<NewsItem, 'id' | 'timestamp'>): void {
    const newsItem: NewsItem = {
      ...news,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    this.notify(newsItem);
  }

  // Get current subscriber count
  getSubscriberCount(): number {
    return this.subscribers.length;
  }
}`;

export const NEWS_OBSERVER_CODE = `import { Subscriber, NewsItem, User, NotificationData } from '../model/types';

export class NewsSubscriber implements Subscriber<NewsItem> {
  constructor(public id: string, private user: User) {}

  update(news: NewsItem): void {
    if (this.user.preferences.categories.has(news.category)) {
      // Create notification data
      const notification: NotificationData = {
        type: 'news',
        message: \`New \${news.category} news: \${news.title}\`,
        timestamp: new Date(),
        category: news.category,
      };

      // In a real app, this would trigger a notification
      console.log(\`User \${this.user.name} received: \${notification.message}\`);
      
      // You could also update UI state here
      this.handleNotification(notification);
    }
  }

  private handleNotification(notification: NotificationData): void {
    // Handle the notification (e.g., show toast, update UI, etc.)
    if (this.user.preferences.notifications) {
      // Show notification to user
      this.showNotification(notification);
    }
  }

  private showNotification(notification: NotificationData): void {
    // Implementation would depend on your notification system
    // This could be a toast, modal, or any other UI element
  }
}`;

export const NOTIFICATION_OBSERVER_CODE = `import { Subscriber, NotificationData } from '../model/types';

export class NotificationSubscriber implements Subscriber<NotificationData> {
  constructor(public id: string, private onNotification: (data: NotificationData) => void) {}

  update(data: NotificationData): void {
    this.onNotification(data);
  }
}`;

export const EXAMPLE_USAGE_CODE = `import { useState, useEffect, useCallback } from 'react';
import { NewsPublisher } from './news-publisher';
import { NewsSubscriber } from './news-subscriber';
import { NotificationSubscriber } from './notification-subscriber';
import { User, NewsItem, NotificationData } from '../model/types';

export const useNewsSystem = () => {
  const [newsPublisher] = useState(() => new NewsPublisher());
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      preferences: {
        categories: new Set(['technology', 'sports']),
        notifications: true,
      },
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      preferences: {
        categories: new Set(['politics', 'entertainment']),
        notifications: false,
      },
    },
  ]);

  const [subscribers, setSubscribers] = useState<Map<string, any>>(new Map());

  // Initialize subscribers
  useEffect(() => {
    const newSubscribers = new Map();

    // Create news subscribers for each user
    users.forEach(user => {
      const newsSubscriber = new NewsSubscriber(\`news-\${user.id}\`, user);
      newsPublisher.subscribe(newsSubscriber);
      newSubscribers.set(newsSubscriber.id, newsSubscriber);
    });

    // Create notification subscriber
    const notificationSubscriber = new NotificationSubscriber(
      'notification-subscriber',
      (data: NotificationData) => {
        setNotifications(prev => [...prev, data]);
      }
    );
    newsPublisher.subscribe(notificationSubscriber);
    newSubscribers.set(notificationSubscriber.id, notificationSubscriber);

    setSubscribers(newSubscribers);

    // Cleanup
    return () => {
      newSubscribers.forEach(subscriber => {
        newsPublisher.unsubscribe(subscriber.id);
      });
    };
  }, [users, newsPublisher]);

  const addNews = useCallback((news: Omit<NewsItem, 'id' | 'timestamp'>) => {
    newsPublisher.addNews(news);
  }, [newsPublisher]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    addNews,
    notifications,
    clearNotifications,
    subscriberCount: newsPublisher.getSubscriberCount(),
    users,
  };
};`;

export const EXAMPLE_COMPONENT_CODE = `import { useState } from 'react';
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
  Alert,
  ActionIcon,
  ScrollArea,
} from '@mantine/core';
import { IconBell, IconX, IconPlus } from '@tabler/icons-react';
import { useNewsSystem } from './use-news-system';
import { NewsCategory } from '../model/types';

export const NewsSystemExample = () => {
  const { addNews, notifications, clearNotifications, subscriberCount, users } = useNewsSystem();
  const [newNews, setNewNews] = useState({
    title: '',
    content: '',
    category: 'technology' as NewsCategory,
  });

  const handleAddNews = () => {
    if (newNews.title && newNews.content) {
      addNews(newNews);
      setNewNews({ title: '', content: '', category: 'technology' });
    }
  };

  const categories: { value: NewsCategory; label: string }[] = [
    { value: 'technology', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'politics', label: 'Politics' },
    { value: 'entertainment', label: 'Entertainment' },
  ];

  return (
    <Stack gap="xl">
      <div>
        <Title order={3} mb="xs">
          News Notification System
        </Title>
        <Text size="sm" c="dimmed">
          This example demonstrates the Observer pattern with a news notification system. 
          Users subscribe to news categories and receive notifications when relevant news is published.
        </Text>
      </div>

      <Paper shadow="xs" p="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={4}>Add News</Title>
            <Badge>Subscribers: {subscriberCount}</Badge>
          </Group>
          
          <TextInput
            label="News Title"
            placeholder="Enter news title"
            value={newNews.title}
            onChange={(e) => setNewNews(prev => ({ ...prev, title: e.target.value }))}
          />
          
          <Select
            label="Category"
            data={categories}
            value={newNews.category}
            onChange={(value) => setNewNews(prev => ({ ...prev, category: value as NewsCategory }))}
          />
          
          <Textarea
            label="Content"
            placeholder="Enter news content"
            value={newNews.content}
            onChange={(e) => setNewNews(prev => ({ ...prev, content: e.target.value }))}
            minRows={3}
          />
          
          <Button onClick={handleAddNews} leftSection={<IconPlus size={16} />}>
            Publish News
          </Button>
        </Stack>
      </Paper>

      <Paper shadow="xs" p="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Notifications</Title>
          <Button variant="subtle" size="sm" onClick={clearNotifications}>
            Clear All
          </Button>
        </Group>
        
        <ScrollArea h={300}>
          <Stack gap="sm">
            {notifications.length === 0 ? (
              <Text c="dimmed" ta="center" py="xl">
                No notifications yet. Add some news to see the Observer pattern in action!
              </Text>
            ) : (
              notifications.map((notification, index) => (
                <Alert
                  key={index}
                  icon={<IconBell size={16} />}
                  title={notification.type.toUpperCase()}
                  color={notification.type === 'alert' ? 'red' : 'blue'}
                  variant="light"
                >
                  <Text size="sm">{notification.message}</Text>
                  <Text size="xs" c="dimmed" mt="xs">
                    {notification.timestamp.toLocaleTimeString()}
                  </Text>
                </Alert>
              ))
            )}
          </Stack>
        </ScrollArea>
      </Paper>

      <Paper shadow="xs" p="md" withBorder>
        <Title order={4} mb="md">User Preferences</Title>
        <Stack gap="sm">
          {users.map(user => (
            <Group key={user.id} justify="space-between">
              <div>
                <Text fw={500}>{user.name}</Text>
                <Text size="sm" c="dimmed">
                  Categories: {user.preferences.categories.join(', ')}
                </Text>
              </div>
              <Badge color={user.preferences.notifications ? 'green' : 'gray'}>
                {user.preferences.notifications ? 'Notifications ON' : 'Notifications OFF'}
              </Badge>
            </Group>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};`;

export const CATEGORIES: { value: NewsCategory; label: string }[] = [
  { value: 'technology', label: 'Technology' },
  { value: 'sports', label: 'Sports' },
  { value: 'politics', label: 'Politics' },
  { value: 'entertainment', label: 'Entertainment' },
];

export const USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    preferences: {
      categories: new Set(['technology', 'sports']),
      notifications: true,
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    preferences: {
      categories: new Set(['politics', 'entertainment']),
      notifications: false,
    },
  },
];
