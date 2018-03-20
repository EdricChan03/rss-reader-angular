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
	/**
	 * The theme for the app
	 */
	theme?: 'indigo-pink' | 'deeppurple-amber' | 'pink-bluegrey' | 'purple-green';
	/**
	 * Whether to show the offline snackbar
	 */
	showOfflineSnackBar?: boolean;
	/**
	 * Whether to enable push notifications
	 */
	pushNotifications?: boolean;
	/**
	 * Whether to enable notifications
	 */
	notifications?: boolean;
	/**
	 * The maximum number of notifications to show
	 */
	maxNotifications?: number | any;
}
