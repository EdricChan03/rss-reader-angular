import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable, Subject, Subscription, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ActionItemService } from '../actionitem.service';
import { DialogsService } from '../core/dialogs/dialogs.service';
import { CodeViewerDialogComponent, FeedDialogComponent, RSSChannelInfoDialogComponent } from '../dialogs';
import { HotkeysService } from '../hotkeys/hotkeys.service';
import { Rss2JsonResponseChannel } from '../models/rss2json-api/channel';
import { Rss2JsonResponseItem } from '../models/rss2json-api/item';
import { migrateKeys } from '../models/rss2json-api/migrate-keys';
import { Rss2JsonParams } from '../models/rss2json-api/params';
import { Rss2JsonResponse } from '../models/rss2json-api/response';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnDestroy, OnInit {
  @ViewChild('feedInfoDrawer', { static: true }) feedInfoDrawer: MatDrawer;
  isRefreshing = true;
  errorObject = new Subject<HttpErrorResponse>();
  rss2JsonResponse$: Observable<Rss2JsonResponse>;
  feed$: Observable<Rss2JsonResponseChannel>;
  feedItems$: Observable<Rss2JsonResponseItem[]>;
  rssToJsonServiceBaseUrl = 'https://api.rss2json.com/v1/api.json';
  // See https://stackoverflow.com/a/12444641 for more info
  shortcutHandlers: Subscription[] = [];
  constructor(
    private coreDialogs: DialogsService,
    private dialog: MatDialog,
    private http: HttpClient,
    public shared: SharedService,
    private actionItemService: ActionItemService,
    private hotkeys: HotkeysService
  ) {
    const refreshShortcut = hotkeys.addShortcut({ keys: 'r', description: 'Refresh the feed', shortcutBlacklistEls: ['input', 'textarea'] })
      .subscribe(() => {
        this.reloadFeed();
      });
    this.shortcutHandlers.push(refreshShortcut);
    this.actionItemService.addActionItem({
      title: 'RSS Options...', icon: 'tune', showAsAction: true, onClickListener: () => {
        this.selectRss();
      }
    });
    this.actionItemService.addActionItem({
      title: 'Feed info',
      icon: 'info',
      showAsAction: true,
      onClickListener: () => { this.feedInfoDrawer.toggle(); }
    });
    this.actionItemService.addActionItem({
      title: 'Refresh feed',
      icon: 'sync',
      showAsAction: true,
      onClickListener: () => {
        this.reloadFeed();
      }
    });
    this.actionItemService.addActionItem({
      title: 'View API response',
      icon: 'code',
      onClickListener: () => {
        this.openCodeViewerDialog();
      }
    });
  }

  openRSSInfoDialog() {
    this.dialog.open(RSSChannelInfoDialogComponent);
  }

  openCodeViewerDialog() {
    this.rss2JsonResponse$.subscribe(res => {
      this.dialog.open(CodeViewerDialogComponent, {
        data: res
      });
    }, error => {
      this.shared.openSnackBar({
        msg: 'Could not view API response because an error occurred. Please try again later'
      });
      console.error('Could not view API response:', error);
    });
  }

  reload() {
    this.coreDialogs.openConfirmDialog({
      msg: 'Are you sure you want to refresh? Changes will not be saved!',
      title: 'Reload?'
    }).afterClosed().subscribe(result => {
      if (result === 'ok') {
        window.location.reload();
      }
    });
  }

  getFeed(options: Rss2JsonParams) {
    let params = new HttpParams();
    for (const key in options) {
      if (options[key] !== null) {
        // HttpParams is immutable, so we have to manually set the new value
        params = params.append(key, options[key]);
      }
    }
    return this.http.get<Rss2JsonResponse>(this.rssToJsonServiceBaseUrl, { params });
  }

  reloadFeed() {
    let params: Rss2JsonParams = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      rss_url: ''
    };
    if (localStorage.feedOptions) {
      if ('feedUrl' in JSON.parse(localStorage.feedOptions)) {
        // feedOptions is using the old values - so we migrate the values
        const migratedOpts: Partial<Rss2JsonParams> = {};

        const opts = JSON.parse(localStorage.feedOptions) as FeedOptions;
        for (const key in opts) {
          if (opts[key] !== null) {
            migratedOpts[migrateKeys[key]] = opts[key];
          }
        }
        console.log('Old feed options:', opts);
        console.log('Migrated feed options:', migratedOpts);
        localStorage.feedOptions = JSON.stringify(migratedOpts);
      }
      params = JSON.parse(localStorage.feedOptions) as Rss2JsonParams;
    }
    this.isRefreshing = true;
    this.errorObject.next(null);
    this.rss2JsonResponse$ = this.getFeed(params).pipe(tap(() => {
      this.isRefreshing = false;
    }), catchError(error => {
      this.errorObject.next(error);
      console.error('An error occurred:', error);
      return throwError(error);
    }));
    this.feed$ = this.rss2JsonResponse$.pipe(map(res => res.feed));
    this.feedItems$ = this.rss2JsonResponse$.pipe(map(res => res.items));
  }

  selectRss() {
    const dialogRef = this.dialog.open(FeedDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'save' && typeof result === 'object') {
        localStorage.feedOptions = JSON.stringify(result);
        this.reloadFeed();
      }
    });
  }

  ngOnInit() {
    if (!localStorage.feedOptions) {
      this.selectRss();
    }
    this.reloadFeed();
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
