import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { FeedComponent } from './feed/feed.component';
import { HeadlinesComponent } from './headlines/headlines.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GuidesListComponent } from './pages/guide-list/guide-list.component';
import { GuideViewerComponent } from './pages/guide-viewer/guide-viewer.component';
import { TestpageComponent } from './testpage/testpage.component';

export const routes: Routes = [
  // Lazy-loaded routes
  {
    path: 'release-notes',
    loadChildren: () => import('./pages/release-notes/release-notes.module').then(m => m.ReleaseNotesModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)
  },
  { path: 'doc/:docTypeId/:docId', component: GuideViewerComponent },
  { path: 'docs', component: GuidesListComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'headlines', component: HeadlinesComponent },
  { path: 'home', redirectTo: '/feed' },
  { path: 'test', component: TestpageComponent },
  { path: '', pathMatch: 'full', redirectTo: '/feed' },
  { path: '**', component: PageNotFoundComponent },
];

const routerOptions: ExtraOptions = environment.routerOptions ? environment.routerOptions : {
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled'
  // TODO: Uncomment once tracing isn't actually enabled on production builds,
  // which it currently is for some reason.
  // enableTracing: !environment.production
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
