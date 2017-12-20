import { OverlayService } from './overlay.service';
import { OnboardingOverlayComponent } from './overlays/onboarding-overlay/onboarding-overlay.component';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedInjectable } from './shared';
import { OrderByPipe } from './pipe/orderby.pipe';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSidenav } from '@angular/material/sidenav';
import { Feed } from './model/feed';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, NavigationStart } from '@angular/router';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayContainer, Overlay } from '@angular/cdk/overlay';
import { environment } from '../environments/environment';
import { ActionIconService, ActionIcon } from './actionitem.service';

@Component({
	selector: 'rss-reader',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
	@ViewChild('left') sidenav: MatSidenav;
	settings: Settings;
	environment = environment;
	links = [
		{
			name: 'Home',
			url: 'home',
			icon: 'home'
		},
		{
			name: 'Settings',
			url: 'settings',
			icon: 'settings'
		},
		{
			name: 'Guides',
			url: 'docs',
			icon: 'book'
		},
		{
			name: 'Explore',
			url: 'explore',
			icon: 'explore'
		}
	];
	constructor(
		private shared: SharedInjectable,
		private dom: DomSanitizer,
		private overlayContainer: OverlayContainer,
		private overlayService: OverlayService,
		private actionItemService: ActionIconService,
		private router: Router,
		private overlay: Overlay
	) {
		router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				if (router.url === '/home') {
					this.actionItemService.removeActionItemByTitle('Configure RSS');
				}
			}
		});
	}
	get isOffline() {
		return !navigator.onLine;
	}
	get isMobile() {
		return this.shared.isMobile();
	}
	get isSidenavOpen() {
		if (this.sidenav.opened) {
			return true;
		} else {
			return false;
		}
	}
	aboutThisApp() {
		const aboutMsg = `
		<div style="margin-bottom: 4px">
		<h3 style="margin: 0">RSS Reader</h3>
		<strong><small>Version 1.2.2</small></strong>
		</div>
		<p>This RSS reader app is made by Edric which is based on a fork of the original source code by BeCompany.</p>
		<p>The forked repository is available <a href="https://github.com/becompany/angular2-rss-reader-tutorial" target="_blank">here</a> and my version is available <a href="https://github.com/Chan4077/rss-reader" target="_blank">here</a>.</p>
		<p>This repository is hosted on Github Pages. For more info about Github Pages, visit <a href="https://pages.github.io">here</a>.</p>
		<p>This repository also uses <a href="https://angular.io">Angular</a> and <a href="https://material.angular.io">Angular Material</a> which are ©Google 2017. All rights reserved.</p>
		<a href="https://github.com/Chan4077" title="Follow me on Github!" target="_blank"><img src="https://img.shields.io/github/followers/Chan4077.svg?style=social&label=Chan4077" alt="Github social badge"></a>
		<a href="https://twitter.com/EdricChan03" title="Follow me on Twitter!" target="_blank"><img src="https://img.shields.io/twitter/follow/EdricChan03.svg?style=social&label=EdricChan03" alt="Twitter social badge"></a>`;
		this.shared.openAlertDialog({ title: 'About this app', msg: this.dom.bypassSecurityTrustHtml(aboutMsg), isHtml: true });
	}
	showOnboardingOverlay() {
		this._createOverlay();
	}
	private _createOverlay() {
		this.overlayService.createOverlay(new ComponentPortal(OnboardingOverlayComponent), {
			positionStrategy: this.overlay.position()
				.global()
				.centerHorizontally()
				.centerVertically(),
			hasBackdrop: true,
			backdropClass: 'dark-backdrop'
		}, true);
	}
	ngOnDestroy() {
		this.overlayService.destroyOverlay();
	}
	ngOnInit() {
		if (window.localStorage.getItem('hasLaunched')) {
			if (!JSON.parse(window.localStorage.getItem('hasLaunched'))) {
				window.localStorage.setItem('hasLaunched', JSON.stringify(true));
				this.showOnboardingOverlay();
			}
		}
		if (window.localStorage.getItem('settings')) {
			this.settings = <Settings>JSON.parse(window.localStorage.getItem('settings'));
			if (this.settings.theme) {
				document.getElementsByTagName('body')[0].classList.add(this.settings.theme);
				this.overlayContainer.getContainerElement().classList.add(this.settings.theme);
			} else {
				console.warn('Theme setting was not found. Using default...');
				document.getElementsByTagName('body')[0].classList.add('indigo-pink');
				this.overlayContainer.getContainerElement().classList.add('indigo-pink');
			}
		} else {
			const tempSettings: Settings = { showImages: true, multipleRss: false, openNewTab: true };
			window.localStorage.setItem('settings', JSON.stringify(tempSettings));
			// tslint:disable-next-line:max-line-length
			const snackBarRef = this.shared.openSnackBar({ msg: 'Settings not found. Click on the \'Reload\' button to reload.', action: 'Reload', additionalOpts: { horizontalPosition: 'start', extraClasses: ['mat-elevation-z3'], duration: 5000 } });
			snackBarRef.onAction().subscribe(() => {
				window.location.reload(true);
			});
		}
		if (this.isOffline) {
			console.log('User is offline');
			// tslint:disable-next-line:max-line-length
			const snackBarRef = this.shared.openSnackBar({ msg: 'You are currently offline. Some features may not be available.', action: 'Retry', additionalOpts: { extraClasses: ['mat-elevation-z2'], horizontalPosition: 'start' } });
			snackBarRef.onAction().subscribe(() => {
				window.location.reload(true);
			});
		}

		this.actionItemService.addActionIcon({
			title: 'Reload', icon: 'refresh', showAsAction: true, onClickListener: (ev: Event) => {
				// tslint:disable-next-line:max-line-length
				const dialogRef = this.shared.openConfirmDialog({ title: 'Reload?', msg: 'Ensure that changes are saved before continuing!', disableClose: true });
				dialogRef.afterClosed().subscribe((result) => {
					if (result === 'ok') {
						window.location.reload(true);
					}
				});
			}
		});
	}
}

