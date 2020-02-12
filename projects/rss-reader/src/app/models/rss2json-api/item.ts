export interface Rss2JsonResponseItem {
  /** The title of the item. */
  title?: string;
  /** The date when the item was published at. */
  pubDate?: string;
  /** The URL of the item. */
  link?: string;
  /** A string that uniquely identifies the item. */
  guid?: string;
  /** The author of the item. */
  author?: string;
  /** The thumbnail URL of the item. */
  thumbnail?: string;
  /** The item synopsis. */
  description?: string;
  /** The content of the item. */
  content?: string;
  /** Describes a media object that is attached to the item. */
  enclosure?: {
    [key: string]: any;
  };
  /** A list of categories that the item is in. */
  categories?: string[];
}
