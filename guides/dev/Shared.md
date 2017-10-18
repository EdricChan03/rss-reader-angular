# `Shared`
## Description
This `@Injectable()` is basically a capability to share functions with other components without manually copying and pasting source code.

It also provides easily accessible code for beginners who are getting started with [Angular Material](https://material.angular.io).
## Notices
1. Ensure that `Shared` is imported to your main `NgModule` under `providers`:
   ```typescript
   import { NgModule } from '@angular/core';
   import { Shared } from './shsred';
   @NgModule({
	   providers: [
		   Shared
	   ]
   })
   export class AppModule {}
   ```
2. Copy the whole `partials` folder at the same path as where the `shared.ts` file is.
3. Add this style to your `styles.css`/ `styles.scss` or wherever you place your styles file:
   ```css
   selection-dialog>mat-dialog-container>selection-dialog>mat-dialog-content {
       padding: 0;
   }
   ```
4. Use the functions by adding a constructor for it.
   ```typescript
   export class AppComponent {
	   constructor(private shared: Shared){}
	   // ...
   }
   ```

# Functions
## `openSnackBar`

## `openSnackBarWithRef`

## `openSnackBarComponent`

## `closeSnackBar`

## `openAlertDialog`
```typescript
openAlertDialog(opts: AlertDialogConfig): MatDialogRef<AlertDialog>;
```
Opens an alert dialog with the specified params.
Param | Description | Notes
---|---|---
`opts` | The options for the alert dialog | (None)
### Examples
Standard dialog:
```typescript
export class AppComponent {
	constructor(private shared: Shared){}
	openAlertDialog() {
		this.shared.openAlertDialog({msg: "I'm an alert dialog!", title: "Alert"});
	}
}
```
Dialog with a subscription for when the dialog is closed
```typescript
export class AppComponent {
	constructor(private shared: Shared){}
	openAlertDialog() {
		let dialogRef = this.shared.openAlertDialog({msg: "I'm an alert dialog with an after closed!", title: "Alert"});
		dialogRef.afterClosed().subscribe(_ => {
			console.log("Dialog was closed");
		})
	}
}
```
## `openConfirmDialog`

## `openPromptDialog`

## `openSelectionDialog`

## `getDialogs`

## `closeAllDialogs`

## `getDialogById`

## `afterAllClosed`

## `setTitle`
```typescript
setTitle(title: string): void;
```

## `getTitle`
```typescript
getTitle(): string;
```
---
# Interfaces
## `SnackBarConfig`
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`msg` | The message for the snackbar. | `string` | - | `true` | -
`action` | The action for the snackbar. | `string` | - | `false` | -
`component` | The custom component for the snackbar to open with. | `ComponentType<any>` | - | `false` | -
`additionalOpts` | Additional options | `MatSnackBarConfig` | - | `false` | -
## `DialogConfig`
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`msg` | The message for the dialog. | `string | SafeHtml` | - | `true` | If this property is of type `SafeHtml`, the `isHtml` property has to be set as `true`.
`title` | The title of the dialog. | `string` | `Alert` | `false` | -
`isHtml` | Whether the dialog's message is HTML. | `boolean` | `false` | `false` | -
*Take note that this interface extends `MatDialogConfig`.
## `AlertDialogConfig`
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`ok` | The ok button text | `string` | `OK` | `false` | -
*Take note that this interface extends [`DialogConfig`](#dialogconfig)
## `ConfirmDialogConfig`
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`ok` | The ok button text | `string` | `OK` | `false` | -
`cancel` | The cancel button text | `string` | `Cancel` | `false` | -
*Take note that this interface extends [`DialogConfig`](#dialogconfig)
## `PromptDialogConfig`
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`ok` | The ok button text | `string` | `OK` | `false` | -
`cancel` | The cancel button text | `string` | `Cancel` | `false` | -
`placeholder` | The placeholder for the input | `string` | - | `true` | -
`inputType` | The input type | `"text" | "email" | "password" | "number"` | - `false` | -
`value` | The initial value of the input | `string | number` | - | `false` | -
`color` | The (divider) color of the input | `"primary" | "accent" | "warn"` | - | `false` | -
*Take note that this interface extends [`DialogConfig`](#dialogconfig)

---
# Testing
[Testing page](https://angular-rss-reader.firebaseapp.com/test)