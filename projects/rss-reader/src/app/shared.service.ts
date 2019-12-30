import { Component, Injectable, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { SafeHtml, Title } from '@angular/platform-browser';

import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ComponentType } from '@angular/cdk/portal';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subject } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'alert-dialog',
  template: `
  <h2 matDialogTitle>{{alertConfig.title ? alertConfig.title : 'Alert'}}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <p class="mat-body" *ngIf="!alertConfig.isHtml">{{alertConfig.msg}}</p>
    <span *ngIf="alertConfig.isHtml" [innerHTML]="alertConfig.msg"></span>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button color="primary" (click)="close()">{{alertConfig.ok ? alertConfig.ok : 'Dismiss'}}</button>
  </mat-dialog-actions>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AlertDialog implements OnInit {
  constructor(private dialogRef: MatDialogRef<AlertDialog>) {
  }
  // tslint:disable-next-line:member-ordering
  alertConfig: AlertDialogConfig;
  close() {
    this.dialogRef.close();
  }
  ngOnInit() {
    if (this.alertConfig.disableClose) {
      this.dialogRef.disableClose = true;
    }
  }
}
@Component({
  selector: 'confirm-dialog',
  template: `
  <h2 matDialogTitle>{{confirmConfig.title ? confirmConfig.title : 'Confirm'}}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <p class="mat-body" *ngIf="!confirmConfig.isHtml">{{confirmConfig.msg}}</p>
    <span *ngIf="confirmConfig.isHtml" [innerHTML]="confirmConfig.msg"></span>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="cancel()" color="primary">{{confirmConfig.cancel ? confirmConfig.cancel : 'Cancel'}}</button>
    <button mat-button (click)="ok()" color="primary">{{confirmConfig.ok ? confirmConfig.ok : 'OK'}}</button>
  </mat-dialog-actions>
  `
})
// tslint:disable-next-line:component-class-suffix
export class ConfirmDialog implements OnInit {
  constructor(private dialogRef: MatDialogRef<ConfirmDialog>) {

  }
  // tslint:disable-next-line:member-ordering
  confirmConfig: ConfirmDialogConfig;
  cancel() {
    this.dialogRef.close('cancel');
  }
  ok() {
    this.dialogRef.close('ok');
  }
  ngOnInit() {
    if (this.confirmConfig.disableClose) {
      this.dialogRef.disableClose = true;
    }
  }
}
@Component({
  selector: 'prompt-dialog',
  template: `
  <h2 matDialogTitle>{{promptConfig.title ? promptConfig.title : 'Prompt'}}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <p class="mat-body" *ngIf="!promptConfig.isHtml">{{promptConfig.msg}}</p>
    <span *ngIf="promptConfig.isHtml" [innerHTML]="promptConfig.msg"></span>
    <form #form="ngForm">
      <mat-form-field color="{{promptConfig.color ? promptConfig.color : 'primary'}}" style="width:100%">
        <mat-label>{{promptConfig.placeholder}}</mat-label>
        <input
          matInput
          [(ngModel)]="input"
          type="{{promptConfig.inputType ? promptConfig.inputType : 'text'}}"
          required
          name="input">
        <mat-error>This is required.</mat-error>
      </mat-form-field>
    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button (click)="cancel()" color="primary">{{promptConfig.cancel ? promptConfig.cancel : 'Cancel'}}</button>
    <button mat-button (click)="ok()" color="primary" [disabled]="form.invalid">{{promptConfig.ok ? promptConfig.ok : 'OK'}}</button>
  </mat-dialog-actions>
  `
})
// tslint:disable-next-line:component-class-suffix
export class PromptDialog implements OnInit {
  constructor(private dialogRef: MatDialogRef<PromptDialog>) {
  }
  // tslint:disable-next-line:member-ordering
  promptConfig: PromptDialogConfig;
  // tslint:disable-next-line:member-ordering
  input: string | number;
  cancel() {
    this.dialogRef.close('cancel');
  }
  ok() {
    this.dialogRef.close(this.input);
  }
  ngOnInit() {
    if (this.promptConfig.value) {
      this.input = this.promptConfig.value;
    }
    if (this.promptConfig.disableClose) {
      this.dialogRef.disableClose = true;
    }
  }
}
@Component({
  selector: 'selection-dialog',
  template: `
  <h2 matDialogTitle>{{selectionConfig.title ? selectionConfig.title : 'Select options from the list'}}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <mat-selection-list #selection>
      <mat-list-option
        *ngFor="let option of selectionConfig.options"
        [disabled]="option.disabled"
        [value]="option.value"
        [checkboxPosition]="option.checkboxPosition ? option.checkboxPosition : 'before'"
        [selected]="option.selected">
        {{option.content}}
      </mat-list-option>
    </mat-selection-list>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button color="primary" (click)="cancel()">{{selectionConfig.cancel ? selectionConfig.cancel : 'Cancel'}}</button>
    <button
      mat-button
      color="primary"
      (click)="ok()"
      [disabled]="selection.selectedOptions.selected.length < 1">
      {{selectionConfig.ok ? selectionConfig.ok : 'OK'}}
    </button>
  </mat-dialog-actions>
  `
})
// tslint:disable-next-line:component-class-suffix
export class SelectionDialog implements OnInit {
  @ViewChild('selection', { static: true }) selection: MatSelectionList;
  constructor(private dialogRef: MatDialogRef<SelectionDialog>) {
  }
  // tslint:disable-next-line:member-ordering
  selectionConfig: SelectionDialogConfig;
  ngOnInit() {
    if (this.selectionConfig.disableClose) {
      this.dialogRef.disableClose = true;
    }
  }
  cancel() {
    this.dialogRef.close('cancel');
  }
  ok() {
    this.dialogRef.close(this.selection.selectedOptions.selected);
  }
}
export class SnackBarConfig {
  /**
   * The message for the snackBar
   */
  msg: string;
  /**
   * The action for the snackBar
   */
  action?: string;
  /**
   * The custom component for the snackBar to open in
   */
  component?: ComponentType<any>;
  /**
   * Additional options
   */
  additionalOpts?: MatSnackBarConfig;
}
export class DialogConfig extends MatDialogConfig {
  /**
   * The message of the dialog
   */
  msg: string | SafeHtml;
  /**
   * The title of the dialog
   */
  title?: string;
  /**
   * Whether the dialog's message is HTML
   */
  isHtml?: boolean;
}
export class AlertDialogConfig extends DialogConfig {
  /**
   * The ok button text
   */
  ok?: string;
}

export class ConfirmDialogConfig extends DialogConfig {
  /**
   * The ok button text
   */
  ok?: string;
  /**
   * The cancel button text
   */
  cancel?: string;
}

export class PromptDialogConfig extends DialogConfig {
  /**
   * The ok button text
   */
  ok?: string;
  /**
   * The cancel button text
   */
  cancel?: string;
  /**
   * The placeholder of the input
   */
  placeholder: string;
  /**
   * The input type
   */
  inputType?: 'text' | 'email' | 'password' | 'number';
  /**
   * The initial value of the input
   */
  value?: string | number;
  /**
   * The color of the input
   */
  color?: 'primary' | 'accent' | 'warn';
}
export class SelectionDialogConfig extends DialogConfig {
  /**
   * The ok button text
   */
  ok?: string;
  /**
   * The cancel button text
   */
  cancel?: string;
  /**
   * The options for the selection dialog
   */
  options: SelectionDialogOptions[];
}
export class SelectionDialogOptions {
  /**
   * The title of the selection list item
   */
  content: string;
  /**
   * Whether the selection list item is disabled
   */
  disabled?: boolean;
  /**
   * The value of the selection list item
   */
  value: any;
  /**
   * The checkbox position of the selection list item
   */
  checkboxPosition?: 'before' | 'after';
  /**
   * Whether the selection list item is initially selected
   */
  selected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private internalTitle = '';
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private documentTitle: Title,
    private breakpointObserver: BreakpointObserver,
    private swUpdate: SwUpdate
  ) { }
  /**
   * Sets the document's title
   * @param title The title of the document to set
   */
  set title(title: string) {
    this.internalTitle = title;
    if (title !== '') {
      title = `${title} | `;
    }
    this.documentTitle.setTitle(`${title}Angular RSS Reader`);
  }
  /**
   * Returns the document's title
   */
  get title(): string {
    return this.internalTitle;
  }
  /**
   * Checks for updates (ngsw)
   */
  checkForUpdates() {
    this.swUpdate.checkForUpdate().then(() => {
      console.log('[App] Done checking for updates');
    }).catch(err => {
      console.error(err);
    });
  }
  /**
   * Activates the update (ngsw)
   */
  activateUpdate() {
    this.swUpdate.activateUpdate().then(() => {
      console.log('[App] Done activating update.');
      window.location.reload();
    }).catch(err => {
      console.error(err);
    });
  }
  /**
   * Detects if the user is using a mobile device
   * @returns `true` if the user is using a mobile device, `false` otherwise
   */
  get isMobile(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 599px)');
  }
  /**
   * Opens a snackBar with the specified params and no return
   * @param opts The options of the snackBar
   */
  openSnackBar(opts: SnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return this.handleSnackBar(opts);
  }
  /**
   * Opens a snackBar with the specified params and a return of the snackBar's ref (for component)
   * @param opts The options of the snackBar
   * @returns The snackbar reference
   */
  openSnackBarComponent(opts: SnackBarConfig): MatSnackBarRef<any> {
    return this.handleSnackBarWithComponent(opts);
  }
  /**
   * Handles a snackBar with a snackBarref if the developer needs a return
   * @param opts The config for the snackBar.
   * @returns The snackbar reference
   */
  private handleSnackBar(opts: SnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    if (opts) {
      if (opts.action) {
        const snackBarRef = this.snackBar.open(opts.msg, opts.action, opts.additionalOpts);
        return snackBarRef;
      } else {
        const snackBarRef = this.snackBar.open(opts.msg, undefined, opts.additionalOpts);
        return snackBarRef;
      }
    } else {
      this.throwError('opts', 'SnackBarConfig');
    }
  }
  /**
   * Handles a snackBar with a component
   * @param opts The config for the snackBar
   * @returns The snackbar reference
   */
  private handleSnackBarWithComponent(opts: SnackBarConfig): MatSnackBarRef<any> {
    if (opts) {
      if (opts.additionalOpts) {
        if (opts.additionalOpts) {
          return this.snackBar.openFromComponent(opts.component, opts.additionalOpts);
        } else {
          return this.snackBar.openFromComponent(opts.component);
        }
      } else {
        this.throwError('opts.additionalOpts', 'MatSnackBarConfig');
      }
    } else {
      this.throwError('opts', 'SnackBarConfig');
    }
  }
  /**
   * Closes the current snackBar
   */
  closeSnackBar() {
    this.snackBar.dismiss();
  }
  /**
   * Opens an alert dialog with the specified parameters
   * @param opts The options for the dialog
   * @returns The dialog reference
   */
  openAlertDialog(opts: AlertDialogConfig): MatDialogRef<AlertDialog> {
    if (opts) {
      if (opts.panelClass) {
        const dialogRef = this.dialog.open(AlertDialog, { panelClass: opts.panelClass });
        dialogRef.componentInstance.alertConfig = opts;
        return dialogRef;
      } else {
        const dialogRef = this.dialog.open(AlertDialog);
        dialogRef.componentInstance.alertConfig = opts;
        return dialogRef;
      }
    } else {
      this.throwError('opts', 'AlertDialogConfig');
    }
  }
  /**
   * Opens a confirm dialog with the specified parameters
   * @param opts The options for the dialog
   * @returns The dialog reference
   */
  openConfirmDialog(opts: ConfirmDialogConfig): MatDialogRef<ConfirmDialog> {
    if (opts) {
      if (opts.panelClass) {
        const dialogRef = this.dialog.open(ConfirmDialog, { panelClass: opts.panelClass });
        dialogRef.componentInstance.confirmConfig = opts;
        return dialogRef;
      } else {
        const dialogRef = this.dialog.open(ConfirmDialog);
        dialogRef.componentInstance.confirmConfig = opts;
        return dialogRef;
      }
    } else {
      this.throwError('opts', 'ConfirmDialogConfig');
    }
  }
  /**
   * Opens a prompt dialog with the specified parameters
   * @param opts The options for the dialog
   * @returns The dialog reference
   */
  openPromptDialog(opts: PromptDialogConfig): MatDialogRef<PromptDialog> {
    if (opts) {
      if (opts.panelClass) {
        const dialogRef = this.dialog.open(PromptDialog, { panelClass: opts.panelClass });
        dialogRef.componentInstance.promptConfig = opts;
        return dialogRef;
      } else {
        const dialogRef = this.dialog.open(PromptDialog);
        dialogRef.componentInstance.promptConfig = opts;
        return dialogRef;
      }
    } else {
      this.throwError('opts', 'PromptDialogConfig');
    }
  }
  /**
   * Opens a selection dialog with the configured options
   * @param opts The options for the dialog
   * @returns The dialog reference
   */
  openSelectionDialog(opts: SelectionDialogConfig): MatDialogRef<SelectionDialog> {
    if (opts) {
      const dialogRef = this.dialog.open(SelectionDialog, { disableClose: true, panelClass: 'selection-dialog' });
      dialogRef.componentInstance.selectionConfig = opts;
      return dialogRef;
    } else {
      this.throwError('opts', 'SelectionDialogConfig');
    }
  }

  /**
   * Throws an error with the specified parameters
   * @param variable The variable that was not specified
   * @param type The type of variable
   */
  private throwError(variable: string, type: string) {
    // tslint:disable-next-line:max-line-length
    throw new Error(`${variable} was not specified. Please ensure that the ${variable} property is specified and that it is of type ${type}.`);
  }
}

export const SHARED_DIALOGS = [
  AlertDialog,
  ConfirmDialog,
  PromptDialog,
  SelectionDialog
];

@NgModule({
  exports: [
    SHARED_DIALOGS
  ],
  providers: [
    SharedService
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule
  ],
  declarations: [
    SHARED_DIALOGS
  ],
  entryComponents: [
    SHARED_DIALOGS
  ]
})
export class SharedModule { }
