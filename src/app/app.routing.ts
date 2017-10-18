import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestpageComponent } from './testpage/testpage.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'page-not-found'},
	{ path: 'page-not-found', component: PageNotFoundComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'settings', component: SettingsComponent },
	{ path: 'test', component: TestpageComponent },
	{ path: '**', redirectTo: 'home'}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);