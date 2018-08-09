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
 * A action icon service for the toolbar.
 */
export class ActionIconService {

	private actionIcons: ActionIcon[] = [];
	/**
	 * Adds an action icon
	 * @param {ActionIcon} actionIcon The action icon
	 */
	addActionIcon(actionIcon: ActionIcon) {
		this.actionIcons.push(actionIcon);
	}
	/**
	 * Adds an action icon toggle
	 * @param {ActionIconToggle} actionIcon The action icon
	 * @experimental Do not use!
	 */
	addActionIconToggle(actionIcon: ActionIconToggle) {
		console.warn('%cThis method is experimental and may break. Continue at your own risk.', 'font-weight: 600');
		actionIcon.onClickListener = () => {
			actionIcon.toggleBind = !actionIcon.toggleBind;
		};
		this.actionIcons.push(actionIcon);
	}
	/**
	 * Updates an action icon by its index
	 * @param {number} index The index of the action icon
	 * @param {ActionIcon} actionIcon The action icon
	 */
	updateActionIconByIndex(index: number, actionIcon: ActionIcon) {
		try {
			this.actionIcons[index] = actionIcon;
		} catch (e) {
			this.throwIdNotFoundError(index);
		}
	}
	/**
	 * An alias of {@link ActionIconService#updateActionIconByIndex} to prevent apps from breaking
	 * @param {number} index The index of the action icon
	 * @param {ActionIcon} actionIcon The action icon
	 */
	updateActionIcon(index: number, actionIcon: ActionIcon) {
		this.updateActionIconByIndex(index, actionIcon);
	}
	/**
	 * Gets action icons
	 * @returns {ActionIcon[]}
	 */
	getActionIcons(): ActionIcon[] {
		return this.actionIcons;
	}
	/**
	 * An alias of {@link ActionIconService#removeActionIconByIndex} to prevent apps from breaking
	 * @param {number} id The index of the action icon to remove
	 */
	removeActionIcon(id: number) {
		this.removeActionIconByIndex(id);
	}
	/**
	 * Removes a action icon
	 * @param {number} id The index of the action icon to remove
	 */
	removeActionIconByIndex(id: number) {
		try {
			this.actionIcons.splice(id, 1);
		} catch (e) {
			this.throwIdNotFoundError(id);
		}
	}
	/**
	 * Removes an action item by its title
	 */
	removeActionItemByTitle(title: string) {
		try {
			this.actionIcons.splice(
				this.actionIcons.findIndex((actionIcon: ActionIcon) => {
					return actionIcon.title === title;
				}), 1);
		} catch (e) {
			this.throwTitleNotFoundError(title);
		}
	}
	/**
	 * Removes all action icons
	 */
	removeActionIcons() {
		this.actionIcons = [];
	}
	/**
	 * Gets a action icon by its index
	 * @param {number} id The index of the action icon to get
	 */
	getActionIconById(id: number): ActionIcon {
		try {
			return this.actionIcons[id];
		} catch (e) {
			this.throwIdNotFoundError(id);
		}
	}
	/**
	 * Adds a action icon on click listener to the specified action icon
	 * Note: This can also be declared manually
	 * @param {number} id The id of the action icon
	 * @param {Function} callback The callback when the action icon is clicked (has to be arrow function)
	 */
	addActionIconOnClickListener(id: number, callback: (ev?: Event) => void) {
		try {
			this.actionIcons[id].onClickListener = callback;
		} catch (e) {
			this.throwIdNotFoundError(id);
		}
	}
	/**
	 * Throws an error where the id couldn't be found
	 * @private
	 */
	private throwIdNotFoundError(id: number) {
		throw new Error(`Could not find an action icon with index ${id}`);
	}
	/**
	 * Throws an error where the title couldn't be found
	 */
	private throwTitleNotFoundError(title: string) {
		throw new Error(`Could not find an action icon with title ${title}`);
	}
}

/**
 * An action icon
 */
