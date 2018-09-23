import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DomSanitizer } from '@angular/platform-browser';
import { Settings } from '../model/settings';
import { ShareDialogComponent, CodeViewerDialogComponent } from '../dialogs';
import { SharedService } from '../shared.service';
import { FeedEntry } from '../model/feed-entry';
import { NewsAPITopHeadlinesArticle } from '../model/news-api/top-headlines-article';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {
  hasImage: boolean;
  imageExts = ['jpg', 'jpeg', 'png', 'gif'];
  imageSrc: string;
  target: string;
  imageChanged = false;
  settings: Settings;
  @Input() feed?: FeedEntry;
  @Input() headline?: NewsAPITopHeadlinesArticle;
  constructor(private dialog: MatDialog, private shared: SharedService, private dom: DomSanitizer) { }
  /**
   * Shares the current feed entry or article
   * @param feed The entry/article to share
   */
  share(feed: FeedEntry | NewsAPITopHeadlinesArticle) {
    const dialogRef = this.dialog.open(ShareDialogComponent);
    dialogRef.componentInstance.feed = feed;
  }
  /**
   * Checks if a variable is an empty string
   */
  isEmpty(variable: string): boolean {
    return (!variable || 0 === variable.length);
  }
  /**
   * Shows how the object is structured in a dialog
   * @param feed The feed for the code view
   */
  showCode(feed) {
    const dialogRef = this.dialog.open(CodeViewerDialogComponent);
    dialogRef.componentInstance.feed = feed;
  }
  /**
   * Views the current post in a dialog
   * @param feed The current post
   */
  viewInDialog(feed) {
    // tslint:disable-next-line:max-line-length
    const dialogRef = this.shared.openConfirmDialog({ title: 'Post', msg: this.dom.bypassSecurityTrustHtml(`<iframe src="${feed.link}" width="90%" height="90%"></iframe>`), isHtml: true, panelClass: 'post-dialog' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        // Open post in new tab
        window.open(feed.link);
      } else {

      }
    });
  }
  /**
   * Toggles the image changed
   */
  imageChange() {
    this.imageChanged = !this.imageChanged;
    this.hasImage = !this.hasImage;
  }
  /**
   * Replaces the image
   * @param {boolean} isThumbnail Whether the image is in the thumbnail of `enclosure` object
   */
  replaceImg(isThumbnail?: boolean) {
    this.hasImage = true;
    if (isThumbnail) {
      if (this.feed) {
        if (this.feed.enclosure.thumbnail) {
          // Resolve issue with images where the RSS of the Google Blog is a bit broken
          if (this.feed.enclosure.thumbnail.indexOf('https://www.blog.googlehttps//') !== -1) {
            const temp = this.feed.enclosure.thumbnail.replace('https://www.blog.googlehttps//', 'https://');
            this.imageSrc = encodeURI(temp);
          } else {
            this.imageSrc = encodeURI(this.feed.enclosure.thumbnail);
          }
        } else if (this.feed.thumbnail) {
          // Resolve issue with images where the RSS of the Google Blog is a bit broken
          if (this.feed.thumbnail.indexOf('https://www.blog.googlehttps//') !== -1) {
            const temp = this.feed.thumbnail.replace('https://www.blog.googlehttps//', 'https://');
            this.imageSrc = encodeURI(temp);
          } else {
            this.imageSrc = encodeURI(this.feed.thumbnail);
          }
        }
      } else {
        // Resolve issue with images where the RSS of the Google Blog is a bit broken
        if (this.feed.enclosure.link.indexOf('https://www.blog.googlehttps//') !== -1) {
          const temp = this.feed.enclosure.link.replace('https://www.blog.googlehttps//', 'https://');
          this.imageSrc = encodeURI(temp);
        } else {
          this.imageSrc = encodeURI(this.feed.enclosure.link);
        }
      }
    }
  }
  /**
   * Initialisation
   */
  ngOnInit() {
    if (window.localStorage.getItem('settings')) {
      this.settings = <Settings>JSON.parse(window.localStorage.getItem('settings'));
      if (this.settings.hasOwnProperty('openNewTab')) {
        this.target = this.settings.openNewTab ? '_blank' : '_self';
      }
      if (this.settings.hasOwnProperty('showImages')) {
        this.hasImage = this.settings.showImages;
      }
    }
    if (this.feed) {
      if (this.feed.enclosure && this.feed.enclosure.length === undefined && this.settings.showImages) {
        if (this.feed.enclosure.link) {
          this.replaceImg(false);
        } else if (this.feed.enclosure.thumbnail || this.feed.thumbnail) {
          this.replaceImg(true);
        }
      }
    }
  }
}
