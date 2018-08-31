// import { FeedInfo } from './feed-info';
// import { FeedEntry } from './feed-entry';
import { FeedCategory } from './feed-category';

export interface Feed {
  // status: string;
  // feed: FeedInfo;
  // items: FeedEntry[];
  $schema: string;
  feedUrls: FeedCategory[];
}
