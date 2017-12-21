/**
 * Parameters for {@link Navigator#share}
 */
interface NavigatorShareParams {
	/**
	 * The title to share
	 */
	title?: string;
	/**
	 * The text to share
	 */
	text?: string;
	/**
	 * The url to share
	 */
	url?: string;
}
interface Navigator {
	share(opts: NavigatorShareParams): Promise<any>;
}
