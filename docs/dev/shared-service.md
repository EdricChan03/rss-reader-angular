# `SharedService`

## Description

This service serves as an utility for all of my project.

## Prerequisites

1. Ensure that `SharedModule` is imported to your main `NgModule` under `imports` (after `BrowserModule`:
    <!-- start-enclose-content -->

    ```typescript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { SharedModule } from './shared.service';
    @NgModule({
      imports: [
        BrowserModule,
        SharedModule
      ]
    })
    export class AppModule {}
    ```

    <!-- end-enclose-content -->
2. Add this style to your app's main style file:
    <!-- start-enclose-content -->

    ```css
    selection-dialog>mat-dialog-container>selection-dialog>mat-dialog-content {
        padding: 0;
    }
    ```

    <!-- end-enclose-content -->

---

# Methods

Here's a list of all the functions/methods.

## `checkForUpdates`

```typescript
checkForUpdates(): void;
```

<!-- start-enclose-content -->

### Description

Checks for updates to the currently cached app that the user is using. (aka Service Worker functionality)

<!-- end-enclose-content -->

## `activateUpdate`

```typescript
activateUpdate(): void;
```

<!-- start-enclose-content -->

### Description

Activates the current update available. (aka Service Worker functionality)

<!-- end-enclose-content -->

## `openSnackBar`

```typescript
openSnackBar(opts: SnackBarConfig): MatSnackBarRef<SimpleSnackBar>;
```

<!-- start-enclose-content -->

### Description

Opens a snackbar with the specified configuration and return the snackbar's reference.

### Params

Param | Type | Description
---|---|---
`opts` | [`SnackBarConfig`](#SnackBarConfig) | The options for the snackbar

### Examples

#### Opening a simple snackbar

```typescript
export class MyComponent {
  constructor(private shared: SharedService){}
  showSnackBar() {
    this.shared.openSnackBar({msg: 'I\'m a snackbar!', additionalOpts: {duration: 6000}});
  }
}
```

<!-- end-enclose-content -->

## `openSnackBarComponent`

<!-- start-enclose-content -->

### Description

Opens a custom snackbar component. Returns the opened custom snackbar component's reference.

### Parameters

Parameter | Type | Description | Notes
---|---|---|---
`opts` | [`SnackBarConfig`](#SnackBarConfig) | The options for the snackbar | -

### Examples

#### Opening a custom snackbar component for a duration of 5 seconds

```typescript
export class MyComponent {
  constructor(private shared: SharedService){}
  showSnackBar() {
    this.shared.openSnackBarComponent({component: CustomSnackBarComponent, additionalOpts: {duration: 5000}});
  }
}
```

For more info about custom snackbars, visit the official [docs](https://material.angular.io/components/snackbar/overview).
<!-- end-enclose-content -->

## `closeSnackBar`

```typescript
closeSnackBar(): void;
```

<!-- start-enclose-content -->

### Description

Closes the currently opened snackbar.

<!-- end-enclose-content -->

## `openAlertDialog`

```typescript
openAlertDialog(opts: AlertDialogConfig): MatDialogRef<AlertDialog>;
```

<!-- start-enclose-content -->

### Description

Opens an alert dialog with the specified options. Returns the opened dialog's reference.

### Parameters

Parameter | Type | Description
---|---|---
`opts` | [`AlertDialogConfig`](#AlertDialogConfig) | The options for the alert dialog

### Examples

#### Standard dialog

```typescript
export class AppComponent {
  constructor(private shared: SharedService){}
  openAlertDialog() {
    this.shared.openAlertDialog({msg: 'I\'m an alert dialog!', title: 'Alert'});
  }
}
```

#### Another alert dialog example

```typescript
export class AppComponent {
  constructor(private shared: SharedService){}
  deleteAll() {
    // ...

    // Show a dialog indicating that all files were
    // successfully deleted
    this.shared.openAlertDialog({msg: 'All files were deleted!'});
  }
}
```

<!-- end-enclose-content -->

## `openConfirmDialog`

```typescript
openConfirmDialog(opts: ConfirmDialogConfig): MatDialogRef<ConfirmDialog>;
```

### Description

Opens a confirm dialog with the configuration. Returns the opened confirm dialog's reference.

**TIP:** You can check whether the user confirmed the dialog by accessing the result of the `subscribe` method.

- If the result is `yes`, then the user clicked on the positive button.
- If the result is `no`, then the user clicked on the negative button.
- If the result is `undefined`, then the user clicked outside of the dialog.

Here's an example:

```typescript
export class MyComponent {
  constructor(private shared: SharedService) { }
  // ...
  // Shows a dialog asking the user for the confirmation
  // of a deletion of a file.
  deleteFile() {
    // ...

    let dialogRef = this.shared.openConfirmDialog({msg: 'Are you sure you want to delete the current file? This cannot be undone!'});
    dialogRef.afterClosed().subscribe(result => {
      // Check if user didn't click outside of the dialog
      if (result != undefined) {
        // Check if user confirmed the deletion
        if (result === 'yes') {
          console.log('Deleting file...');
          // <Code for deleting file>
        // Check if user denied the deletion
        } else if (result === 'no') {
          console.log('User cancelled deletion.');
        }
      // User probably clicked outside
      } else {
        console.log('User cancelled deletion or clicked outside of the dialog.');
      }
    });
  }
}
```

## `openPromptDialog`

```typescript
openPromptDialog(opts: PromptDialogConfig): MatDialogRef<PromptDialog>;
```

### Description

Shows a prompt dialog asking the user for input. This input will then be passed to the result of the `afterClosed` method of the dialog's reference.

Example:

```typescript
export class MyComponent {
  constructor(private shared: SharedService) { }
  // ...
  // Renames a file by showing a prompt dialog.
  // The `fileName` parameter is used for showing what the current
  // file name is before the renaming.
  renameFile(fileName: string): string {
    // Note: Since the `disableClose` config option is set to true,
    // completely negate the possibility of the user
    // clicking outside of the dialog.
    // However, the user can still click on the
    // cancel button. This still needs to be considered.
    let dialogRef = this.shared.openPromptDialog({title: `Rename ${fileName}`, disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
      // Sanity check
      // TODO: Remove this sanity check since the user *should not* be
      // able to click outside of the dialog.
      if (result == undefined) {
        // User either didn't input anything or clicked outside of the dialog
        console.log('File not renamed.');
      } else {
        // Assume input value is valid
        return result;
      }
    })
  }
}
```

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

Sets or gets the title of the website.
<!-- start-enclose-content -->

### Examples

```typescript
export class MyComponent {
  // Making the service public ensures that it can
  // be accessed from the component's template.
  constructor(public shared: SharedService) { }
}
```

```html
<p>Current document title: {{shared.title}}</p>
```

<!-- end-enclose-content -->

---

# Other classes

## `SnackBarConfig`

<!-- start-enclose-content -->
Property | Description | Type | Default value(s) | Required?
---|---|---|---|---
`msg` | The message for the snackbar. | `string` | - | `true`
`action` | The action for the snackbar. | `string` | - | `false`
`component` | The custom component for the snackbar to open with. | `ComponentType<any>` | - | `false`
`additionalOpts` | Additional options | `MatSnackBarConfig` | - | `false`
<!-- end-enclose-content -->

## `DialogConfig` extends `MatDialogConfig`
<!-- start-enclose-content -->
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`msg` | The message for the dialog. | `string,SafeHtml` | - | `true` | If this property is of type `SafeHtml`, the `isHtml` property has to be set as `true`.
`title` | The title of the dialog. | `string` | `Alert` | `false` | -
`isHtml` | Whether the dialog's message is HTML. | `boolean` | `false` | `false` | -
*Take note that this class extends `MatDialogConfig`.
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

## `PromptDialogConfig` <sub><sup>EXTENDS `DialogConfig`</sub></sup>

<!-- start-enclose-content -->
Property | Description | Type | Default value(s) | Required? | Notes
---|---|---|---|---|---
`ok` | The ok button text | `string` | `OK` | `false` | -
`cancel` | The cancel button text | `string` | `Cancel` | `false` | -
`placeholder` | The placeholder for the input | `string` | - | `true` | -
`inputType` | The input type | `"text","email","password","number"` | - | `false` | Potential date/time support?
`value` | The initial value of the input | `string,number` | - | `false` | -
`color` | The (divider) color of the input | `"primary","accent","warn"` | - | `false` | -
<!-- end-enclose-content -->

---

[Testing page](https://chan4077.github.io/rss-reader/test)
