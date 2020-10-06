export interface FeedEntry {
  /**
   * The title of the entry
   */
  title?: string;
  /**
   * The link of the entry
   */
  link?: string;
  guid?: string;
  /**
   * The date that the entry was published on
   */
  pubDate?: string;
  /**
   * An array of categories/tags assigned to the entry
   */
  categories?: string[];
  /**
   * The person who wrote the entry
   */
  author?: string;
  /**
   * A thumbnail of the entry
   */
  thumbnail?: string;
  /**
   * Description/the contents of the entry
   */
  description?: string;
  content?: string;
  enclosure?: {
    link?: string;
    length?: number;
    type?: string;
  } | {
    [key: string]: string;
  };
}
