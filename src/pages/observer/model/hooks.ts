import { notifications } from '@mantine/notifications';
import { useCallback, useEffect, useState } from 'react';
import { USERS } from './constants';
import { NewsPublisher } from './publishers';
import { NewsSubscriber, NotificationSubscriber } from './subscribers';
import { NewsCategory, NewsItem, NotificationData, User } from './types';

export const useNewsSystem = () => {
  const [newsPublisher] = useState(() => new NewsPublisher());
  const [users, setUsers] = useState<User[]>(USERS);

  const addNews = useCallback(
    (news: Omit<NewsItem, 'id' | 'timestamp'>) => {
      newsPublisher.addNews(news);
    },
    [newsPublisher],
  );

  const toggleUserNotifications = useCallback(
    ({ userId, enabled }: { userId: string; enabled: boolean }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, preferences: { ...user.preferences, notifications: enabled } }
            : user,
        ),
      );
    },
    [],
  );

  const updateUserCategories = useCallback(
    ({ userId, categories }: { userId: string; categories: NewsCategory[] }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, preferences: { ...user.preferences, categories: new Set(categories) } }
            : user,
        ),
      );
    },
    [],
  );

  useEffect(() => {
    users.forEach((user) => {
      newsPublisher.subscribe(new NewsSubscriber(`news-${user.id}`, user));
    });

    newsPublisher.subscribe(
      new NotificationSubscriber('notification-subscriber', users, (data: NotificationData) => {
        notifications.show({
          autoClose: 5000,
          color: data.message.includes('Notified:') ? 'blue' : 'gray',
          id: `news-${Date.now()}`,
          message: data.message,
          title: `New ${data.category} news published!`,
        });
      }),
    );

    return () => {
      newsPublisher.clearSubscribers();
    };
  }, [users, newsPublisher]);

  return {
    addNews,
    subscriberCount: newsPublisher.getSubscriberCount(),
    toggleUserNotifications,
    updateUserCategories,
    users,
  };
};
