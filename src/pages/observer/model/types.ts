export type NewsCategory = 'sports' | 'technology' | 'politics' | 'entertainment';

export interface NotificationData {
  category?: NewsCategory;
  message: string;
  timestamp: Date;
  type: 'news' | 'system' | 'alert';
}

export interface NewsItem {
  category: NewsCategory;
  content: string;
  id: string;
  timestamp: Date;
  title: string;
}

export interface Publisher<T = unknown> {
  notify(data: T): void;
  subscribe(subscriber: Subscriber<T>): void;
  unsubscribe(subscriberId: string): void;
}

export interface Subscriber<T = unknown> {
  id: string;
  update(data: T): void;
}

export interface User {
  email: string;
  id: string;
  name: string;
  preferences: {
    categories: Set<NewsCategory>;
    notifications: boolean;
  };
}

