import { NewsItem, Subscriber, User } from '../types';

export class NewsSubscriber implements Subscriber<NewsItem> {
  constructor(
    public id: string,
    private user: User,
  ) {}

  update(news: NewsItem): void {
    if (this.user.preferences.categories.has(news.category)) {
      console.log(`User ${this.user.name} received: ${news.title}`);
    }
  }
}
