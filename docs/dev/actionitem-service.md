# `ActionItemService`

## Description

This service makes it easier to add menu items to a toolbar, similar to like Android.

**NOTE:** In the future, this may be revisited and integrated with `SharedService`.

## Prerequisites

Ensure that `ActionItemsModule` is imported to your main app's module under the `imports` array:

```typescript
import { ActionItemsModule } from 'path/to/actionitem.service';
@NgModule({
  imports: [ActionItemsModule]
})
```

---

# Methods

## `addActionItem`

```typescript
addActionItem(actionItem: ActionItem): void;
```

<!-- start-enclose-content -->

### Description

Adds a menu item.


### Params

Param | Type | Description | Notes
---|---|---|---
`actionItem` | `ActionItem` | The menu item to add | -

<!-- end-enclose-content -->


## `getActionItems`

```typescript
getActionItems(): ActionItem[];
```

<!-- start-enclose-content -->

### Description

Gets the menu items.

<!-- end-enclose-content -->


## `removeActionItem`

```typescript
removeActionItem(id: number): void;
```

<!-- start-enclose-content -->

### Description

Removes the specified menu item at the index.


### Params

Param | Type | Description | Notes
---|---|---|---
`id` | `number` | The index of the menu item to remove | -
<!-- end-enclose-content -->

## `removeActionItems`

```typescript
removeActionItems(): void;
```

<!-- start-enclose-content -->

### Description

Removes all menu items.
<!-- end-enclose-content -->

## `getActionItemById`

```typescript
getActionItemById(id: number): ActionItem;
```
<!-- start-enclose-content -->

### Description

Gets a menu item by its index.

### Returns

`ActionItem`

### Params

Param | Type | Description | Notes
---|---|---|---
`id` | `number` | The index of the menu item to get | -
<!-- end-enclose-content -->

## `addActionItemOnClickListener`

```typescript
addActionItemOnClickListener(id: number, callback: (ev?: Event) => void): void;
```
<!-- start-enclose-content -->

### Description

Adds an onclick listener to the specified menu item.

### Returns

`ActionItem`

### Params

Param | Type | Description | Notes
---|---|---|---
`id` | `number` | The index of the menu item to get | -
`callback` | `(ev?: Event)=> void` | The callback of the onclick listener | -
<!-- end-enclose-content -->

---

# Examples

<!-- start-enclose-content -->

## Method 1: Setting up the toolbar with the service

`my-app.component.html`:

```html
<mat-toolbar>
  <app-action-items></app-action-items>
</mat-toolbar>
```

## Method 2: Setting up the toolbar with the service

See the source code for [`app.component.html`](https://github.com/EdricChan03/rss-reader/blob/src/app/app.component.html).

Snippet of code:

```typescript
/**
 * Gets the menu items (getter)
 * @returns The menu items
 */
get actionItems: ActionItem[] {
  return this.actionItemService.getActionItems();
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
  constructor(private actionItemService: ActionItemService){}
  ngOnInit() {
    this.actionItemService.addActionItem({title: 'Reload', icon: 'refresh', onClickListener: (ev: Event) => {
      console.log('Reload was clicked');
      window.location.reload(true);
    }})
  }
}
```

## Adding click listeners to a menu item

```typescript
export class MyComponent implements OnInit {
  constructor(private actionItemService: ActionItemService){}
  ngOnInit() {
    this.actionItemService.addActionItem({title: 'Open sidenav', icon: 'menu'});
    this.actionItemService.addActionItemOnClickListener(0, (ev: Event)=> {
      console.log('Clicked');
    })
  }
}
```

<!-- end-enclose-content -->
