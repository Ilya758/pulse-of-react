import { NewsItem, Publisher, Subscriber } from '../types';

export class NewsPublisher implements Publisher<NewsItem> {
  private subscribers: Subscriber<NewsItem>[] = [];

  subscribe(subscriber: Subscriber<NewsItem>): void {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriberId: string): void {
    this.subscribers = this.subscribers.filter(({ id }) => id !== subscriberId);
  }

  notify(data: NewsItem): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.update(data);
    });
  }

  addNews(news: Omit<NewsItem, 'id' | 'timestamp'>): void {
    const newsItem: NewsItem = {
      ...news,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    this.notify(newsItem);
  }

  getSubscriberCount(): number {
    return this.subscribers.length;
  }

  clearSubscribers(): void {
    this.subscribers = [];
  }
}
