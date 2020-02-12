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
  apiKey?: string;
  /** The category to get headlines for. */
  category?: string;
  /** Keywords or a phrase to search for. */
  q?: string;
  /**
   * A list/comma-separated string of identifiers for the news sources/
   * blogs to get headlines from.
   */
  sources?: string | string[];
  /**
   * The country to get headlines from
   * Note: This parameter only accepts a 2-letter country code.
   */
  country?: string;
  /** The number of results to return per page. (Default: 20, Max: 100) */
  pageSize?: number;
}
