import { Component, OnInit } from '@angular/core';

import { FeedUrl } from '../../model/feed-urls';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';

@Component({
	selector: 'app-feed-dialog',
	templateUrl: './feed-dialog.component.html'
})
// tslint:disable-next-line:component-class-suffix
export class FeedDialog implements OnInit {
	feedControl = new FormControl();
	/**
	 * The feed URL
	 */
	feedUrl: string;
	/**
	 * The list of feeds
	 * Available at {@link `/assets/feedurls.json`}
	 */
	feeds: FeedUrl[];
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
	filteredOptions: Observable<FeedUrl[]>;
	constructor(private dialogRef: MatDialogRef<FeedDialog>, private http: HttpClient) {
		dialogRef.disableClose = true;
	}
	ngOnInit() {
		this.http.get<FeedUrl[]>('assets/feedurls.json')
			.subscribe(result => {
				this.feeds = result;
				this.filteredOptions = this.feedControl.valueChanges
					.pipe(
						startWith(''),
						map(value => this.filter(value))
					);
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
	filter(name: string): FeedUrl[] {
		return this.feeds.filter(option => {
			return option.channels.filter(option2 => {
				option2.name.toLowerCase().indexOf(name.toLowerCase()) === 0 ||
					option2.feedUrl.toLowerCase().indexOf(name.toLowerCase()) === 0;
			})
		})
	}
	displayFn(feedUrl?: FeedUrl): string | undefined {
		return feedUrl ? feedUrl.name : undefined;
	}
}