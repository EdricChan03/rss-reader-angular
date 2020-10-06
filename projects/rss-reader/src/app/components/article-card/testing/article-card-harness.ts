import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatChipListHarness } from '@angular/material/chips/testing';

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

  /** Gets the header author text. */
  async getHeaderAuthorText() {
    return (await this.getHeaderAuthorEl())?.text() ?? '';
  }

  /** Gets the header published date text. */
  async getHeaderPubDateText() {
    return (await this.getHeaderPubDateEl())?.text() ?? '';
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
