import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { FeedEntry } from './model/feed-entry';
import { MdDialogRef, MdDialog } from "@angular/material";

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

	private feedUrl: string;
	feeds: Array<FeedEntry> = [];
	apiKey: string;
	constructor(
		private feedService: FeedService,
		private dialog: MdDialog
	) { }
	refreshFeed() {
		this.feeds = [];
		let localUrl: string;
		if (window.localStorage.getItem('feedUrl')) {
			localUrl = window.localStorage.getItem('feedUrl');
		} else {
			localUrl = "https://www.blog.google/rss/";
		}
		// Adds 1s of delay to provide user's feedback.
		this.feedService.getFeedContent(localUrl, this.apiKey).delay(1000)
			.subscribe(
			feed => {
				this.feeds = feed.items;
				console.log(this.feeds);
			});
	}
	settings() {
		this.dialog.open(SettingsDialog);
	}
	selectRss() {
		let dialogRef = this.dialog.open(FeedDialog);
		dialogRef.afterClosed().subscribe(result => {
			let url = dialogRef.componentInstance.feedUrl;
			this.apiKey = dialogRef.componentInstance.apiKey;
			console.log(url);
			if (result == 'save') {
				window.localStorage.setItem('feedUrl', url);
				window.localStorage.setItem('apiKey', this.apiKey);
				this.refreshFeed();
			}
		})
	}
	ngOnInit() {
		if (window.localStorage.getItem('apiKey')) {
			this.apiKey = window.localStorage.getItem('apiKey');
		}
	}
}

@Component({
	selector: 'settings-dialog',
	templateUrl: './settings.dialog.html'
})
export class SettingsDialog implements OnInit {
	settings: any;
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
				multipleRss: false
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