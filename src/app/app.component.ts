import { Shared } from './shared';
import { OrderByPipe } from './pipe/orderby.pipe';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";
import { Feed } from './model/feed';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
@Component({
	selector: 'rss-reader',
	templateUrl: './app.component.html'
})
export class AppComponent {
	links = [
		{
			name: "Home",
			url: "home",
			icon: "home"
		},
		{
			name: "Settings",
			url: "settings",
			icon: "settings"
		}
	]
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
	feeds: any;
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
	feedCategory: string;
	categories: any;
	constructor(private dialogRef: MatDialogRef<FeedDialog>, private http: Http) {
		dialogRef.disableClose = true;
	}
	ngOnInit() {
		this.http.get('assets/feedurls.json')
			.map(res => res.json())
			.subscribe(result => {
				this.feeds = result;
			},
			err => console.error(err));
		this.http.get('assets/feedcategories.json')
			.map(res => res.json())
			.subscribe(result => { this.categories = result; },
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
	category: string;
}
export interface Settings {
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
}