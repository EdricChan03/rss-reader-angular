import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActionItemService } from '../actionitem.service';
import { MatDialog } from '@angular/material';
import { HeadlineOptionsDialogComponent } from '../dialogs';
import { HttpClient } from '@angular/common/http';
import { NewsAPITopHeadlinesOpts, NewsAPITopHeadlines } from '../model/news-api/top-headlines';
import { Observable } from 'rxjs';

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
    private shared: SharedService,
    private dialog: MatDialog,
    private actionItemService: ActionItemService,
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
  }

  openHeadlineOptsDialog() {
    const dialogRef = this.dialog.open(HeadlineOptionsDialogComponent);
    if (window.localStorage.getItem('headlineOpts')) {
      dialogRef.componentInstance.options = JSON.parse(window.localStorage.getItem('headlineOpts'));
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== 'cancel') {
        const options = dialogRef.componentInstance.headlineOptForm.getRawValue() as NewsAPITopHeadlinesOpts;
        window.localStorage.setItem('headlineOpts', JSON.stringify(options));
        this.reloadHeadlines(options);
      }
    });
  }
  getHeadlines(options: NewsAPITopHeadlinesOpts): Observable<NewsAPITopHeadlines> {
    const apiEndpoint = `${this.headlineAPIEndpoint}?apiKey=${options.apiKey}&country=${options.country}&topic=${options.topic}`;
    return this.http.get<NewsAPITopHeadlines>(apiEndpoint);
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
