import { Component, OnInit } from '@angular/core';

import { FeedCategory } from '../../model/feed-category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Feed } from '../../model/feed';

@Component({
  selector: 'app-feed-dialog',
  templateUrl: './feed-dialog.component.html'
})
export class FeedDialogComponent implements OnInit {
  /**
   * The list of feeds
   * Available at {@link `/assets/feedurls.json`}
   */
  feeds: FeedCategory[];
  /**
   * The feed URL channel for the publishing
   */
  feedUrlChannel: string;
  feedCategory: string;
  categories: any;
  filteredOptions: Observable<FeedCategory[]>;
  feedUrlValue = '';
  rssFeedForm: FormGroup;
  // feedData: AngularFirestoreDocument<FeedCategory>;
  constructor(
    private dialogRef: MatDialogRef<FeedDialogComponent>,
    private http: HttpClient,
    private fb: FormBuilder,
    // private afFs: AngularFirestore
  ) {
    dialogRef.disableClose = true;
    this.rssFeedForm = fb.group({
      feedUrl: ['', Validators.required],
      publishFeedUrl: false,
      feedUrlChannel: '',
      feedCategory: '',
      apiKey: ['', [Validators.required, Validators.maxLength(40), Validators.minLength(40)]]
    });
  }
  ngOnInit() {
    this.http.get('assets/feedcategories.json')
      .subscribe(result => {
        this.categories = result;
      },
        err => console.error(err));
    this.http.get<Feed>('assets/feedurls.json')
      .subscribe(result => {
        console.log(result);
        console.log(result.feedUrls);
        this.feeds = result.feedUrls;
      },
        err => console.error(err));
    // this.feedData = this.afFs.doc('data/feed');
    setTimeout(() => {
      this.filteredOptions = this.rssFeedForm.get('feedUrl').valueChanges
        .pipe(
          startWith(''),
          map(value => this.filter(value))
        );
    });
    if (window.localStorage.getItem('feedUrl')) {
      this.rssFeedForm.patchValue({ feedUrl: window.localStorage.getItem('feedUrl') });
    }
    if (window.localStorage.getItem('apiKey')) {
      this.rssFeedForm.patchValue({ apiKey: window.localStorage.getItem('apiKey') });
    }
    // setTimeout(() => {
    //   console.log(this.filter('lineage')[0]);
    // }, 10000);
  }
  filter(name: string): FeedCategory[] {
    // tslint:disable-next-line:max-line-length
    return this.feeds.filter((element) => element.channels.some((subElement) => subElement.feedUrl.includes(name) || subElement.feedName.includes(name)));
  }
}
