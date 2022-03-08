import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CodeViewerDialogComponent, ShareDialogComponent } from '../../dialogs';
import { FeedEntry } from '../../models/feed-entry';
import { NewsAPITopHeadlinesArticle } from '../../models/news-api/top-headlines-article';
import { SettingsStorageService } from '../../core/settings-storage/settings-storage.service';
import { StripHtmlTagsPipe } from '../../pipe';

/** Card used to represent an article entry (`FeedEntry` or `NewsAPITopHeadlinesArticle`). */
@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
  hasImage: boolean;
  imageSrc: string;
  target: string;
  /**
   * The feed entry that this card represents.
   * @deprecated Use {@link ArticleCardComponent#article}.
   */
  @Input() feed?: FeedEntry;
  /**
   * The headline article that this card represents.
   * @deprecated Use {@link ArticleCardComponent#article}.
   */
  @Input() headline?: NewsAPITopHeadlinesArticle;
  /** The article that this card represents. */
  @Input() article: FeedEntry | NewsAPITopHeadlinesArticle;

  constructor(
    private dialog: MatDialog,
    private settingsStorage: SettingsStorageService,
    private stripHtmlTags: StripHtmlTagsPipe
  ) { }

  get articleAuthor(): string {
    if (this.article !== undefined) {
      if ('publishedAt' in this.article) {
        if ('author' in this.article && this.article.author !== undefined) {
          if ('author' in this.article && 'source' in this.article &&
            'name' in this.article.source && this.article.source.name !== undefined) {
            return `${this.article.author} | ${this.article.source.name}`;
          } else {
            return this.article.author;
          }
        } else if ('source' in this.article &&
          'name' in this.article.source && this.article.source.name !== undefined) {
          return this.article.source.name;
        } else {
          return;
        }
      } else if ('pubDate' in this.article) {
        return this.article.author;
      }
    }
    return;
  }

  get articlePubDate(): string {
    if (this.article !== undefined) {
      if ('publishedAt' in this.article) {
        return this.article.publishedAt;
      } else if ('pubDate' in this.article) {
        return this.article.pubDate;
      }
    }
    return;
  }

  get articleImg(): string {
    if (this.article !== undefined) {
      if ('urlToImage' in this.article) {
        return this.article.urlToImage;
      } else if ('thumbnail' in this.article) {
        return this.article.thumbnail;
      } else if ('enclosure' in this.article && 'thumbnail' in this.article.enclosure) {
        return this.article.enclosure.thumbnail;
      } else {
        return;
      }
    }
  }

  get articleTitle(): string {
    return this.article?.title;
  }

  get articleDesc(): string {
    return this.stripHtmlTags.transform(this.article?.description ?? '');
  }

  get articleCategories(): string[] {
    if (this.article !== undefined) {
      if ('categories' in this.article) {
        return this.article.categories;
      }
    }
    return [];
  }

  get articleLink(): string {
    if (this.article !== undefined) {
      if ('url' in this.article) {
        return this.article.url;
      } else if ('link' in this.article) {
        return this.article.link;
      }
    }
    return;
  }

  get enclosureIsAudioType(): boolean {
    if (this.article !== undefined) {
      if ('enclosure' in this.article && 'type' in this.article.enclosure) {
        return this.article.enclosure.type.startsWith('audio');
      }
    }
    return false;
  }

  get enclosureIsVideoType(): boolean {
    if (this.article !== undefined) {
      if ('enclosure' in this.article && 'type' in this.article.enclosure) {
        return this.article.enclosure.type.startsWith('video');
      }
    }
    return false;
  }

  get enclosureLink(): string {
    if (this.article !== undefined) {
      if ('enclosure' in this.article && 'link' in this.article.enclosure) {
        return this.article.enclosure.link;
      }
    }
    return;
  }

  ngOnInit() {
    if (this.settingsStorage.settings) {
      if ('openNewTab' in this.settingsStorage.settings) {
        this.target = this.settingsStorage.settings.openNewTab ? '_blank' : '_self';
      }
      if ('showImages' in this.settingsStorage.settings) {
        this.hasImage = this.settingsStorage.settings.showImages;
      }
    }

    // Deprecated usages
    /* eslint-disable import/no-deprecated */
    if (this.feed) {
      this.article = this.feed;
    } else if (this.headline) {
      this.article = this.headline;
    }
    /* eslint-enable import/no-deprecated */
  }

  share() {
    this.dialog.open(ShareDialogComponent, {
      data: this.article
    });
  }

  showCode() {
    this.dialog.open(CodeViewerDialogComponent, {
      data: this.article
    });
  }
}
