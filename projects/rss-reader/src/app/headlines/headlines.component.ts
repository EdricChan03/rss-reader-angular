import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject, throwError, Subscription } from 'rxjs';
import { ActionItemService } from '../actionitem.service';
import { HeadlineOptions, HeadlineOptionsDialogComponent, CodeViewerDialogComponent } from '../dialogs';
import { NewsAPITopHeadlines, NewsAPITopHeadlinesOpts } from '../models/news-api/top-headlines';
import { SharedService } from '../shared.service';
import { catchError } from 'rxjs/operators';
import { HotkeysService } from '../hotkeys/hotkeys.service';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
})
export class HeadlinesComponent implements OnDestroy, OnInit {

  readonly headlineAPIEndpoint = 'https://newsapi.org/v2/top-headlines';
  errorObject = new Subject<HttpErrorResponse>();
  headlines$: Observable<NewsAPITopHeadlines>;
  headlinesOpts: NewsAPITopHeadlinesOpts;
  shortcutHandlers: Subscription[] = [];
  constructor(
    hotkeys: HotkeysService,
    shared: SharedService,
    private dialog: MatDialog,
    actionItemService: ActionItemService,
    private http: HttpClient
  ) {
    shared.title = 'Headlines';
    const refreshShortcut = hotkeys.addShortcut({ keys: 'r',
    description: 'Refresh headlines',
    shortcutBlacklistEls: ['input', 'textarea'] })
      .subscribe(() => {
        this.reloadHeadlines();
      });
    this.shortcutHandlers.push(refreshShortcut);
    actionItemService.addActionItem({
      title: 'Options',
      icon: 'tune',
      showAsAction: true,
      onClickListener: () => {
        this.openHeadlineOptsDialog();
      }
    });
    actionItemService.addActionItem({
      title: 'Refresh headlines',
      icon: 'sync',
      showAsAction: false,
      onClickListener: () => {
        this.reloadHeadlines();
      }
    });
    actionItemService.addActionItem({
      title: 'View API response',
      icon: 'code',
      showAsAction: false,
      onClickListener: () => {
        this.openCodeViewerDialog();
      }
    });
  }

  openHeadlineOptsDialog() {
    const dialogConfig = new MatDialogConfig<HeadlineOptions>();
    if (localStorage.getItem('headlineOpts')) {
      const headlineOpts = JSON.parse(localStorage.getItem('headlineOpts'));

      if ('topic' in JSON.parse(localStorage.getItem('headlineOpts'))) {
        delete headlineOpts.topic;
        localStorage.setItem('headlineOpts', JSON.stringify(headlineOpts));
      }
      dialogConfig.data = JSON.parse(localStorage.getItem('headlineOpts')) as HeadlineOptions;
    }
    const dialogRef = this.dialog.open(HeadlineOptionsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'cancel' && typeof result === 'object') {
        this.headlinesOpts = result as NewsAPITopHeadlinesOpts;
        localStorage.setItem('headlineOpts', JSON.stringify(result));
        this.reloadHeadlines();
      }
    });
  }

  openCodeViewerDialog() {
    this.headlines$.subscribe(headlines => {
      this.dialog.open(CodeViewerDialogComponent, {
        data: headlines
      });
    });
  }

  getHeadlines(options: NewsAPITopHeadlinesOpts): Observable<NewsAPITopHeadlines> {
    let params = new HttpParams();
    for (const key in options) {
      if (options[key] !== null) {
        // HttpParams is immutable, so we have to manually set the new value
        params = params.append(key, options[key]);
      }
    }
    return this.http.get<NewsAPITopHeadlines>(this.headlineAPIEndpoint, { params });
  }

  reloadHeadlines() {
    this.errorObject.next(null);
    this.headlines$ = this.getHeadlines(this.headlinesOpts).pipe(catchError(error => {
      this.errorObject.next(error);
      console.error('An error occurred:', error);
      return throwError(error);
    }));
  }

  ngOnInit() {
    if (localStorage.getItem('headlineOpts')) {
      try {
        this.headlinesOpts = JSON.parse(localStorage.getItem('headlineOpts')) as NewsAPITopHeadlinesOpts;
        this.reloadHeadlines();
      } catch (error) {
        console.warn(`Oops! An error occured while getting settings for headlines! The error: ${error}`);
        this.openHeadlineOptsDialog();
      }
    } else {
      this.openHeadlineOptsDialog();
    }
  }

  ngOnDestroy() {
    this.shortcutHandlers.forEach(handler => handler.unsubscribe());
  }
}