@Component({
	selector: 'feed-opts-dialog',
	templateUrl: './feed.dialog.html'
})
// tslint:disable-next-line:component-class-suffix
export class FeedDialog implements OnInit {
	/**
	 * The feed URL
	 */
	feedUrl: string;
	/**
	 * The list of feeds
	 * Available at {@link `/assets/feedurls.json`}
	 */
	feeds: any;
	/**
	 * The API key
	 */
	apiKey: string;
	/**
	 * Whether to publish the feed url (basicallt opening in a google form with prefilled data)
	 */
	publishFeedUrl = false;
	/**
	 * The feed URL channel for the publishing
	 */
	feedUrlChannel: string;
	feedCategory: string;
	categories: any;
	constructor(private dialogRef: MatDialogRef<FeedDialog>, private http: HttpClient) {
		dialogRef.disableClose = true;
	}
	ngOnInit() {
		this.http.get('assets/feedurls.json')
			.subscribe(result => {
				this.feeds = result;
			},
			err => console.error(err));
		this.http.get('assets/feedcategories.json')
			.subscribe(result => {
				this.categories = result;
			},
			err => console.error(err));
		if (window.localStorage.getItem('feedUrl')) {
			this.feedUrl = window.localStorage.getItem('feedUrl');
		}
		if (window.localStorage.getItem('apiKey')) {
			this.apiKey = window.localStorage.getItem('apiKey');
		}
	}
}
/**
 * An RSS source
 */
export class RSSSource {
	name: string;
	feedUrl: string;
	type?: string;
	category: string;
}
export class Settings {
	/**
	 * Whether to allow multiple RSS feeds
	 * @todo Start actual implementation
	 * @type {boolean}
	 */
	multipleRss?: boolean;
	/**
	 * Opens posts in a new tab
	 * @type {boolean}
	 */
	openNewTab?: boolean;
	/**
	 * Whether to show images for feed card
	 * @type {boolean}
	 */
	showImages?: boolean;
	/**
	 * The theme for the app
	 */
	theme?: 'indigo-pink' | 'deeppurple-amber' | 'pink-bluegrey' | 'purple-green';
	/**
	 * Whether to show the offline snackbar
	 */
	showOfflineSnackBar?: boolean;
}
