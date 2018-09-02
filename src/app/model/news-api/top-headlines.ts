import { NewsAPITopHeadlinesArticle } from './top-headlines-article';

export interface NewsAPITopHeadlines {
  /**
   * The status of the API result.
   */
  status: string;
  /**
   * The total number of articles returned.
   */
  totalResults?: string;
  /**
   * The articles returned from the API.
   */
  articles?: NewsAPITopHeadlinesArticle[];
}

export interface NewsAPITopHeadlinesOpts {
  /**
   * The API key
   * Go to https://newsapi.org/register to get an API key
   */
  apiKey: string;
  /**
   * The topic to get headlines for
   */
  topic: string;
  /**
   * The country to get headlines from
   * Note: This parameter only accepts a 2-letter country code.
   */
  country: string;
}
