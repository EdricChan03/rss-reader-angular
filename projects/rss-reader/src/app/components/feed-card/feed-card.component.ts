import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CodeViewerDialogComponent, ShareDialogComponent } from '../dialogs';
import { FeedEntry } from '../../models/feed-entry';
import { NewsAPITopHeadlinesArticle } from '../../models/news-api/top-headlines-article';
import { Settings } from '../../models/settings';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {
  hasImage: boolean;
  imageSrc: string;
  target: string;
  settings: Settings;
  @Input() feed?: FeedEntry;
  @Input() headline?: NewsAPITopHeadlinesArticle;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    if (window.localStorage.getItem('settings')) {
      this.settings = JSON.parse(window.localStorage.getItem('settings')) as Settings;
      if (this.settings.hasOwnProperty('openNewTab')) {
        this.target = this.settings.openNewTab ? '_blank' : '_self';
      }
      if (this.settings.hasOwnProperty('showImages')) {
        this.hasImage = this.settings.showImages;
      }
    }
    if (this.feed) {
      if ((this.feed.thumbnail || (this.feed.enclosure && this.feed.enclosure.length === undefined)) && this.settings.showImages) {
        if (this.feed.enclosure.thumbnail || this.feed.thumbnail) {
          this.replaceImg(true);
        } else if (this.feed.enclosure.link) {
          this.replaceImg(false);
        }
      }
    }
  }

  share(article: FeedEntry | NewsAPITopHeadlinesArticle) {
    this.dialog.open(ShareDialogComponent, {
      data: article
    });
  }

  isEmpty(variable: string): boolean {
    return (!variable || 0 === variable.length);
  }

  showCode(article) {
    this.dialog.open(CodeViewerDialogComponent, {
      data: article
    });
  }

  replaceImg(isThumbnail?: boolean) {
    this.hasImage = true;
    if (isThumbnail) {
      if (this.feed) {
        if (this.feed.enclosure.thumbnail) {
          this.imageSrc = encodeURI(this.feed.enclosure.thumbnail);
        } else if (this.feed.thumbnail) {
          this.imageSrc = encodeURI(this.feed.thumbnail);
        }
      } else {
        this.imageSrc = encodeURI(this.feed.enclosure.link);
      }
    }
  }
}
