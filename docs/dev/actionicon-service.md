# `ActionIconService`
## Description
This `@Injectable()` makes it easier to add menu items to a toolbar, similar to like Android. (For those of you who don't know, those icons on that toolbar are known as menu item just shown as action buttons and the toolbar's also known as an `ActionBar`.) Anyways, enough of Android and Material Design and whatever.
In the future, this will be revisited and may be integrated with `SharedService`.

## Notices
Ensure that `ActionIconsModule` is imported to your main app's module under the `imports` array:
```typescript
import { ActionIconsModule } from 'path/to/actionitem.service';
@NgModule({
	imports: [ActionIconsModule]
})
```
That's it! There's nothing else there is! On to the documentation then...

(Examples will be at the bottom this time...)

# Methods
## `addActionIcon`
```typescript
addActionIcon(actionItem: ActionIcon): void;
```

<!-- start-enclose-content -->
### Description
Adds a menu item.

### Params
Param | Type | Description | Notes
---|---|---|---
`actionItem` | `ActionIcon` | The menu item to add | -
<!-- end-enclose-content -->

## `getActionIcons`
```typescript
getActionIcons(): ActionIcon[];
```

<!-- start-enclose-content -->
### Description
Gets the menu items.

### Returns
`ActionIcon[]`
<!-- end-enclose-content -->

## `removeActionIcon`
```typescript
removeActionIcon(id: number): void;
```

<!-- start-enclose-content -->
### Description
Removes the specified menu item at the index.

### Params
Param | Type | Description | Notes
---|---|---|---
`id` | `number` | The index of the menu item | -
<!-- end-enclose-content -->

## `removeActionIcons`
```typescript
removeActionIcons(): void;
```
<!-- start-enclose-content -->
### Description
Removes all menu items.
<!-- end-enclose-content -->

## `getActionIconById`
```typescript
getActionIconById(id: number): ActionIcon;
```
<!-- start-enclose-content -->
### Description
Gets a menu item by its index.

### Returns
`ActionIcon`

### Params
Param | Type | Description | Notes
---|---|---|---
`id` | `number` | The index of the menu item to get | -
<!-- end-enclose-content -->

## `addActionIconOnClickListener`
```typescript
addActionIconOnClickListener(id: number, callback: (ev?: Event) => void): void;
```
<!-- start-enclose-content -->
### Description
Adds an onclick listener to the specified menu item.
### Returns
`ActionIcon`

### Params
Param | Type | Description | Notes
---|---|---|---
`id` | `number` | The index of the menu item to get | -
`callback` | `(ev?: Event)=> void` | The callback of the onclick listener | -
<!-- end-enclose-content -->

# Examples
<!-- start-enclose-content -->
## Setting up the toolbar with the service (method 1)
`my-app.component.html`:
```html
<mat-toolbar>
	<app-actionicons></app-actionicons>
</mat-toolbar>
```
## Setting up the toolbar with the service (method 2)
See the source code for [`app.component.html`](https://github.com/Chan4077/rss-reader/blob/src/app/app.component.html).

Snippet of code:

```typescript
/**
 * Gets the menu items (getter)
 * @returns {ActionIcon[]} The menu items
 */
get actionItems: ActionIcon[] {
	return this.actionItemService.getActionIcons();
}
```
```html
<div id="more-btns" *ngFor="let actionItem of actionItems">
	<button mat-icon-button *ngIf="actionItem.showAsAction && actionItem.href == null" (click)="actionItem.onClickListener($event)" [matTooltip]="actionItem.title">
		<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
	</button>
	<a mat-icon-button *ngIf="actionItem.showAsAction && actionItem.href" [href]="actionItem.href" [matTooltip]="actionItem.title">
		<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
	</a>
	<a mat-icon-button *ngIf="actionItem.showAsAction && actionItem.routerLink" [routerLink]="[actionItem.routerLink]" [matTooltip]="actionItem.title">
		<mat-icon *ngIf="actionItem.icon">{{actionItem.icon}}</mat-icon>
	</a>
</div>
<button mat-icon-button *ngIf="showMoreMenu" [matMenuTriggerFor]="moreMenu">
	<mat-icon>more_vert</mat-icon>
</button>
<mat-menu #moreMenu="matMenu">
	<div *ngFor="let actionItem of actionItems">
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
	</div>
</mat-menu>
```
## Adding menu items
```typescript
export class MyComponent implements OnInit {
	constructor(private actionItemService: ActionIconService){}
	ngOnInit() {
		this.actionItemService.addActionIcon({title: "Reload", icon: "refresh", onClickListener: (ev: Event)=> {
			console.log("Reload was clicked");
			window.location.reload(true);
		}})
	}
}
```
## Adding onclick listeners to a menu item
```typescript
export class MyComponent implements OnInit {
	constructor(private actionItemService: ActionIconService){}
	ngOnInit() {
		this.actionItemService.addActionIcon({title: "Open sidenav", icon: "menu"});
		this.actionItemService.addActionIconOnClickListener(0, (ev: Event)=> {
			console.log("Clicked");
		})
	}
}
```

<!-- end-enclose-content -->