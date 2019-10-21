import { WebComponent } from './devices/web/web.component';
import { GuideViewerComponent } from './pages/guide-viewer/guide-viewer.component';
import { GuidesListComponent } from './pages/guide-list/guide-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestpageComponent } from './testpage/testpage.component';
import { SettingsComponent } from './settings/settings.component';
import { FeedComponent } from './feed/feed.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndroidComponent } from './devices/android/android.component';
import { IOSComponent } from './devices/ios/ios.component';
import { ExploreComponent } from './explore/explore.component';
import { HeadlinesComponent } from './headlines/headlines.component';
import { ReleaseNotesComponent } from './components/release-notes/release-notes.component';

const APP_ROUTES: Routes = [
  {
    path: 'devices', children: [
      { path: 'android', component: AndroidComponent },
      { path: 'ios', component: IOSComponent },
      { path: 'web', component: WebComponent },
      { path: '**', redirectTo: '/devices/android' }
    ]
  },
  { path: 'doc/:docTypeId/:docId', component: GuideViewerComponent },
  { path: 'docs', component: GuidesListComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'headlines', component: HeadlinesComponent },
  { path: 'home', redirectTo: '/feed' },
  { path: 'release-notes', component: ReleaseNotesComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'test', component: TestpageComponent },
  { path: '', pathMatch: 'full', redirectTo: '/feed' },
  { path: '**', component: PageNotFoundComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);