/* eslint-disable @typescript-eslint/member-ordering */
import { ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import { MatLegacyButtonHarness as MatButtonHarness } from '@angular/material/legacy-button/testing';
import { MatLegacyChipListHarness as MatChipListHarness } from '@angular/material/legacy-chips/testing';

import { ArticleCardComponentHarnessFilters } from './article-card-harness-filters';

/** Harness for interacting with a standard `app-article-card` in tests. */
export class ArticleCardComponentHarness extends ComponentHarness {
  /** The selector for the host element of a `ArticleCardComponent` instance. */
  static hostSelector = '.article-card';

  // Header elements
  protected getHeaderAuthorEl = this.locatorForOptional('.article-card--author');
  protected getHeaderPubDateEl = this.locatorForOptional('.article-card--pub-date');

  // Title elements
  protected getTitleEl = this.locatorFor('.article-card--title');
  protected getImageEl = this.locatorForOptional('.article-card--image');

  // Content elements
  protected getDescEl = this.locatorFor('.article-card--description');
  /** Gets the list of categories. */
  getCategoriesLoader = this.locatorForOptional(MatChipListHarness.with(
    { selector: '.article-card--categories' }));

  // Actions element
  protected getActionsEl = this.locatorFor('.article-card--actions');
  /** Gets the list of action buttons. */
  getActionBtnsLoader = this.locatorForAll(MatButtonHarness);
  /** Gets the share action button. */
  getShareActionBtnLoader = this.locatorFor(MatButtonHarness.with({ text: 'share' }));
  /** Gets the view/open action button. */
  getOpenActionBtnLoader = this.locatorFor(MatButtonHarness.with({ text: 'open_in_new' }));

  /** Creates a `HarnessPredicate` used to locate a particular `ArticleCardComponentHarness`. */
  static with(options: ArticleCardComponentHarnessFilters): HarnessPredicate<ArticleCardComponentHarness> {
    return new HarnessPredicate(ArticleCardComponentHarness, options)
      .addOption('author', options.author,
        (harness, text) => HarnessPredicate.stringMatches(harness.getHeaderAuthorText(), text))
      .addOption('published date', options.pubDate,
        (harness, text) => HarnessPredicate.stringMatches(harness.getHeaderPubDateText(), text))
      .addOption('title', options.title,
        (harness, text) => HarnessPredicate.stringMatches(harness.getTitleText(), text))
      .addOption('image source', options.imgSrc,
        (harness, src) => HarnessPredicate.stringMatches(harness.getImageSrc(), src))
      .addOption('description', options.desc,
        (harness, text) => HarnessPredicate.stringMatches(harness.getDescText(), text));
  }

  /** Gets the header author text. */
  async getHeaderAuthorText() {
    return (await this.getHeaderAuthorEl())?.text() ?? '';
  }

  /** Gets the header published date text. */
  async getHeaderPubDateText() {
    return (await this.getHeaderPubDateEl())?.text() ?? '';
  }

  /** Gets the header published date as a `Date` object. */
  async getHeaderPubDate() {
    return new Date((await this.getHeaderPubDateText()));
  }

  /** Gets the title text. */
  async getTitleText() {
    return (await this.getTitleEl()).text();
  }

  /** Gets the image source. */
  async getImageSrc() {
    return (await this.getImageEl())?.getAttribute('src') ?? null;
  }

  /** Gets the description text. */
  async getDescText() {
    return (await this.getDescEl()).text();
  }
}
