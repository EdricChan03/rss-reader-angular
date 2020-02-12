import { Rss2JsonResponseChannel } from './channel';
import { Rss2JsonResponseItem } from './item';

export interface Rss2JsonResponse {
  /** The status of the API response. */
  status?: string;
  /** The error message if the API errors. */
  message?: string;
  /** Metadata about the RSS feed channel. */
  feed?: Rss2JsonResponseChannel;
  items?: Rss2JsonResponseItem[];
}
