import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FeedEntry } from './model/feed-entry';
import { MdDialogRef, MdDialog, MdSnackBar } from "@angular/material";
import { Feed } from './model/feed';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
	constructor(
		private dialog: MdDialog,
		private snackbar: MdSnackBar,
		private http: Http
	) { }
	/**
	 * Reloads the website
	 */
	reload() {
		window.location.reload(true);
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
		// Get the feed url from localstorage
		if (window.localStorage.getItem('feedUrl')) {
			localUrl = window.localStorage.getItem('feedUrl');
		} else {
			localUrl = "https://www.blog.google/rss/";
		}
		// Add 2s of delay to provide user feedback.
		this.http.get(this.rssToJsonServiceBaseUrl + localUrl + this.rssToJsonServiceApiUrl + this.apiKey).delay(2000).map(res => res.json()).subscribe(result => {
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
	 * Opens the settings dialog
	 */
	settings() {
		this.dialog.open(SettingsDialog);
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
					this.snackbar.open("Adding new channel RSS url...", null, { duration: 200 });
					alert("Please make sure that you have enabled pop-ups in your browser settings.");
					let feedUrl, feedUrlChannel;
					feedUrl = dialogRef.componentInstance.feedUrl;
					feedUrlChannel = dialogRef.componentInstance.feedUrlChannel;
					window.open("https://docs.google.com/forms/d/e/1FAIpQLSca8Iug_FPflBOHJdUN4KUBrUurOLjcyHAWqkn0_TTJ1oYmRQ/viewform?usp=pp_url&entry.133779622=" + feedUrlChannel + "&entry.1135652000=" + feedUrl, '_blank');
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
		

@Component({
	selector: 'settings-dialog',
	templateUrl: './settings.dialog.html'
})
export class SettingsDialog implements OnInit {
	settings: Settings;
	constructor(private dialogRef: MdDialogRef<SettingsDialog>) { }
	/**
	 * Saves the settings
	 */
	save() {
		window.localStorage.setItem('settings', JSON.stringify(this.settings));
		this.dialogRef.close();
	}
	ngOnInit() {
		if (window.localStorage.getItem('settings')) {
			this.settings = JSON.parse(window.localStorage.getItem('settings'));
		} else {
			this.settings = {
				multipleRss: false,
				openNewTab: true
			}
		}
	}
}

@Component({
	selector: 'feed-opts-dialog',
	templateUrl: './feed.dialog.html'
})
export class FeedDialog implements OnInit {
	/**
	 * The feed URL
	 */
	feedUrl: string;
	/**
	 * The list of feeds
	 * Available at {@link `/assets/feedurls.json`}
	 */
	feeds: RSSSource[];
	/**
	 * The API key
	 */
	apiKey: string;
	/**
	 * Whether to publish the feed url (basicallt opening in a google form with prefilled data)
	 */
	publishFeedUrl: boolean = false;
	/**
	 * The feed URL channel for the publishing
	 */
	feedUrlChannel: string;
	constructor(private dialogRef: MdDialogRef<FeedDialog>, private http: Http) { }
	ngOnInit() {
		this.http.get('assets/feedurls.json')
			.map(res => res.json())
			.subscribe(result => { this.feeds = result; },
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
export interface RSSSource {
	name: string;
	feedUrl: string;
	type?: string;
}
export interface Settings {
	/**
	 * Whether to allow multiple RSS feeds
	 * @todo Start actual implementation
	 */
	multipleRss?: boolean;
	/**
	 * Opens posts in a new tab
	 */
	openNewTab?: boolean;
}