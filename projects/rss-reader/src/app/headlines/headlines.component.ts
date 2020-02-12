import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActionItemService } from '../actionitem.service';
import { HeadlineOptions, HeadlineOptionsDialogComponent, CodeViewerDialogComponent } from '../dialogs';
import { NewsAPITopHeadlines, NewsAPITopHeadlinesOpts } from '../models/news-api/top-headlines';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-headlines',
  templateUrl: './headlines.component.html',
})
export class HeadlinesComponent implements OnInit {

  readonly headlineAPIEndpoint = 'https://newsapi.org/v2/top-headlines';
  getStarted = false;
  headlines$: Observable<NewsAPITopHeadlines>;
  refreshStatus = 'Getting headlines...';
  constructor(
    shared: SharedService,
    private dialog: MatDialog,
    actionItemService: ActionItemService,
    private http: HttpClient
  ) {
    shared.title = 'Headlines';
    actionItemService.addActionItem({
      title: 'Options',
      icon: 'tune',
      showAsAction: true,
      onClickListener: () => {
        this.openHeadlineOptsDialog();
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
    if (window.localStorage.getItem('headlineOpts')) {
      const headlineOpts = JSON.parse(window.localStorage.getItem('headlineOpts'));

      if ('topic' in JSON.parse(window.localStorage.getItem('headlineOpts'))) {
        delete headlineOpts.topic;
        window.localStorage.setItem('headlineOpts', JSON.stringify(headlineOpts));
      }
      dialogConfig.data = JSON.parse(window.localStorage.getItem('headlineOpts')) as HeadlineOptions;
    }
    const dialogRef = this.dialog.open(HeadlineOptionsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== 'cancel') {
        const options = dialogRef.componentInstance.headlineOptForm.getRawValue() as NewsAPITopHeadlinesOpts;
        window.localStorage.setItem('headlineOpts', JSON.stringify(options));
        this.reloadHeadlines(options);
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

  reloadHeadlines(options: NewsAPITopHeadlinesOpts) {
    this.headlines$ = this.getHeadlines(options);
  }

  ngOnInit() {
    if (window.localStorage.getItem('headlineHasLaunched')) {
      this.getStarted = true;
      window.localStorage.setItem('hasLaunched', JSON.stringify(true));
    }
    if (window.localStorage.getItem('headlineOpts')) {
      try {
        const options = JSON.parse(window.localStorage.getItem('headlineOpts')) as NewsAPITopHeadlinesOpts;
        this.headlines$ = this.getHeadlines(options);
      } catch (error) {
        console.warn(`Oops! An error occured while getting settings for headlines! The error: ${error}`);
        this.openHeadlineOptsDialog();
      }
    } else {
      this.openHeadlineOptsDialog();
    }
  }
}
