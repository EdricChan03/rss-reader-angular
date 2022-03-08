import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeedEntry } from '../../models/feed-entry';
import { NewsAPITopHeadlinesArticle } from '../../models/news-api/top-headlines-article';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {
  url: string;
  publishedDate: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public articleData: FeedEntry | NewsAPITopHeadlinesArticle
  ) {}

  ngOnInit() {
    if (this.isFeedEntry(this.articleData)) {
      this.url = this.articleData.link;
      this.publishedDate = this.articleData.pubDate.toString();
    } else {
      this.url = this.articleData.url;
      this.publishedDate = this.articleData.publishedAt;
    }
  }
  /**
   * Checks if the `feed` property is of type `FeedEntry`
   */
  isFeedEntry(feed: FeedEntry | NewsAPITopHeadlinesArticle): feed is FeedEntry {
    return (feed as FeedEntry).categories !== undefined;
  }
  shareToFacebook() {
    window.open(`https://www.facebook.com/sharer.php?u=${encodeURI(this.url)}`, '');
  }
  shareToTwitter() {
    const text = encodeURI(`Check out this blogpost by ${this.articleData.author}\
    published on ${this.publishedDate} titled "${this.articleData.title}"!')}`);
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
      // eslint-disable-next-line max-len
      alert('To share natively, please enable the \'Experimental Web Platform Features\' flag in chrome://flags. Otherwise, it might not be supported on your platform right now.');
    }
  }
}
