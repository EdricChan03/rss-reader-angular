import { BaseHarnessFilters } from '@angular/cdk/testing';

export interface ArticleCardComponentHarnessFilters extends BaseHarnessFilters {
  /** Filters based on the text of the author. */
  author?: string | RegExp;
  /** Filters based on the published date. */
  // TODO: Add support for JS Dates.
  pubDate?: string | RegExp;
  /** Filters based on the title. */
  title?: string | RegExp;
  /** Filters based on the image's source. */
  imgSrc?: string | RegExp;
  /** Filters based on the description. */
  desc?: string | RegExp;
}
