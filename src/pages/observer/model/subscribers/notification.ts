import { NewsItem, NotificationData, Subscriber, User } from '../types';

export class NotificationSubscriber implements Subscriber<NewsItem> {
  constructor(
    public id: string,
    private users: User[],
    private onNotification: (data: NotificationData) => void,
  ) {}

  update(news: NewsItem): void {
    const interestedUsers = this.users.filter(
      (user) => user.preferences.categories.has(news.category) && user.preferences.notifications,
    );

    if (interestedUsers.length) {
      this.onNotification({
        type: 'news',
        message: `New ${news.category} news: "${news.title}" - Notified: ${interestedUsers
          .map(({ name }) => name)
          .join(', ')}`,
        timestamp: new Date(),
        category: news.category,
      });
    } else {
      const allInterestedUsers = this.users.filter((user) =>
        user.preferences.categories.has(news.category),
      );

      if (allInterestedUsers.length > 0) {
        this.onNotification({
          type: 'news',
          message: `New ${news.category} news: "${
            news.title
          }" - No notifications sent (users ${allInterestedUsers
            .map(({ name }) => name)
            .join(', ')} have notifications disabled)`,
          timestamp: new Date(),
          category: news.category,
        });
      } else {
        this.onNotification({
          type: 'news',
          message: `New ${news.category} news: "${news.title}" - No subscribers for this category`,
          timestamp: new Date(),
          category: news.category,
        });
      }
    }
  }
}

