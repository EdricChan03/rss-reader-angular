import { OptionsDialog } from '../dialogs/index';
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
	getStarted: boolean = false;
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
	isRefreshing: boolean = false;
	/**
	 * Shows the reload button
	 */
	hasError: boolean = false;
	/**
	 * The refresh status present when refreshing the RSS
	 */
	refreshStatus: string = "Hold up while we're getting the RSS feed for the channel you selected.";
	/**
	 * The RSS2Json website base URL
	 */
	rssToJsonServiceBaseUrl: string = 'https://api.rss2json.com/v1/api.json?rss_url=';
	/**
	 * The RSS2Json website api key url
	 */
	rssToJsonServiceApiUrl: string = '&api_key=';
	takingForeverToLoadTimeout: any;
	isSmallScreen: boolean;
	;
	constructor(
		private breakpointObserver: BreakpointObserver,
		private dialog: MatDialog,
		private http: HttpClient,
		private shared: SharedInjectable,
		private router: Router
	) {
		const layoutChanges = breakpointObserver.observe('(max-width: 599px)');
		layoutChanges.subscribe(result => {
			if (result.matches) {
				this.isSmallScreen = true;
			} else {
				this.isSmallScreen = false;
			}
		})
		// this.isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
	}
	options() {
		this.dialog.open(OptionsDialog);
	}
	/**
	 * Reloads the website
	 */
	reload() {
		this.shared.openConfirmDialog({ msg: "Are you sure you want to refresh? Changes will not be saved!", title: "Confirmation" }).afterClosed().subscribe(result => {
			if (result == 'ok') {
				window.location.reload(true);
			}
		})
	}
	/**
	 * Refreshes the feed
	 * Not to be confused with {@link reload}
	 */
	refreshFeed(tryAgain?: boolean) {
		if (tryAgain) {
			clearTimeout(this.takingForeverToLoadTimeout);
		}
		setTimeout(this.takingForeverToLoadTimeout);
		// Show that it is getting RSS
		this.isRefreshing = true;
		this.getStarted = false;
		// Set to empty array
		this.feeds = [];
		let localUrl: string;
		let feedOpts: FeedOptions | any;
		// Get the feed url from localstorage
		if (window.localStorage.getItem('feedUrl')) {
			localUrl = window.localStorage.getItem('feedUrl');
		} else {
			localUrl = "https://www.blog.google/rss/";
		}
		if (window.localStorage.getItem('feedOptions')) {
			feedOpts = <FeedOptions> JSON.parse(window.localStorage.getItem('feedOptions'));
		} else {

		}
		// Add 1s of delay to provide user feedback.
		this.http.get<any>(`https://api.rss2json.com/v1/api.json?rss_url=${localUrl}&api_key=${this.apiKey}`).delay(1000).subscribe(result => {
			this.feeds = result.items;
			this.isRefreshing = false;
			clearTimeout(this.takingForeverToLoadTimeout);
			this.hasError = false;
		}, error => {
			/*
			 * Error handler
			 * Why did I even implement all this stuff? #lol
			 */
			this.hasError = true;
			let status = error.status;
			switch (status) {
				case 404 || 410:
					this.refreshStatus = "Oh no. An error 404 has occured. Do you have an internet connection? Alternatively, the website may be down now.";
					break;
				case 403:
					this.refreshStatus = "Oh no. Looks like the server just rejected you. Please try again."
					break;
				case 400:
					this.refreshStatus = "Looks like there was something wrong with the way the request was constructed. Please contact the developer @EdricChan03 (Twitter) for help.";
					break;
				case 407:
					this.refreshStatus = "Looks like you did not authenticate with the servers. Please try again."
					break;
				case 500:
					this.refreshStatus = "Oh oh! Looks like there was something wrong with the server. It's not your fault, though. Try clicking on the refresh button again.";
					break;
				case 0:
					this.refreshStatus = "?? I have no idea what I should put here. But, you should probably check your internet connection.";
					break;
			}
		})
	}
	/**
	 * Opens the dialog to select an RSS feed
	 */
	selectRss() {
		let dialogRef = this.dialog.open(FeedDialog);
		dialogRef.afterClosed().subscribe(result => {
			let url = dialogRef.componentInstance.feedUrl;
			this.apiKey = dialogRef.componentInstance.apiKey;
			let publishFeedUrl = dialogRef.componentInstance.publishFeedUrl;
			if (result == 'save') {
				window.localStorage.setItem('feedUrl', url);
				window.localStorage.setItem('apiKey', this.apiKey);
				this.refreshFeed();
				if (publishFeedUrl) {
					this.shared.openSnackBar({ msg: "Adding new channel RSS url...", additionalOpts: { duration: 2000, horizontalPosition: "start" } });
					alert("Please make sure that you have enabled pop-ups in your browser settings.");
					let feedUrl, feedUrlChannel, feedCategory;
					feedUrl = dialogRef.componentInstance.feedUrl;
					feedUrlChannel = dialogRef.componentInstance.feedUrlChannel;
					try {
						feedCategory = dialogRef.componentInstance.feedCategory;
					} catch (error) {
						console.error(error);
					}
					let googleForm = `https://docs.google.com/forms/d/e/1FAIpQLSca8Iug_FPflBOHJdUN4KUBrUurOLjcyHAWqkn0_TTJ1oYmRQ/viewform?usp=pp_url&entry.133779622=${feedUrlChannel}&entry.1135652000=${feedUrl}&entry.1218787401=${feedCategory ? feedCategory : 'other'}`;
					window.open(googleForm, '_blank');
				}
			}
		})
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
		this.takingForeverToLoadTimeout = setTimeout(() => {
			// This is the *BEST* status I can put...
			this.refreshStatus = "Oh dear. This is taking a while to load. Maybe try checking if you have an active connection or reloading?";
			this.hasError = true;
			// Timeout ception (#cringyprogrammerjokes #lol)
			setTimeout(() => {
				this.refreshStatus = "Wow. You MUST have a REALLY slow internet connection (or you're on mobile data... Sorry for that then...). Why don't you try turning your wifi off and on? Or try clicking/ tapping the refresh button.";
				setTimeout(() => {
					// I don't even know...
					this.refreshStatus = "Oh, my! It's been 30 seconds and your internet is still not working. Or you did not set up your internet properly. Or other things. Why don't you go rest outside instead? Like read a book?";
				}, 17000);
			}, 8000);
		}, 5000);
	}

}

export interface FeedOptions {
	/**
	 * The max number of posts to show
	 * @type {number}
	 */
	amount: number;
}