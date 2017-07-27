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
export class AppComponent implements OnInit {

	private feedUrl: string;
	feeds: Array<FeedEntry> = [];

	constructor(
		private feedService: FeedService,
		private dialog: MdDialog
	) { }

	ngOnInit() {
		this.refreshFeed();
	}

	refreshFeed() {
		this.feeds = [];
		let localUrl: string;
		if (window.localStorage.getItem('feedUrl')) {
			localUrl = window.localStorage.getItem('feedUrl');
		} else {
			localUrl = "https://www.blog.google/rss/";
		}
		// Adds 1s of delay to provide user's feedback.
		this.feedService.getFeedContent(localUrl).delay(1000)
			.subscribe(
			feed => this.feeds = feed.items,
			error => console.log(error));
		console.log(this.feeds);
	}
	settings() {
		this.dialog.open(SettingsDialog);
	}
	selectRss() {
		let dialogRef = this.dialog.open(FeedDialog);
		dialogRef.afterClosed().subscribe(result => {
			let url = dialogRef.componentInstance.feedUrl;
			console.log(url);
			if (result == 'save') {
				window.localStorage.setItem('feedUrl', url);
				this.refreshFeed();
			}
		})
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
	constructor(private dialogRef: MdDialogRef<FeedDialog>) { }
	ngOnInit() {
		if (window.localStorage.getItem('feedUrl')) {
			this.feedUrl = window.localStorage.getItem('feedUrl');
		}
	}
}