# `SharedInjectable`
## Description
This `@Injectable()` is basically a capability to share functions with other components without manually copying and pasting source code.

It also provides easily accessible code for beginners who are getting started with [Angular Material](https://material.angular.io).
## Notices
1. Ensure that `SharedModule` is imported to your main `NgModule` under `imports` (after `BrowserModule`:
   <!-- start-enclose-content -->
   ```typescript
   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   import { SharedModule } from './shared';
   @NgModule({
	   imports: [
		   BrowserModule,
		   SharedModule
	   ]
   })
   export class AppModule {}
   ```
   <!-- end-enclose-content -->
2. Copy the whole `partials` folder at the same path as where the `shared.ts` file is.
3. Add this style to your `styles.css`/ `styles.scss` or wherever you place your styles file:
   <!-- start-enclose-content -->
   ```css
   selection-dialog>mat-dialog-container>selection-dialog>mat-dialog-content {
       padding: 0;
   }
   ```
   <!-- end-enclose-content -->
4. Use any of the methods by adding a constructor for it.
   <!-- start-enclose-content -->
   ```typescript
   export class AppComponent {
	   constructor(private shared: SharedInjectable){}
	   // ...
   }
   ```
   <!-- end-enclose-content -->
---
# Methods
Here's a list of all the functions/methods.
## `openSnackBar`
```typescript
openSnackBar(opts: SnackBarConfig): MatSnackBarRef<SimpleSnackBar>;
```

<!-- start-enclose-content -->
### Description
Opens a snackbar with the specified params and returns the snackbar ref.

### Returns
`void`

### Params
Param | Type | Description | Notes
---|---|---|---
`opts` | `SnackBarConfig` | The options for the snackbar | -

### Examples
#### Opening a simple snackbar
```typescript
export class MyComponent {
	constructor(private shared: SharedInjectable){}
	showSnackBar() {
		this.shared.openSnackBar({msg: "I'm a really simple snackbar", additionalOpts: {duration: 6000}});
	}
}
```
<!-- end-enclose-content -->

## `openSnackBarWithRef` <sub><sup>DEPRECATED</sup></sub>
```typescript
openSnackBarWithRef(opts: SnackBarConfig): MatSnackBarRef<SimpleSnackBar>;
```

<!-- start-enclose-content -->
### Description
Opens a snackbar with the specified params and returns the snackbar's ref.

**NOTE:** This is deprecated in favour of `openSnackBar`.

### Returns
`MatSnackBarRef<SimpleSnackBar>`
The ref of the snackbar

### Params
Param | Type | Description | Notes
---|---|---|---
`opts` | `SnackBarConfig` | The options for the snackbar | -

### Examples
### Opening a simple snackbar with an action
```typescript
export class MyComponent {
	constructor(private shared: SharedInjectable){}
	showSnackBar() {
		// Note: Using `openSnackBar` in this example as `openSnackBarWithRef` is deprecated
		let snackBarRef = this.shared.openSnackBar({msg: "I'm a snackbar!", action: "Do something", additionalOpts: {duration: 5000}});
		snackBarRef.onAction().subscribe(()=> {
			console.log("User clicked the action!");
		})
	}
}
```
<!-- end-enclose-content -->

## `openSnackBarComponent`

## `closeSnackBar`

## `openAlertDialog`

```typescript
openAlertDialog(opts: AlertDialogConfig): MatDialogRef<AlertDialog>;
```
<!-- start-enclose-content -->
### Description
Opens an alert dialog with the specified params.

### Returns
The dialog ref of `AlertDialog`.

### Params
Param | Type | Description | Notes
---|---|---|---
`opts` | `AlertDialogConfig` | The options for the alert dialog | (None)

### Examples
Standard dialog:
```typescript
export class AppComponent {
	constructor(private shared: SharedInjectable){}
	openAlertDialog() {
		this.shared.openAlertDialog({msg: "I'm an alert dialog!", title: "Alert"});
	}
}
```
Dialog with a `subscribe` method for when the dialog is closed
```typescript
export class AppComponent {
	constructor(private shared: SharedInjectable){}
	openAlertDialog() {
		let dialogRef = this.shared.openAlertDialog({msg: "I'm an alert dialog with an after closed!", title: "Alert"});
		dialogRef.afterClosed().subscribe(_ => {
			console.log("Dialog was closed");
		})
	}
}
```
<!-- end-enclose-content -->

## `openConfirmDialog`

```typescript
openConfirmDialog(opts: ConfirmDialogConfig): MatDialogRef<ConfirmDialog>;
```
Opens a confirm dialog with the specified params and returns the dialog's ref.


## `openPromptDialog`

## `openSelectionDialog`

## `getDialogs`

## `closeAllDialogs`

## `getDialogById`

## `afterAllClosed`
```typescript
afterAllClosed(): Observable<void>;
```
<!-- start-enclose-content -->
### Description
An observable for when after all dialogs are closed

### Returns
`Observable<void>`
<!-- end-enclose-content -->

## `isMobile`
```typescript
isMobile(): boolean;
```
<!-- start-enclose-content -->
### Description
Whether the user is using a mobile device

### Returns
`boolean`
<!-- end-enclose-content -->
---
# Getters & Setters
## `title`
Sets or gets the title of the document.
<!-- start-enclose-content -->
### Examples
```typescript
/**
 * Gets the document title without the text after the pipe
 */
getTitle() {
	return this.shared.title;
}
/**
 * Sets the document title
 * @param {string} title The title to set
 */
setTitle(title: string) {
	this.shared.title = title;
}
```
<!-- end-enclose-content -->
---
# Interfaces
## `SnackBarConfig`
<!-- start-enclose-content -->
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`msg` | The message for the snackbar. | `string` | - | `true` | -
`action` | The action for the snackbar. | `string` | - | `false` | -
`component` | The custom component for the snackbar to open with. | `ComponentType<any>` | - | `false` | -
`additionalOpts` | Additional options | `MatSnackBarConfig` | - | `false` | -
<!-- end-enclose-content -->

## `DialogConfig` extends `MatDialogConfig`
<!-- start-enclose-content -->
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`msg` | The message for the dialog. | `string,SafeHtml` | - | `true` | If this property is of type `SafeHtml`, the `isHtml` property has to be set as `true`.
`title` | The title of the dialog. | `string` | `Alert` | `false` | -
`isHtml` | Whether the dialog's message is HTML. | `boolean` | `false` | `false` | -
*Take note that this interface extends `MatDialogConfig`.
<!-- end-enclose-content -->

## `AlertDialogConfig` extends `DialogConfig`
<!-- start-enclose-content -->
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`ok` | The ok button text | `string` | `OK` | `false` | -
<!-- end-enclose-content -->

## `ConfirmDialogConfig` extends `DialogConfig`
<!-- start-enclose-content -->
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`ok` | The ok button text | `string` | `OK` | `false` | -
`cancel` | The cancel button text | `string` | `Cancel` | `false` | -
<!-- end-enclose-content -->

## `PromptDialogConfig` extends `DialogConfig`
<!-- start-enclose-content -->
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`ok` | The ok button text | `string` | `OK` | `false` | -
`cancel` | The cancel button text | `string` | `Cancel` | `false` | -
`placeholder` | The placeholder for the input | `string` | - | `true` | -
`inputType` | The input type | `"text","email","password","number"` | - | `false` | Maybe date support?
`value` | The initial value of the input | `string,number` | - | `false` | -
`color` | The (divider) color of the input | `"primary","accent","warn"` | - | `false` | -
<!-- end-enclose-content -->

---
# Testing
[Testing page](https://chan4077.github.io/angular-rss-reader/test)