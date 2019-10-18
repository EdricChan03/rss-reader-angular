import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { FeedEntry } from '../../model/feed-entry';
import { NewsAPITopHeadlinesArticle } from '../../model/news-api/top-headlines-article';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {
  url: string;
  publishedDate: string;
  feed: FeedEntry | NewsAPITopHeadlinesArticle;
  constructor(
    private dialogRef: MatDialogRef<ShareDialogComponent>
  ) {
    dialogRef.disableClose = true;
  }
  /**
   * Checks if the `feed` property is of type `FeedEntry`
   */
  isFeedEntry(feed: FeedEntry | NewsAPITopHeadlinesArticle): feed is FeedEntry {
    return (feed as FeedEntry).categories !== undefined;
  }
  ngOnInit() {
    if (this.isFeedEntry(this.feed)) {
      this.url = this.feed.link;
      this.publishedDate = this.feed.pubDate.toString();
    } else {
      this.url = this.feed.url;
      this.publishedDate = this.feed.publishedAt;
    }
  }
  shareToFacebook() {
    window.open(`https://www.facebook.com/sharer.php?u=${encodeURI(this.url)}`, '');
  }
  shareToTwitter() {
    const text = encodeURI(`Check out this blogpost by ${this.feed.author}\
    published on ${this.publishedDate} titled "${this.feed.title}"!')}`);
    window.open(`https://twitter.com/intent/tweet?url=${encodeURI(this.url)}&text=${text}`);
  }
  shareNative() {
    if (navigator.share !== undefined) {
      navigator.share({
        title: document.title,
        text: 'Check out this page about"' + document.title + '"!',
        url: document.URL
      }).then(() => console.log('Successfully shared current page.'))
        .catch((error) => console.error('Error sharing current page: ', error));
    } else {
      // tslint:disable-next-line:max-line-length
      alert('To share natively, please enable the \'Experimental Web Platform Features\' flag in chrome://flags. Otherwise, it might not be supported on your platform right now.');
    }
  }
  dismiss() {
    this.dialogRef.close();
  }
}
