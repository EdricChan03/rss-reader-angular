export interface Settings {
  /**
   * Whether to allow multiple RSS feeds
   *
   * @deprecated Option doesn't do anything and has been removed from settings
   */
  multipleRss?: boolean;
  /**
   * Opens posts in a new tab
   */
  openNewTab?: boolean;
  /**
   * Whether to show images for feed card
   */
  showImages?: boolean;
  /**
   * The theme for the app
   */
  theme?: 'indigo-pink' | 'deeppurple-amber' | 'pink-bluegrey' | 'purple-green';
  /**
   * Whether to show the offline snackbar
   *
   * @deprecated Option doesn't do anything and has been removed from settings
   */
  showOfflineSnackBar?: boolean;
  /**
   * Whether to enable push notifications
   *
   * @deprecated Option doesn't do anything and has been removed from settings
   */
  pushNotifications?: boolean;
  /**
   * Whether to enable notifications
   *
   * @deprecated Option doesn't do anything and has been removed from settings
   */
  notifications?: boolean;
  /**
   * The maximum number of notifications to show
   *
   * @deprecated Option doesn't do anything and has been removed from settings
   */
  maxNotifications?: number | any;
  /** Whether the user should be notified when a new release of the app is out. */
  notifyNewReleases?: boolean;
}
