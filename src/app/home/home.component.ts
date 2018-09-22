import { SHIFT, SLASH } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ActionItemService } from '../actionitem.service';
import {
  FeedDialogComponent,
  FeedOptionsDialogComponent,
  RSSChannelInfoDialogComponent
} from '../dialogs';
import { FeedEntry } from '../model/feed-entry';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  /**
  * Whether it's the first time that the user has used the website. (Can be reset by clearing `localStorage`)
  */
  getStarted = false;
  /**
   * The feed URL
   */
  feedUrl: string;
  /**
   * Feeds for the RSS
   */
  feeds: FeedEntry[];
  /**
   * The API key to do http requests with
   */
  apiKey: string;
  /**
   * Whether it is currently refreshing the RSS feed
   */
  isRefreshing = false;
  /**
   * Shows the reload button
   */
  hasError = false;
  /**
   * The refresh status present when refreshing the RSS
   */
  refreshStatus = 'Getting RSS feed...';
  /**
   * The RSS2Json website base URL
   */
  rssToJsonServiceBaseUrl = 'https://api.rss2json.com/v1/api.json';
  // See https://stackoverflow.com/a/12444641 for more info
  keyMaps = {};
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private shared: SharedService,
    private actionItemService: ActionItemService
  ) {
    shared.keyDownUpEvents$.subscribe((event: KeyboardEvent) => {
      this.keyMaps[event.keyCode] = event.type === 'keydown';
      if (!['INPUT', 'TEXTAREA'].includes(event.srcElement.nodeName)) {
        this.keyboardShortcutHandler();
      }
    });
  }
  keyboardShortcutHandler() {
    console.log('Before: ', this.keyMaps);
    if (this.keyMaps[SHIFT] && this.keyMaps[SLASH]) {
      console.log('Keyboard shortcuts dialog!');
    }
    this.keyMaps = {};
    console.log('After: ', this.keyMaps);
  }
  options() {
    const dialogRef = this.dialog.open(FeedOptionsDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.refreshFeed();
      }
    });
  }
  openRSSInfoDialog() {
    this.dialog.open(RSSChannelInfoDialogComponent);
  }
  /**
   * Reloads the website
   */
  reload() {
    // tslint:disable-next-line:max-line-length
    this.shared.openConfirmDialog({ msg: 'Are you sure you want to refresh? Changes will not be saved!', title: 'Refresh feed?' }).afterClosed().subscribe(result => {
      if (result === 'ok') {
        window.location.reload(true);
      }
    });
  }
  /**
   * Refreshes the feed
   * Not to be confused with {@link reload}
   */
  refreshFeed() {
    // Show that it is getting RSS
    this.isRefreshing = true;
    this.getStarted = false;
    // Set to empty array
    this.feeds = [];
    let feedOpts: FeedOptions;
    if (window.localStorage.getItem('feedOptions')) {
      feedOpts = <FeedOptions>JSON.parse(window.localStorage.getItem('feedOptions'));
    }
    if (feedOpts) {
      this._getFeedWithOpts(feedOpts);
    } else {
      this._getFeedWithNoOpts();
    }
  }
  private _getFeedUrl(): string {
    let localUrl: string;
    // Get the feed url from localstorage
    if (window.localStorage.getItem('feedUrl')) {
      localUrl = window.localStorage.getItem('feedUrl');
    } else {
      localUrl = 'https://www.blog.google/rss/';
    }
    return localUrl;
  }
  private _getFeedWithOpts(opts: FeedOptions) {
    if (opts) {
      if (opts.amount) {
        // Add 1s of delay to provide user feedback.
        // tslint:disable-next-line:max-line-length
        this.http.get<any>(`${this.rssToJsonServiceBaseUrl}?rss_url=${this._getFeedUrl()}&api_key=${this.apiKey}&count=${opts.amount}`).subscribe(result => {
          this.feeds = result.items;
          this.isRefreshing = false;
          this.hasError = false;
        }, error => {
          this.hasError = true;
          console.error(error);
          // tslint:disable-next-line:max-line-length
          const snackBarRef = this.shared.openSnackBar({ msg: `Error ${error.code}: ${error.message}`, action: 'Retry', additionalOpts: { panelClass: 'mat-elevation-z3' } });
          snackBarRef.onAction().subscribe(() => {
            this.refreshFeed();
          });
        });
      }
    }
  }
  private _getFeedWithNoOpts() {
    // Add 1s of delay to provide user feedback.
    this.http.get<any>(`${this.rssToJsonServiceBaseUrl}?rss_url=${this._getFeedUrl()}&api_key=${this.apiKey}`).subscribe(result => {
      this.feeds = result.items;
      this.isRefreshing = false;
      this.hasError = false;
    }, error => {
      this.hasError = true;
      console.error(error);
      // tslint:disable-next-line:max-line-length
      const snackBarRef = this.shared.openSnackBar({ msg: `Error${error.code ? ' ' + error.code + ':' : ':'} ${error.message}`, action: 'Retry', additionalOpts: { panelClass: 'mat-elevation-z3', horizontalPosition: 'start' } });
      snackBarRef.onAction().subscribe(() => {
        this.refreshFeed();
      });
    });

  }
  /**
   * Opens the dialog to select an RSS feed
   */
  selectRss() {
    const dialogRef = this.dialog.open(FeedDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      const rssFeedForm = dialogRef.componentInstance.rssFeedForm;
      // const url = dialogRef.componentInstance.feedUrl;
      // this.apiKey = dialogRef.componentInstance.apiKey;
      // const publishFeedUrl = dialogRef.componentInstance.publishFeedUrl;
      if (result === 'save') {
        window.localStorage.setItem('feedUrl', rssFeedForm.get('feedUrl')!.value);
        window.localStorage.setItem('apiKey', rssFeedForm.get('apiKey')!.value);
        this.refreshFeed();
        if (rssFeedForm.get('publishFeedUrl')!.value) {
          this.shared.openSnackBar({
            msg: 'Adding new channel RSS url... (Please make sure that you\'ve enabled popups in your browser settings.',
            additionalOpts: { duration: 2000, horizontalPosition: 'start' }
          });
          let feedUrl, feedUrlChannel, feedCategory;
          feedUrl = rssFeedForm.get('feedUrl')!.value;
          feedUrlChannel = dialogRef.componentInstance.feedUrlChannel;
          try {
            feedCategory = dialogRef.componentInstance.feedCategory;
          } catch (error) {
            console.error(error);
          }
          // tslint:disable-next-line:max-line-length
          const googleForm = `https://docs.google.com/forms/d/e/1FAIpQLSca8Iug_FPflBOHJdUN4KUBrUurOLjcyHAWqkn0_TTJ1oYmRQ/viewform?usp=pp_url&entry.133779622=${feedUrlChannel}&entry.1135652000=${feedUrl}&entry.1218787401=${feedCategory ? feedCategory : 'other'}`;
          window.open(googleForm, '_blank');
        }
      }
    });
  }
  ngOnInit() {
    if (window.localStorage.getItem('apiKey')) {
      this.apiKey = window.localStorage.getItem('apiKey');
    }
    if (!window.localStorage.getItem('feedUrl')) {
      this.selectRss();
    }
    if (!window.localStorage.getItem('hasLaunched')) {
      this.getStarted = true;
      window.localStorage.setItem('hasLaunched', JSON.stringify(true));
    }
    this.refreshFeed();
    this.actionItemService.addActionItem({
      title: 'Select RSS...', icon: 'rss_feed', showAsAction: true, onClickListener: () => {
        this.selectRss();
      }
    });
    this.actionItemService.addActionItem({
      title: 'RSS Options...', icon: 'tune', onClickListener: () => {
        this.options();
      }
    });
    this.actionItemService.addActionItem({
      title: 'Refresh feed', icon: 'sync', onClickListener: () => {
        this.refreshFeed();
      }
    });
    if (window.localStorage.getItem('feedUrl')) {
      this.actionItemService.addActionItem({
        title: 'RSS Channel info.', icon: 'information', onClickListener: () => {
          this.openRSSInfoDialog();
        }
      });
    }
  }

}

export interface FeedOptions {
  /**
   * The max number of posts to show
   * @type {number}
   */
  amount: number;
}
