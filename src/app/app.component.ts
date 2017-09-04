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
	getStarted: boolean = false;
	feedUrl: string;
	feeds: FeedEntry[];
	apiKey: string;
	isRefreshing: boolean = false;
	hasError: boolean = false;
	refreshStatus: string = "Hold up, we're getting the RSS feed for the channel you selected.";
	rssToJsonServiceBaseUrl: string = 'https://api.rss2json.com/v1/api.json?rss_url=';
	rssToJsonServiceApiUrl: string = '&api_key=';
	constructor(
		private dialog: MdDialog,
		private snackbar: MdSnackBar,
		private http: Http
	) { }
	reload() {
		window.location.reload(true);
	}
	refreshFeed() {
		this.isRefreshing = true;
		this.feeds = [];
		let localUrl: string;
		if (window.localStorage.getItem('feedUrl')) {
			localUrl = window.localStorage.getItem('feedUrl');
		} else {
			localUrl = "https://www.blog.google/rss/";
		}
		// Adds 1s of delay to provide user's feedback.
		this.http.get(this.rssToJsonServiceBaseUrl + localUrl + this.rssToJsonServiceApiUrl + this.apiKey).delay(2000).map(res => res.json()).subscribe(result => {
			this.feeds = result.items;
			this.isRefreshing = false;
		}, error => {
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
	settings() {
		this.dialog.open(SettingsDialog);
	}
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
	}
}

@Component({
	selector: 'settings-dialog',
	templateUrl: './settings.dialog.html'
})
export class SettingsDialog implements OnInit {
	settings: Settings;
	constructor(private dialogRef: MdDialogRef<SettingsDialog>) { }
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
	feedUrl: string;
	feeds: RSSSource[];
	apiKey: string;
	publishFeedUrl: boolean = false;
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