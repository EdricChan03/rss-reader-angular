import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Injectable, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

/** ID used to generate new action items with no explicitly-defined ID. */
let nextKeyId = 0;

@Injectable()
/**
 * A action icon service for the toolbar.
 */
export class ActionItemService {

  readonly actionItems = new Map<string, ActionItem>();
  /**
   * Adds an action item
   * @param actionItem The action item
   */
  addActionItem(actionItem: ActionItem) {
    this.actionItems.set(`actionItem-${nextKeyId++}`, actionItem);
  }
  /**
   * Adds an action item toggle
   * @param actionItem The action item
   * @deprecated
   * @experimental Do not use!
   */
  addActionItemToggle(actionItem: ActionItemToggle) {
    console.warn('%cThis method is experimental and may break. Continue at your own risk.', 'font-weight: 600');
    actionItem.onClickListener = () => {
      actionItem.toggleBind = !actionItem.toggleBind;
    };
    this.actionItems.set(`actionItem-${nextKeyId++}`, actionItem);
  }
  /**
   * Updates an action item by its key
   * @param key The key of the action item
   * @param actionItem The action item
   */
  updateActionItemByKey(key: string, actionItem: ActionItem) {
    try {
      this.actionItems[key] = actionItem;
    } catch (e) {
      this.throwKeyNotFoundError(key);
    }
  }
  /**
   * Gets all action items
   */
  getActionItems(): ActionItem[] {
    return Array.from(this.actionItems.values());
  }
  /**
   * Removes an action item
   * @param key The key of the action item to remove
   */
  removeActionItemByKey(key: string) {
    try {
      this.actionItems.delete(key);
    } catch (e) {
      this.throwKeyNotFoundError(key);
    }
  }
  /**
   * Removes all action items
   */
  removeActionItems() {
    this.actionItems.clear();
  }
  /**
   * Gets a action item by its key
   * @param key The key of the action item to retrieve
   */
  getActionItemByKey(key: string): ActionItem {
    try {
      return this.actionItems[key];
    } catch (e) {
      this.throwKeyNotFoundError(key);
    }
  }
  /**
   * Adds a action item on click listener to the specified action item
   * Note: This can also be declared manually
   * @deprecated Please set the onclick listener in the {@link ActionItem} object itself.
   * @param id The id of the action item
   * @param callback The callback when the action item is clicked (has to be arrow function)
   */
  addActionItemOnClickListener(key: string, callback: (ev?: Event) => void) {
    try {
      this.actionItems[key].onClickListener = callback;
    } catch (e) {
      this.throwKeyNotFoundError(key);
    }
  }
  /**
   * Throws an error where the id couldn't be found
   * @private
   */
  private throwKeyNotFoundError(id: string) {
    throw new Error(`Could not find an action item with key ${id}`);
  }
  /**
   * Throws an error where the title couldn't be found
   */
  private throwTitleNotFoundError(title: string) {
    throw new Error(`Could not find an action item with title ${title}`);
  }
}

/**
 * An action item
 */
export class ActionItem {
  /**
   * The title of the action item
   */
  title: string;
  /** The ID of the action item */
  id?: string;
  /**
   * The icon of the action item
   */
  icon?: string;
  /**
   * The href of the action item
   * NOTE: If `routerLink` is specified, don't use `href`.
   */
  href?: string;
  /**
   * Similar to what Android does.
   */
  showAsAction?: boolean;
  /**
   * The router link of the action item
   * NOTE: If `href` is specified, don't use `routerLink`.
   */
  routerLink?: string;
  /**
   * The on click listener of the action item
   * Note: This can also be set by {@link ActionItemService#addActionItemOnClickListener}
   */
  onClickListener?: (ev?: Event) => void;
  /**
   * The submenu of the action item
   */
  subMenu?: ActionItem[];
  // tslint:disable-next-line:max-line-length
  constructor(title: string, icon?: string, href?: string, showAsAction?: boolean, routerLink?: string, onClickListener?: (ev?: Event) => void, subMenu?: ActionItem[]) { }
}
/**
 * An action item toggle
 */
export class ActionItemToggle extends ActionItem {
  /**
   * The toggle boolean to bind to
   */
  toggleBind: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(title: string, toggleBind: boolean, icon?: string, showAsAction?: boolean) { super(title, icon, null, showAsAction); }
}

@Component({
  selector: 'app-action-items',
  template: `
	<ng-container *ngFor="let actionItem of actionItems">
    <button
    mat-icon-button
    *ngIf="actionItem.showAsAction && actionItem.href == null"
    (click)="actionItem.onClickListener($event)"
    [matTooltip]="actionItem.title">
      <mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
    </button>
    <a mat-icon-button *ngIf="actionItem.showAsAction && actionItem.href" [href]="actionItem.href" [matTooltip]="actionItem.title">
    <mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
    </a>
    <a
      mat-icon-button
      *ngIf="actionItem.showAsAction && actionItem.routerLink"
      [routerLink]="[actionItem.routerLink]"
      [matTooltip]="actionItem.title">
			<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
		</a>
	</ng-container>
  <button mat-icon-button *ngIf="showMoreMenu" [matMenuTriggerFor]="moreMenu"
    matTooltip="More options">
		<mat-icon>more_vert</mat-icon>
	</button>
	<mat-menu #moreMenu="matMenu">
		<ng-container *ngFor="let actionItem of actionItems">
			<button mat-menu-item *ngIf="!actionItem.showAsAction && actionItem.href == null" (click)="actionItem.onClickListener($event)">
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
	</mat-menu>
				`
})
export class ActionItemsComponent {
  constructor(private actionItemService: ActionItemService) { }
  get actionItems(): ActionItem[] {
    return this.actionItemService.getActionItems();
  }
  get showMoreMenu() {
    return this.actionItemService.getActionItems().find((actionItem: ActionItem): boolean => {
      return actionItem.showAsAction !== true;
    });
  }
}

@NgModule({
  declarations: [
    ActionItemsComponent
  ],
  exports: [
    ActionItemsComponent
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
    ActionItemService
  ]
})
export class ActionItemsModule { }