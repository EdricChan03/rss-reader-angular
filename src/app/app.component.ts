import { DomSanitizer } from '@angular/platform-browser';
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
	constructor(private shared: Shared, private dom: DomSanitizer){}
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
	aboutThisApp() {
		let aboutMsg = `
		<div style="margin-bottom: 4px">
		<h3 style="margin: 0">RSS Reader</h3>
		<strong><small>Version 1.2.2</small></strong>
		</div>
		<p>This RSS reader app is made by Edric which is based on a fork of the original source code by BeCompany.</p>
		<p>The forked repository is available <a href="https://github.com/becompany/angular2-rss-reader-tutorial" target="_blank">here</a> and my version is available <a href="https://github.com/Chan4077/angular-rss-reader" target="_blank">here</a>.</p>
		<p>This repository is hosted on Github Pages. For more info about Github Pages, visit <a href="https://pages.github.io">here</a>.</p>
		<p>This repository also uses <a href="https://angular.io">Angular</a> and <a href="https://material.angular.io">Angular Material</a> which are ©Google 2017. All rights reserved.</p>
		<a href="https://github.com/Chan4077" title="Follow me on Github!" target="_blank"><img src="https://img.shields.io/github/followers/Chan4077.svg?style=social&label=Chan4077" alt="Github social badge"></a>
		<a href="https://twitter.com/EdricChan03" title="Follow me on Twitter!" target="_blank"><img src="https://img.shields.io/twitter/follow/EdricChan03.svg?style=social&label=EdricChan03" alt="Twitter social badge"></a>`;
		this.shared.openAlertDialog({title: "About this app", msg: this.dom.bypassSecurityTrustHtml(aboutMsg), isHtml: true});
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