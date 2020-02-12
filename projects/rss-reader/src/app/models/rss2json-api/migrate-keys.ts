import { FeedOptions } from '../../feed/feed.component';
import { Rss2JsonParams } from './params';

export const migrateKeys: { [key in keyof FeedOptions]: keyof Rss2JsonParams } = {
  apiKey: 'api_key',
  feedUrl: 'rss_url',
  amount: 'count'
};
