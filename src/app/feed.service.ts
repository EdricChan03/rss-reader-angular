import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Feed } from './model/feed';

@Injectable()
export class FeedService {

	private rssToJsonServiceBaseUrl: string = 'https://api.rss2json.com/v1/api.json?rss_url=';
	private rssToJsonServiceApiUrl: string = '&api_key=';
	constructor(
		private http: Http
	) { }
	/**
	 * Gets the RSS content
	 * @param {string} url The url to get the json from
	 * @param {string} apiKey The api key
	 */
	getFeedContent(url: string, apiKey: string): Observable<Feed> {
		return this.http.get(this.rssToJsonServiceBaseUrl + url + this.rssToJsonServiceApiUrl + apiKey)
			.map(this.extractFeeds)
			.catch(this.handleError);
	}
	/**
	 * Extracts the feeds
	 * @param {Response} res The response
	 */
	private extractFeeds(res: Response): Feed {
		let feed = res.json();
		return feed || {};
	}
	/**
	 * Error handler
	 * @param {any} error The error
	 */
	private handleError(error: any) {
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg); // log to console instead
		return Observable.throw(errMsg);
	}
}
