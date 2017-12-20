import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injectable, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Injectable()
/**
 * A menu item service for the toolbar.
 */
export class ActionIconService {

	private actionItems: ActionIcon[] = [];
	/**
	 * Adds a menu item
	 * @param {ActionIcon} actionItem The menu item
	 */
	addActionIcon(actionItem: ActionIcon) {
		this.actionItems.push(actionItem);
	}
	/**
	 * Gets menu items
	 * @returns {ActionIcon[]}
	 */
	getActionIcons(): ActionIcon[] {
		return this.actionItems;
	}
	/**
	 * An alias of {@link ActionIconService#removeActionIconByIndex} to prevent apps from breaking
	 */
	removeActionIcon(id: number) {
		this.removeActionIconByIndex(id);
	}
	/**
	 * Removes a menu item
	 * @param {number} id The index of the menu item to remove
	 */
	removeActionIconByIndex(id: number) {
		try {
			this.actionItems.splice(id, 1);
		} catch (e) {
			this.throwIdNotFoundError(id);
		}
	}
	/**
	 * Removes an action item by its title
	 */
	removeActionItemByTitle(title: string) {
		try {
			this.actionItems.splice(
				this.actionItems.findIndex((actionIcon: ActionIcon) => {
					return actionIcon.title === title;
				}), 1);
		} catch (e) {
			this.throwTitleNotFoundError(title);
		}
	}
	/**
	 * Removes all menu items
	 */
	removeActionIcons() {
		this.actionItems = [];
	}
	/**
	 * Gets a menu item by its index
	 * @param {number} id The index of the menu item to get
	 */
	getActionIconById(id: number): ActionIcon {
		try {
			return this.actionItems[id];
		} catch (e) {
			this.throwIdNotFoundError(id);
		}
	}
	/**
	 * Adds a menu item on click listener to the specified menu item
	 * Note: This can also be declared manually
	 * @param {number} id The id of the menu item
	 * @param {Function} callback The callback when the menu item is clicked (has to be arrow function)
	 */
	addActionIconOnClickListener(id: number, callback: (ev?: Event) => void) {
		try {
			this.actionItems[id].onClickListener = callback;
		} catch (e) {
			this.throwIdNotFoundError(id);
		}
	}
	/**
	 * Throws an error where the id couldn't be found
	 * @private
	 */
	private throwIdNotFoundError(id: number) {
		throw new Error(`Could not find a menu item with index ${id}`);
	}
	/**
	 * Throws an error where the title couldn't be found
	 */
	private throwTitleNotFoundError(title: string) {
		throw new Error(`Could not find a menu item with title ${title}`);
	}
}

/**
 * A menu item
 */
export class ActionIcon {
	/**
	 * The title of the menu item
	 */
	title: string;
	/**
	 * The icon of the menu item
	 */
	icon?: string;
	/**
	 * The href of the menu item
	 * NOTE: If `routerLink` is specified, don't use `href`.
	 */
	href?: string;
	/**
	 * Similar to what Android does.
	 */
	showAsAction?: boolean;
	/**
	 * The router link of the menu item
	 * NOTE: If `href` is specified, don't use `routerLink`.
	 */
	routerLink?: string;
	/**
	 * The on click listener of the menu item
	 * Note: This can also be set by {@link ActionIconService#addActionIconOnClickListener}
	 */
	onClickListener?: (ev?: Event) => void;
	/**
	 * The submenu of the menu item
	 */
	subMenu?: ActionIcon[];

	constructor(title: string, icon?: string, href?: string, showAsAction?: boolean, routerLink?: string, onClickListener?: (ev?: Event) => void, subMenu?: ActionIcon[]) { }
}

@Component({
	selector: 'app-actionicons',
	template: `
	<span id="more-btns" *ngFor="let actionItem of actionItems">
		<button mat-icon-button *ngIf="actionItem.showAsAction && actionItem.href == null" (click)="actionItem.onClickListener($event)" [matTooltip]="actionItem.title">
			<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
		</button>
		<a mat-icon-button *ngIf="actionItem.showAsAction && actionItem.href" [href]="actionItem.href" [matTooltip]="actionItem.title">
			<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
		</a>
		<a mat-icon-button *ngIf="actionItem.showAsAction && actionItem.routerLink" [routerLink]="[actionItem.routerLink]" [matTooltip]="actionItem.title">
			<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
		</a>
	</span>
	<button mat-icon-button *ngIf="showMoreMenu" [matMenuTriggerFor]="moreMenu">
		<mat-icon>more_vert</mat-icon>
	</button>
	<mat-menu #moreMenu="matMenu">
		<span *ngFor="let actionItem of actionItems">
			<button mat-menu-item *ngIf="!actionItem.showAsAction && actionItem.href == null">
				<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
				{{actionItem.title}}
			</button>
			<a mat-menu-item *ngIf="!actionItem.showAsAction && actionItem.href" [href]="actionItem.href">
				<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
				{{actionItem.title}}
			</a>
			<a mat-menu-item *ngIf="!actionItem.showAsAction && actionItem.routerLink" [routerLink]="[actionItem.routerLink]">
				<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
				{{actionItem.title}}
			</a>
		</span>
	</mat-menu>

				`

})
export class ActionIconsComponent {
	constructor(private actionItemService: ActionIconService) { }
	get actionItems(): ActionIcon[] {
		return this.actionItemService.getActionIcons();
	}
	get showMoreMenu() {
		return this.actionItemService.getActionIcons().find((actionItem: ActionIcon): boolean => {
			return actionItem.showAsAction !== true;
		});
	}
}

@NgModule({
	declarations: [
		ActionIconsComponent
	],
	exports: [
		ActionIconsComponent
	],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule,
		MatTooltipModule,
		RouterModule
	],
	providers: [
		ActionIconService
	]
})
export class ActionIconsModule { }
