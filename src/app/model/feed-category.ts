import { FeedChannel } from './feed-channel';

export interface FeedCategory {
  categoryName: string;
  categoryId: string;
  channels: FeedChannel[];
}
