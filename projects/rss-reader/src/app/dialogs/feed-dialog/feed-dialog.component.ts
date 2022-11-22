import { Component, OnInit } from '@angular/core';

import { FeedCategory } from '../../models/feed-category';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SubmitRssDialogComponent } from '../submit-rss-dialog/submit-rss-dialog.component';
import feedUrlsJson from '../../../assets/feedurls.json';

/* eslint-disable @typescript-eslint/naming-convention */
// TODO: Use camelCase
type FeedForm = FormGroup<{
  rss_url: FormControl<string | null>;
  api_key: FormControl<string | null>;
  order_by: FormControl<string | null>;
  order_dir: FormControl<string | null>;
  count: FormControl<number | null>;
}>;
/* eslint-enable @typescript-eslint/naming-convention */
@Component({
  selector: 'app-feed-dialog',
  templateUrl: './feed-dialog.component.html',
  styleUrls: ['./feed-dialog.component.scss']
})
export class FeedDialogComponent implements OnInit {
  /**
   * The list of feeds
   * Available at {@link `/assets/feedurls.json`}
   */
  feeds: FeedCategory[] = feedUrlsJson.feedUrls;
  /**
   * The feed URL channel for the publishing
   */
  feedUrlChannel: string;
  feedCategory: string;
  filteredOptions: Observable<FeedCategory[]>;
  feedUrlValue = '';
  rssFeedForm: FeedForm;
  orderByOptions = [
    {
      title: 'None',
      value: ''
    },
    {
      title: 'Published date',
      value: 'pubDate'
    },
    {
      title: 'Author',
      value: 'author'
    },
    {
      title: 'Title',
      value: 'title'
    }
  ];
  orderDirOptions = [
    {
      title: 'Default (Descending order)',
      value: ''
    },
    {
      title: 'Ascending order',
      value: 'asc'
    },
    {
      title: 'Descending order',
      value: 'desc'
    }
  ];

  constructor(
    dialogRef: MatDialogRef<FeedDialogComponent>,
    fb: FormBuilder,
    private dialog: MatDialog
  ) {
    dialogRef.disableClose = true;
    /* eslint-disable @typescript-eslint/naming-convention */
    this.rssFeedForm = fb.group({
      rss_url: ['', Validators.required],
      api_key: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(40)]],
      order_by: '',
      order_dir: '',
      count: 10 // The default value
    });
    /* eslint-enable @typescript-eslint/naming-convention */
    this.filteredOptions = this.rssFeedForm.get('rss_url').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterFeeds(value))
      );
  }
  ngOnInit() {
    if (window.localStorage.getItem('feedOptions')) {
      this.rssFeedForm.patchValue(JSON.parse(window.localStorage.getItem('feedOptions')));
    }
  }

  filterFeeds(name: string): FeedCategory[] {
    return this.feeds.reduce((feeds, feed) => {
      const channels = feed.channels.filter(
        channel => channel.feedName.includes(name) || channel.feedUrl.includes(name)
      );
      // Only add the filtered feed channels if there were any results
      if (channels.length > 0) {
        feeds.push({ ...feed, channels });
      }
      return feeds;
    }, [] as FeedCategory[]);
  }

  openSubmitRssDialog() {
    this.dialog.open(SubmitRssDialogComponent, {
      data: { feedUrl: this.rssFeedForm.get('feedUrl').value }
    });
  }
}
