import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe, SlicePipe } from '@angular/common';

// The components to test
import { ArticleCardComponentHarness } from './testing/article-card-harness';
import { ArticleCardComponent } from './article-card.component';
import { ArticleCardModule } from './article-card.module';

// Additional pipes
import { StripHtmlTagsPipe } from '../../pipe/strip-html-tags.pipe';

// Internal app testing utils
import { MockStorage } from '../../core/testing/utils/mock-storage';
import { SettingsStorageService, SETTINGS_STORAGE_PROVIDER } from '../../core/settings-storage/settings-storage.service';

// Models
import { FeedEntry } from '../../models/feed-entry';
import { NewsAPITopHeadlinesArticle } from '../../models/news-api/top-headlines-article';
import { Settings } from '../../models/settings';

// Mock data
import notRealNewsRss from './mocks/notrealnews.net-rss.json';
import newsApiTopHeadlines from './mocks/newsapi.org-top-headlines-sg-tech.json';

describe('ArticleCardComponent', () => {
  let fixture: ComponentFixture<ArticleCardComponent>;
  let component: ArticleCardComponent;
  let componentEl: HTMLElement;
  let loader: HarnessLoader;

  const mockEntry: FeedEntry = notRealNewsRss.items[0];
  const mockArticle: NewsAPITopHeadlinesArticle = newsApiTopHeadlines.articles[0];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ArticleCardModule],
      declarations: [ArticleCardComponent]
    });
  });

  const compileComponents = async (skipDetectChanges: boolean = false) => {
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    componentEl = fixture.nativeElement;
    if (!skipDetectChanges) {
      fixture.detectChanges();
    }
    loader = TestbedHarnessEnvironment.loader(fixture);
  };

  it('should create', async () => {
    await compileComponents();
    component.article = {};
    fixture.detectChanges();

    expect(component).toBeDefined();
  });

  describe('article input', async () => {
    const transformDatePipe = (...args: [any, string?, string?, string?]) => {
      return new DatePipe('en-US').transform(...args);
    };
    const transformSlicePipe = (...args: [string, number, number?]) => {
      return new SlicePipe().transform(...args);
    };
    const transformStripHtmlPipe = (...args: [string]) => {
      return new StripHtmlTagsPipe().transform(...args);
    };

    it('should display a NewsAPI.org article', async () => {
      await compileComponents();
      const card = await loader.getHarness(ArticleCardComponentHarness);
      component.article = mockArticle;
      fixture.detectChanges();

      expect(await card.getHeaderAuthorText()).toEqual(`${mockArticle.author} | ${mockArticle.source?.name}`);
      expect(await card.getHeaderPubDateText()).toEqual(
        transformDatePipe(mockArticle.publishedAt, 'short'));
      expect(await card.getTitleText()).toEqual(mockArticle.title);
      expect(await card.getImageSrc()).toEqual(mockArticle.urlToImage);
      expect(await card.getDescText()).toEqual(
        transformSlicePipe(
          transformStripHtmlPipe(mockArticle.description), 0, 300));
    });

    it('should display an RSS feed item', async () => {
      await compileComponents();
      const card = await loader.getHarness(ArticleCardComponentHarness);
      const entry: FeedEntry = JSON.parse(JSON.stringify(mockEntry));
      entry.description = entry.description.replace(/\r?\n|\r/g, '');
      component.article = entry;
      fixture.detectChanges();

      expect(await card.getHeaderAuthorText()).toEqual(entry.author);
      expect(await card.getHeaderPubDateText()).toEqual(
        transformDatePipe(entry.pubDate, 'short'));
      expect(await card.getTitleText()).toEqual(entry.title);
      expect(await card.getImageSrc()).toEqual(entry.thumbnail);
      expect(await card.getDescText()).toEqual(
        transformSlicePipe(
          transformStripHtmlPipe(entry.description), 0, 300));
    });
  });

  describe('user settings', async () => {
    describe('open new tab setting', async () => {
      it('should set the open article button\'s target to `_blank` if the "Open in new tab" setting is true', async () => {
        // A mock storage is used such that other tests are not affected by the settings change.
        const mockStorage = new MockStorage();
        TestBed.overrideProvider(SETTINGS_STORAGE_PROVIDER, { useFactory: () => mockStorage });
        await compileComponents(/* skipDetectChanges = */ true);
        const settingsService = TestBed.inject<SettingsStorageService<Settings>>(SettingsStorageService);
        settingsService.setSettings({ openNewTab: true });

        const card = await loader.getHarness(ArticleCardComponentHarness);
        const entry: FeedEntry = JSON.parse(JSON.stringify(mockEntry));
        component.article = entry;
        fixture.detectChanges();

        const btn = await card.getOpenActionBtnLoader();
        const btnHost = await btn.host();
        expect(await btnHost.getAttribute('target')).toEqual('_blank', 'Expected the button\'s target to be `_blank`');
      });
    });

    describe('show image setting', async () => {
      it('should not show images if the "Show images" setting is false', async () => {
        // A mock storage is used such that other tests are not affected by the
        // settings change.
        const mockStorage = new MockStorage();
        TestBed.overrideProvider(SETTINGS_STORAGE_PROVIDER, { useFactory: () => mockStorage });
        await compileComponents(/* skipDetectChanges = */ true);
        const settingsService = TestBed.inject<SettingsStorageService<Settings>>(SettingsStorageService);
        settingsService.setSettings({ showImages: false });

        const card = await loader.getHarness(ArticleCardComponentHarness);
        const entry: FeedEntry = JSON.parse(JSON.stringify(mockEntry));
        component.article = entry;
        fixture.detectChanges();

        expect(component.hasImage).toBeFalse();
        expect(await card.getImageSrc()).toBeNull('Expected no image to be shown');
      });
    });
  });
});
