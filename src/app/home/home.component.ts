import { RSSChannelInfoDialog } from '../dialogs/rss-channel-info-dialog/rss-channel-info.dialog';
import { ActionIconService } from '../actionitem.service';
import { OptionsDialog } from '../dialogs';
import { FeedDialog, Settings } from '../app.component';
import { Router } from '@angular/router';
import { SharedInjectable } from '../shared';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FeedEntry } from '../model/feed-entry';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

	/**
 	* Whether it's the first time that the user has used the website. (Can be reset by clearing `localStorage`)
 	*/
	getStarted = false;
	/**
	 * The feed URL
	 */
	feedUrl: string;
	/**
	 * Feeds for the RSS
	 */
	feeds: FeedEntry[];
	/**
	 * The API key to do http requests with
	 */
	apiKey: string;
	/**
	 * Whether it is currently refreshing the RSS feed
	 */
	isRefreshing = false;
	/**
	 * Shows the reload button
	 */
	hasError = false;
	/**
	 * The refresh status present when refreshing the RSS
	 */
	refreshStatus = 'Hold up while we\'re getting the RSS feed for the channel you selected.';
	/**
	 * The RSS2Json website base URL
	 */
	rssToJsonServiceBaseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
	/**
	 * The RSS2Json website api key url
	 */
	rssToJsonServiceApiUrl = '&api_key=';
	isSmallScreen: boolean;
	constructor(
		private breakpointObserver: BreakpointObserver,
		private dialog: MatDialog,
		private http: HttpClient,
		private shared: SharedInjectable,
		private router: Router,
		private actionIconService: ActionIconService
	) {
		const layoutChanges = breakpointObserver.observe('(max-width: 599px)');
		layoutChanges.subscribe(result => {
			if (result.matches) {
				this.isSmallScreen = true;
			} else {
				this.isSmallScreen = false;
			}
		});
		// this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
	}
	get isMobile() {
		return this.shared.isMobile();
	}
	options() {
		const dialogRef = this.dialog.open(OptionsDialog);
		dialogRef.afterClosed().subscribe(result => {
			if (result !== null) {
				this.refreshFeed();
			}
		});
	}
	openRSSInfoDialog() {
		this.dialog.open(RSSChannelInfoDialog);
	}
	/**
	 * Reloads the website
	 */
	reload() {
		// tslint:disable-next-line:max-line-length
		this.shared.openConfirmDialog({ msg: 'Are you sure you want to refresh? Changes will not be saved!', title: 'Confirmation' }).afterClosed().subscribe(result => {
			if (result === 'ok') {
				window.location.reload(true);
			}
		});
	}
	/**
	 * Refreshes the feed
	 * Not to be confused with {@link reload}
	 * @param tryAgain
	 */
	refreshFeed() {
		// Show that it is getting RSS
		this.isRefreshing = true;
		this.getStarted = false;
		// Set to empty array
		this.feeds = [];
		let feedOpts: FeedOptions;
		if (window.localStorage.getItem('feedOptions')) {
			feedOpts = <FeedOptions>JSON.parse(window.localStorage.getItem('feedOptions'));
		}
		if (feedOpts) {
			this._getFeedWithOpts(feedOpts);
		} else {
			this._getFeedWithNoOpts();
		}
	}
	private _getFeedUrl(): string {
		let localUrl: string;
		// Get the feed url from localstorage
		if (window.localStorage.getItem('feedUrl')) {
			localUrl = window.localStorage.getItem('feedUrl');
		} else {
			localUrl = 'https://www.blog.google/rss/';
		}
		return localUrl;
	}
	private _getFeedWithOpts(opts: FeedOptions) {
		if (opts) {
			if (opts.amount) {
				// Add 1s of delay to provide user feedback.
				// tslint:disable-next-line:max-line-length
				this.http.get<any>(`https://api.rss2json.com/v1/api.json?rss_url=${this._getFeedUrl()}&api_key=${this.apiKey}&count=${opts.amount}`).subscribe(result => {
					this.feeds = result.items;
					this.isRefreshing = false;
					this.hasError = false;
				}, error => {
					this.hasError = true;
					console.error(error);
					// tslint:disable-next-line:max-line-length
					const snackBarRef = this.shared.openSnackBar({ msg: `Error ${error.code}: ${error.message}`, action: 'Retry', additionalOpts: { panelClass: 'mat-elevation-z3' } });
					snackBarRef.onAction().subscribe(() => {
						this.refreshFeed();
					});
				});
			}
		}
	}
	private _getFeedWithNoOpts() {
		// Add 1s of delay to provide user feedback.
		this.http.get<any>(`https://api.rss2json.com/v1/api.json?rss_url=${this._getFeedUrl()}&api_key=${this.apiKey}`).subscribe(result => {
			this.feeds = result.items;
			this.isRefreshing = false;
			this.hasError = false;
		}, error => {
			this.hasError = true;
			console.error(error);
			// tslint:disable-next-line:max-line-length
			const snackBarRef = this.shared.openSnackBar({ msg: `Error${error.code ? ' ' + error.code + ':' : ':'} ${error.message}`, action: 'Retry', additionalOpts: { panelClass: 'mat-elevation-z3', horizontalPosition: 'start' } });
			snackBarRef.onAction().subscribe(() => {
				this.refreshFeed();
			});
		});

	}
	/**
	 * Opens the dialog to select an RSS feed
	 */
	selectRss() {
		const dialogRef = this.dialog.open(FeedDialog);
		dialogRef.afterClosed().subscribe(result => {
			const url = dialogRef.componentInstance.feedUrl;
			this.apiKey = dialogRef.componentInstance.apiKey;
			const publishFeedUrl = dialogRef.componentInstance.publishFeedUrl;
			if (result === 'save') {
				window.localStorage.setItem('feedUrl', url);
				window.localStorage.setItem('apiKey', this.apiKey);
				this.refreshFeed();
				if (publishFeedUrl) {
					this.shared.openSnackBar({ msg: 'Adding new channel RSS url...', additionalOpts: { duration: 2000, horizontalPosition: 'start' } });
					alert('Please make sure that you have enabled pop-ups in your browser settings.');
					let feedUrl, feedUrlChannel, feedCategory;
					feedUrl = dialogRef.componentInstance.feedUrl;
					feedUrlChannel = dialogRef.componentInstance.feedUrlChannel;
					try {
						feedCategory = dialogRef.componentInstance.feedCategory;
					} catch (error) {
						console.error(error);
					}
					// tslint:disable-next-line:max-line-length
					const googleForm = `https://docs.google.com/forms/d/e/1FAIpQLSca8Iug_FPflBOHJdUN4KUBrUurOLjcyHAWqkn0_TTJ1oYmRQ/viewform?usp=pp_url&entry.133779622=${feedUrlChannel}&entry.1135652000=${feedUrl}&entry.1218787401=${feedCategory ? feedCategory : 'other'}`;
					window.open(googleForm, '_blank');
				}
			}
		});
	}
	ngOnInit() {
		if (window.localStorage.getItem('apiKey')) {
			this.apiKey = window.localStorage.getItem('apiKey');
		}
		if (!window.localStorage.getItem('feedUrl')) {
			this.selectRss();
		}
		if (!window.localStorage.getItem('hasLaunched')) {
			this.getStarted = true;
			window.localStorage.setItem('hasLaunched', JSON.stringify(true));
		}
		this.refreshFeed();
		this.actionIconService.addActionIcon({
			title: 'Select RSS...', icon: 'rss_feed', showAsAction: true, onClickListener: () => {
				this.selectRss();
			}
		});
		this.actionIconService.addActionIcon({
			title: 'RSS Options...', icon: 'tune', onClickListener: () => {
				this.options();
			}
		});
		this.actionIconService.addActionIcon({
			title: 'Refresh feed', icon: 'sync', onClickListener: () => {
				this.refreshFeed();
			}
		});
		if (window.localStorage.getItem('feedUrl')) {
			this.actionIconService.addActionIcon({
				title: 'RSS Channel info.', icon: 'information', onClickListener: () => {
					this.openRSSInfoDialog();
				}
			});
		}
	}

}

export interface FeedOptions {
	/**
	 * The max number of posts to show
	 * @type {number}
	 */
	amount: number;
}
