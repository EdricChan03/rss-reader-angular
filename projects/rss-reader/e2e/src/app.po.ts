import { browser, element, by } from 'protractor';

export class AppPage {
  /**
   * Navigates to the specified URL, or the default base URL.
   * @param url The URL to navigate to
   */
  navigateTo(url?: string) {
    return browser.get(url ? url : browser.baseUrl) as Promise<any>;
  }

  getToolbarText() {
    return element(by.css('#toolbar-title')).getText() as Promise<string>;
  }
}