export class ActionIcon {
	/**
	 * The title of the action icon
	 */
	title: string;
	/**
	 * The icon of the action icon
	 */
	icon?: string;
	/**
	 * The href of the action icon
	 * NOTE: If `routerLink` is specified, don't use `href`.
	 */
	href?: string;
	/**
	 * Similar to what Android does.
	 */
	showAsAction?: boolean;
	/**
	 * The router link of the action icon
	 * NOTE: If `href` is specified, don't use `routerLink`.
	 */
	routerLink?: string;
	/**
	 * The on click listener of the action icon
	 * Note: This can also be set by {@link ActionIconService#addActionIconOnClickListener}
	 */
	onClickListener?: (ev?: Event) => void;
	/**
	 * The submenu of the action icon
	 */
	subMenu?: ActionIcon[];

	// tslint:disable-next-line:max-line-length
	constructor(title: string, icon?: string, href?: string, showAsAction?: boolean, routerLink?: string, onClickListener?: (ev?: Event) => void, subMenu?: ActionIcon[]) { }
}
/**
 * An action icon toggle
 */
export class ActionIconToggle extends ActionIcon {
	/**
	 * The toggle boolean to bind to
	 */
	toggleBind: boolean;

	// tslint:disable-next-line:max-line-length
	constructor(title: string, toggleBind: boolean, icon?: string, showAsAction?: boolean) { super(title, icon, null, showAsAction); }
}

@Component({
	selector: 'app-actionicons',
	template: `
	<ng-container id="more-btns" *ngFor="let actionItem of actionItems">
		<ng-container *ngIf="!isEmpty(actionItem.icon)">
			<button mat-icon-button *ngIf="actionItem.showAsAction && actionItem.href == null" (click)="actionItem.onClickListener($event)" [matTooltip]="actionItem.title">
			<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
			</button>
			<a mat-icon-button *ngIf="actionItem.showAsAction && actionItem.href" [href]="actionItem.href" [matTooltip]="actionItem.title">
			<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
			</a>
			<a mat-icon-button *ngIf="actionItem.showAsAction && actionItem.routerLink" [routerLink]="[actionItem.routerLink]" [matTooltip]="actionItem.title">
					<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
				</a>
			<button mat-icon-button *ngIf="showMoreMenu" [matMenuTriggerFor]="moreMenu">
				<mat-icon>more_vert</mat-icon>
			</button>
			<mat-menu #moreMenu="matMenu">
				<ng-template matMenuContent>
					<ng-container *ngFor="let actionItem of actionItems">
						<button mat-menu-item *ngIf="!actionItem.showAsAction && actionItem.href == null" (click)="actionItem.onClickListener()">
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
					</ng-container>
				</ng-template>
			</mat-menu>
		</ng-container>
		<ng-container *ngIf="isEmpty(actionItem.showAsAction)">
			<button mat-button *ngIf="isEmpty(actionItem.href)" (click)="actionItem.onClickListener($event)">
				<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
				{{actionItem.title}}
			</button>
			<a mat-button *ngIf="actionItem.href" [href]="actionItem.href">
				<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
				{{actionItem.title}}
			</a>
			<a mat-button *ngIf="actionItem.routerLink" [routerLink]="[actionItem.routerLink]">
				<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
				{{actionItem.title}}
			</a>
			<button mat-icon-button *ngIf="showMoreMenu" [matMenuTriggerFor]="moreMenu">
				<mat-icon>more_vert</mat-icon>
			</button>
			<mat-menu #moreMenu="matMenu">
				<ng-template matMenuContent>
					<ng-container *ngFor="let actionItem of actionItems">
						<button mat-menu-item *ngIf="!actionItem.showAsAction && actionItem.href == null" (click)="actionItem.onClickListener()">
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
					</ng-container>
				</ng-template>
			</mat-menu>
		</ng-container>
	</ng-container>
	`
})
export class ActionIconsComponent {
	constructor(private actionItemService: ActionIconService) { }
	get actionItems(): ActionIcon[] {
		return this.actionItemService.getActionIcons();
	}
	get showMoreMenu() {
		return this.actionItemService.getActionIcons().find((actionItem: ActionIcon): boolean => {
			return !actionItem.showAsAction;
		});
	}
	isEmpty(str: string): boolean {
		return (!str || 0 === str.length);
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
