import { FeedChannel } from './feed-channels';

export interface FeedUrl {
	name: string;
	id: string;
	channels: FeedChannel[];
}