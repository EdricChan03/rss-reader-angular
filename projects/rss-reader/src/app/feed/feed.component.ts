import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ActionItemService } from '../actionitem.service';
import {
  FeedDialogComponent,
  RSSChannelInfoDialogComponent,
} from '../dialogs';
import { HotkeysService } from '../hotkeys/hotkeys.service';
import { FeedEntry } from '../models/feed-entry';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html'
})
export class FeedComponent implements OnDestroy, OnInit {
  getStarted = false;
  feedOptions: FeedOptions;
  feeds: FeedEntry[];
  isRefreshing = false;
  hasError = false;
  refreshStatus = 'Getting RSS feed...';
  rssToJsonServiceBaseUrl = 'https://api.rss2json.com/v1/api.json';
  // See https://stackoverflow.com/a/12444641 for more info
  shortcutHandlers: Subscription[] = [];
  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private shared: SharedService,
    private actionItemService: ActionItemService,
    private hotkeys: HotkeysService
  ) {
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

  openRSSInfoDialog() {
    this.dialog.open(RSSChannelInfoDialogComponent);
  }

  reload() {
    this.shared.openConfirmDialog({
      msg: 'Are you sure you want to refresh? Changes will not be saved!',
      title: 'Reload?'
    }).afterClosed().subscribe(result => {
      if (result === 'ok') {
        window.location.reload();
      }
    });
  }

  refreshFeed() {
    // Show that it is getting RSS
    this.isRefreshing = true;
    this.getStarted = false;
    // Set to empty array
    this.feeds = [];
    let feedOpts: FeedOptions;
    if (window.localStorage.feedOptions) {
      feedOpts = JSON.parse(window.localStorage.feedOptions) as FeedOptions;
    }
    if (feedOpts) {
      this._getFeed(feedOpts);
    }
  }

  private _getFeedUrl(): string {
    let localUrl: string;
    // Get the feed url from localstorage
    if (window.localStorage.feedOptions) {
      localUrl = (JSON.parse(window.localStorage.feedOptions) as FeedOptions).feedUrl;
    } else if (window.localStorage.feedUrl) {
      localUrl = window.localStorage.feedUrl;
    } else {
      localUrl = 'https://www.blog.google/rss/';
    }
    return localUrl;
  }

  private _getFeed(opts: FeedOptions) {
    if (opts) {
      if (opts.hasOwnProperty('amount')) {
        // TODO: Use rxjs pipes to update API status.
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

  selectRss() {
    const dialogRef = this.dialog.open(FeedDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      const rssFeedForm = dialogRef.componentInstance.rssFeedForm;
      if (result === 'save') {
        window.localStorage.feedOptions = JSON.stringify(rssFeedForm.getRawValue());
        this.refreshFeed();
      }
    });
  }

  ngOnInit() {
    if (!window.localStorage.feedOptions) {
      this.selectRss();
    }
    if (!window.localStorage.hasLaunched) {
      this.getStarted = true;
      window.localStorage.hasLaunched = JSON.stringify(true);
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
