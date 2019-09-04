import { R, SHIFT, SLASH } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ActionItemService } from '../actionitem.service';
import {
  FeedDialogComponent,
  RSSChannelInfoDialogComponent,
} from '../dialogs';
import { FeedEntry } from '../model/feed-entry';
import { SharedService } from '../shared.service';
import { HotkeysService } from '../hotkeys/hotkeys.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnDestroy, OnInit {

  /**
  * Whether it's the first time that the user has used the website. (Can be reset by clearing `localStorage`)
  */
  getStarted = false;
  feedOptions: FeedOptions;
  /**
   * Feeds for the RSS
   */
  feeds: FeedEntry[];
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
  // keyMaps = {};
  shortcutHandlers: Subscription[] = [];
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private shared: SharedService,
    private actionItemService: ActionItemService,
    private hotkeys: HotkeysService
  ) {
    /* shared.keyDownUpEvents$.subscribe((event: KeyboardEvent) => {
      this.keyMaps[event.keyCode] = event.type === 'keydown';
      if (!['INPUT', 'TEXTAREA'].includes(event.srcElement.nodeName)) {
        this.keyboardShortcutHandler();
      }
    }); */
    const refreshShortcut = hotkeys.addShortcut({ keys: 'r', description: 'Refresh the feed', shortcutBlacklistEls: ['input', 'textarea'] })
      .subscribe(() => {
        this.refreshFeed();
      });
    this.shortcutHandlers.push(refreshShortcut);
    this.actionItemService.addActionItem({
      title: 'RSS Options...', icon: 'tune', showAsAction: true, onClickListener: () => {
        this.selectRss();
      }
    });
    this.actionItemService.addActionItem({
      title: 'Refresh feed', icon: 'sync', showAsAction: true, onClickListener: () => {
        this.refreshFeed();
      }
    });
  }
  /* keyboardShortcutHandler() {
    if (this.keyMaps[SHIFT] && this.keyMaps[SLASH]) {
      this.openKeyboardShortcutDialog();
      this.keyMaps = {};
    } else if (this.keyMaps[R]) {
      this.refreshFeed();
      this.keyMaps = {};
    }
  } */
  /* openKeyboardShortcutDialog() {
    if (this.dialog.getDialogById('keyboard-shortcut-dialog') === undefined) {
      this.dialog.open<KeyboardShortcutsDialogComponent, KeyboardShortcut[]>(KeyboardShortcutsDialogComponent, {
        data: [
          {
            keyboardShortcut: ['Shift', '/'],
            action: 'Show this dialog'
          },
          {
            keyboardShortcut: ['R'],
            action: 'Refresh the feed'
          }
        ],
        id: 'keyboard-shortcut-dialog'
      });
    } else {
      this.dialog.getDialogById('keyboard-shortcut-dialog').close();
    }
  } */
  openRSSInfoDialog() {
    this.dialog.open(RSSChannelInfoDialogComponent);
  }
  /**
   * Reloads the website
   */
  reload() {
    // tslint:disable-next-line:max-line-length
    this.shared.openConfirmDialog({ msg: 'Are you sure you want to refresh? Changes will not be saved!', title: 'Reload?' }).afterClosed().subscribe(result => {
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
    if (window.localStorage['feedOptions']) {
      feedOpts = <FeedOptions>JSON.parse(window.localStorage['feedOptions']);
    }
    if (feedOpts) {
      this._getFeed(feedOpts);
    }
  }
  private _getFeedUrl(): string {
    let localUrl: string;
    // Get the feed url from localstorage
    if (window.localStorage['feedOptions']) {
      localUrl = (JSON.parse(window.localStorage['feedOptions']) as FeedOptions).feedUrl;
    } else if (window.localStorage['feedUrl']) {
      localUrl = window.localStorage['feedUrl'];
    } else {
      localUrl = 'https://www.blog.google/rss/';
    }
    return localUrl;
  }
  private _getFeed(opts: FeedOptions) {
    if (opts) {
      if (opts.hasOwnProperty('amount')) {
        // tslint:disable-next-line:max-line-length
        this.http.get<any>(`${this.rssToJsonServiceBaseUrl}?rss_url=${this._getFeedUrl()}&api_key=${opts.apiKey}&count=${opts.amount}`).subscribe(result => {
          this.feeds = result.items;
          this.isRefreshing = false;
          this.hasError = false;
        }, error => {
          this.hasError = true;
          console.error(error);
          const snackBarRef = this.shared.openSnackBar({
            msg: `Error ${error.code}: ${error.message}`,
            action: 'Retry'
          });
          snackBarRef.onAction().subscribe(() => {
            this.refreshFeed();
          });
        });
      }
    }
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
        window.localStorage['feedOptions'] = JSON.stringify(rssFeedForm.getRawValue());
        this.refreshFeed();
      }
    });
  }
  private _migrateFeedOpts() {
    if (window.localStorage['apiKey'] && window.localStorage['feedUrl']) {
      console.log('Old feed options found. Migrating old options...');
      const tempFeedOptions = <FeedOptions>JSON.parse(window.localStorage['feedOptions']);
      if (window.localStorage['apiKey']) {
        tempFeedOptions['apiKey'] = window.localStorage['apiKey'];
      }
      if (window.localStorage['feedUrl']) {
        tempFeedOptions['feedUrl'] = window.localStorage['feedUrl'];
      }
      window.localStorage['feedOptions'] = JSON.stringify(tempFeedOptions);
      delete window.localStorage['apiKey'];
      delete window.localStorage['feedUrl'];
    }
  }
  ngOnInit() {
    if (!window.localStorage['feedOptions']) {
      this.selectRss();
    }
    if (!window.localStorage['hasLaunched']) {
      this.getStarted = true;
      window.localStorage['hasLaunched'] = JSON.stringify(true);
    }
    this.refreshFeed();
  }

  ngOnDestroy() {
    if (this.shortcutHandlers.length > 0) {
      this.shortcutHandlers.forEach((handler) => {
        handler.unsubscribe();
      });
    }
  }

}

export interface FeedOptions {
  feedUrl?: string;
  apiKey?: string;
  amount?: number;
}
