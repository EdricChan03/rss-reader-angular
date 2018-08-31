import { Component, OnInit } from '@angular/core';

import { FeedCategory } from '../../model/feed-category';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Feed } from '../../model/feed';
import { FeedChannel } from '../../model/feed-channel';

@Component({
  selector: 'app-feed-dialog',
  templateUrl: './feed-dialog.component.html'
})
// tslint:disable-next-line:component-class-suffix
export class FeedDialog implements OnInit {
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
  feedData: AngularFirestoreDocument<FeedCategory>;
  constructor(
    private dialogRef: MatDialogRef<FeedDialog>,
    private http: HttpClient,
    private fb: FormBuilder,
    private afFs: AngularFirestore
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
    // console.log(this.feeds);
    // console.log(name);
    // this.feeds.filter(feedUrls => {
    //   return feedUrls.channels.filter(feedChannel => {
    //     console.log(feedChannel);
    //     // return feedChannel.feedName.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
    //     // feedChannel.feedUrl.toLowerCase().indexOf(name.toLowerCase()) === 0;
    //     return feedChannel.feedUrl.toLowerCase().includes(name.toLowerCase());
    //   });
    // });
    // tslint:disable-next-line:max-line-length
    return this.feeds.filter((element) => 	element.channels.some((subElement) => subElement.feedUrl.includes(name) || subElement.feedName.includes(name)));
  }
  private _filterGroup(value: string): FeedCategory[] {
    return this.feeds;
  }
  // displayFn(feedChannel?: FeedChannel): string | undefined {
  //   return feedChannel ? feedChannel.feedName : undefined;
  // }
}
