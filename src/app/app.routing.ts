import { WebComponent } from './devices/web/web.component';
import { GuideViewer } from './pages/guide-viewer/guide-viewer.component';
import { GuidesList } from './pages/guide-list/guide-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestpageComponent } from './testpage/testpage.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndroidComponent } from './devices/android/android.component';
import { IOSComponent } from './devices/ios/ios.component';

const APP_ROUTES: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: 'test', component: TestpageComponent },
	{ path: 'docs', component: GuidesList },
	{ path: 'doc/:docTypeId/:docId', component: GuideViewer },
	{
		path: 'devices', children: [
			{ path: 'android', component: AndroidComponent },
			{ path: 'ios', component: IOSComponent },
			{ path: 'web', component: WebComponent },
			{ path: '**', redirectTo: '/devices/android' }
		]
	},
	{ path: '', pathMatch: 'full', redirectTo: '/home' },
	{ path: '**', component: PageNotFoundComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);