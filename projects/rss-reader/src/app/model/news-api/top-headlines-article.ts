export interface NewsAPITopHeadlinesArticle {
  /**
   * The source of where the article originated from.
   */
  source?: {
    id?: string;
    /**
     * The name of the source of where the article originated from.
     */
    name?: string;
  };
  /**
   * The author of the article.
   */
  author?: string;
  /**
   * The article's title.
   */
  title?: string;
  /**
   * The article's description.
   */
  description?: string;
  /**
   * The URL of the actual article.
   */
  url?: string;
  /**
   * A thumbnail of the article.
   */
  urlToImage?: string;
  /**
   * When the article was published on.
   */
  publishedAt?: string;
  /**
   * The article's content.
   */
  content?: string;
}
