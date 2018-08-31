export interface FeedChannel {
  /**
   * The name of the RSS channel
   */
  feedName: string;
  /**
   * The RSS feed URL of the RSS channel
   */
  feedUrl: string;
  /**
   * More info about the RSS channel
   */
  feedDescription?: string;
}
