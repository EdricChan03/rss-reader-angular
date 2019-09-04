import { Component, OnInit } from '@angular/core';

import { FeedCategory } from '../../model/feed-category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Feed } from '../../model/feed';
import { SubmitRssDialogComponent } from '../submit-rss-dialog/submit-rss-dialog.component';
import { FeedChannel } from '../../model/feed-channel';
import { feedUrls } from '../../../assets/feedurls.json';

@Component({
  selector: 'app-feed-dialog',
  templateUrl: './feed-dialog.component.html'
})
export class FeedDialogComponent implements OnInit {
  /**
   * The list of feeds
   * Available at {@link `/assets/feedurls.json`}
   */
  feeds: FeedCategory[] = feedUrls;
  /**
   * The feed URL channel for the publishing
   */
  feedUrlChannel: string;
  feedCategory: string;
  filteredOptions: Observable<FeedCategory[]>;
  feedUrlValue = '';
  rssFeedForm: FormGroup;
  // feedData: AngularFirestoreDocument<FeedCategory>;
  constructor(
    private dialogRef: MatDialogRef<FeedDialogComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    dialogRef.disableClose = true;
    this.rssFeedForm = fb.group({
      feedUrl: ['', Validators.required],
      apiKey: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(40)]],
      amount: [30, Validators.required]
    });
    this.filteredOptions = this.rssFeedForm.get('feedUrl').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }
  ngOnInit() {
    // this.feedData = this.afFs.doc('data/feed');
    if (window.localStorage.getItem('feedOptions')) {
      this.rssFeedForm.patchValue(JSON.parse(window.localStorage.getItem('feedOptions')));
    }
  }
  filter(name: string): FeedCategory[] {
    const filteredFeedCategories: FeedCategory[] = [];
    for (const feedCategory of this.feeds) {
      const tempFeedCategory: FeedCategory = {
        categoryId: null,
        categoryName: null,
        channels: []
      };
      const tempFeedChannels: FeedChannel[] = [];
      tempFeedCategory['categoryName'] = feedCategory.categoryName;
      tempFeedCategory['categoryId'] = feedCategory.categoryId;
      for (const feedChannel of feedCategory.channels) {
        if (feedChannel.feedName.includes(name) || feedChannel.feedUrl.includes(name)) {
          tempFeedChannels.push(feedChannel);
        }
      }
      if (tempFeedChannels.length >= 1) {
        tempFeedCategory['channels'] = tempFeedChannels;
        filteredFeedCategories.push(tempFeedCategory);
      }
    }
    console.log(filteredFeedCategories);
    return filteredFeedCategories;
  }
  openSubmitRssDialog() {
    this.dialog.open(SubmitRssDialogComponent, {
      data: { feedUrl: this.rssFeedForm.get('feedUrl')!.value }
    });
  }
}