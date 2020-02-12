export interface Rss2JsonParams {
  /** The RSS feed to be converted to JSON. (Note: The URL has to be escaped) */
  rss_url: string;
  /** A valid API key. */
  api_key?: string;
  /**
   * Order the results by the chosen value.
   * Note: `api_key` must be specified to use this parameter.
   */
  order_by?: 'pubDate' | 'author' | 'title';
  /**
   * The order direction of feed items to return.
   * Note: `api_key` must be specified to use this parameter.
   */
  order_dir?: 'asc' | 'desc';
  /**
   * The number of feed items to return. (Default: `10`)
   * Note: `api_key` must be specified to use this parameter.
   */
  count?: number;
  /** The callback name to be used for JSONP. */
  callback?: string;
}
