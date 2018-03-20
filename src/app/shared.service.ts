import { Component, DoCheck, Injectable, NgModule, OnInit, ViewChild } from '@angular/core';
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
import { Observable } from 'rxjs/Observable';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class SharedService implements OnInit {
	private _title = '';
	private readonly _version = '1.3.0';
	constructor(
		private snackBar: MatSnackBar,
		private dialog: MatDialog,
		private documentTitle: Title,
		private breakpointObserver: BreakpointObserver,
		private swUpdate: SwUpdate
	) { }
	/**
	 * Gets the version of the app
	 */
	get version(): string {
		return this._version;
	}
	/**
	 * Sets the document's title
	 * @param {string} title The title of the document to set
	 */
	set title(title: string) {
		this._title = title;
		if (title !== '') {
			title = `${title} | `;
		}
		this.documentTitle.setTitle(`${title}Angular RSS Reader`);
	}
	/**
	 * Returns the document's title
	 */
	get title(): string {
		return this._title;
	}
	ngOnInit() {
		this.swUpdate.available.subscribe(event => {
			console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
			// tslint:disable-next-line:max-line-length
			const snackBarRef = this.openSnackBar({ msg: 'A newer version of this app is available!', action: 'Update & Refresh', additionalOpts: { panelClass: ['mat-elevation-z3'], horizontalPosition: 'start' } });

			snackBarRef.onAction().subscribe(() => {
				this.activateUpdate();
			});

		});
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
			window.location.reload(true);
		}).catch(err => {
			console.error(err);
		});
	}
	/**
	 * Detects if the user is using a mobile device
	 * @returns {boolean}
	 */
	isMobile(): boolean {
		if (this.breakpointObserver.isMatched('(max-width: 599px)')) {
			return true;
		} else {
			return false;
		}
	}
	/**
	 * Opens a snackBar with the specified params and no return
	 * @param {SnackBarConfig} opts The options of the snackBar
	 */
	openSnackBar(opts: SnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
		return this.handleSnackBar(opts);
	}
	/**
	 * Opens a snackBar with the specified params and a return of the snackBar's ref (for component)
	 * @param {SnackBarConfig} opts The options of the snackBar
	 * @returns {MatSnackBarRef<any>}
	 */
	openSnackBarComponent(opts: SnackBarConfig): MatSnackBarRef<any> {
		return this.handleSnackBarWithComponent(opts);
	}
	/**
	 * Handles a snackBar with a snackBarref if the developer needs a return
	 * @param {SnackBarConfig} opts The config for the snackBar.
	 * @returns {MatSnackBarRef<SimpleSnackBar>}
	 * @private
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
	 * @param {SnackBarConfig} opts The config for the snackBar
	 * @returns {MatSnackbarRef<any>}
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
	 * @param {AlertDialogConfig} opts The options for the dialog
	 * @returns {MatDialogRef<AlertDialog>}
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
	 * @param {ConfirMatialogConfig} opts The options for the dialog
	 * @return {MatDialogRef<ConfirMatialog>}
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
	 * @param {PromptDialogConfig} opts The options for the dialog
	 * @return {MatDialogRef<PromptDialog>}
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
	 * @param {SelectionDialogConfig} opts The options for the dialog
	 * @returns {MatDialogRef<SelectionDialog>}
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
	 * Gets all opens dialogs
	 * @returns {MatDialogRef<any>[]}
	 */
	getDialogs(): MatDialogRef<any>[] {
		return this.dialog.openDialogs;
	}
	/**
	 * Closes all dialogs
	 */
	closeAllDialogs() {
		this.dialog.closeAll();
	}
	/**
	 * Gets a dialog by its id
	 * @param {string} id The ID of the dialog
	 * @returns {MatDialogRef<any>}
	 */
	getDialogById(id: string): MatDialogRef<any> {
		return this.dialog.getDialogById(id);
	}
	/**
	 * Observable for after all dialogs have been closed
	 * @returns {Observable<void>}
	 */
	afterAllClosed(): Observable<void> {
		return this.dialog.afterAllClosed;
	}
	/**
	 * Throws an error with the specified parameters
	 * @param {string} variable The variable that was not specified
	 * @param {string} type The type of variable
	 * @private
	 */
	private throwError(variable: string, type: string) {
		// tslint:disable-next-line:max-line-length
		throw new Error(`${variable} was not specified. Please ensure that the ${variable} property is specified and that it is of type ${type}.`);
	}
}


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
				<input matInput [(ngModel)]="input" placeholder="{{promptConfig.placeholder}}" type="{{promptConfig.inputType ? promptConfig.inputType : 'text'}}" required name="input">
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
			<mat-list-option *ngFor="let option of selectionConfig.options" [disabled]="option.disabled" [value]="option.value" [checkboxPosition]="option.checkboxPosition ? option.checkboxPosition : 'before'" [selected]="option.selected">
				{{option.content}}
			</mat-list-option>
		</mat-selection-list>
	</mat-dialog-content>
	<mat-dialog-actions align="end">
		<button mat-button color="primary" (click)="cancel()">{{selectionConfig.cancel ? selectionConfig.cancel : 'Cancel'}}</button>
		<button mat-button color="primary" (click)="ok()" [disabled]="selection.selectedOptions.selected.length < 1">{{selectionConfig.ok ? selectionConfig.ok : 'OK'}}</button>
	</mat-dialog-actions>
	`
})
// tslint:disable-next-line:component-class-suffix
export class SelectionDialog implements OnInit {
	@ViewChild('selection') selection: MatSelectionList;
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
	 * @type {string}
	 */
	msg: string;
	/**
	 * The action for the snackBar
	 * @type {string}
	 */
	action?: string;
	/**
	 * The custom component for the snackBar to open in
	 * @type {ComponentType<any>}
	 */
	component?: ComponentType<any>;
	/**
	 * Additional options
	 * @type {MatSnackBarConfig}
	 */
	additionalOpts?: MatSnackBarConfig;
}
export class DialogConfig extends MatDialogConfig {
	/**
	 * The message of the dialog
	 * @type {string|SafeHtml}
	 */
	msg: string | SafeHtml;
	/**
	 * The title of the dialog
	 * @type {string}
	 */
	title?: string;
	/**
	 * Whether the dialog's message is HTML
	 * @type {boolean}
	 */
	isHtml?: boolean;
}
export class AlertDialogConfig extends DialogConfig {
	/**
	 * The ok button text
	 * @type {string}
	 */
	ok?: string;
}

export class ConfirmDialogConfig extends DialogConfig {
	/**
	 * The ok button text
	 * @type {string}
	 */
	ok?: string;
	/**
	 * The cancel button text
	 * @type {string}
	 */
	cancel?: string;
}

export class PromptDialogConfig extends DialogConfig {
	/**
	 * The ok button text
	 * @type {string}
	 */
	ok?: string;
	/**
	 * The cancel button text
	 * @type {string}
	 */
	cancel?: string;
	/**
	 * The placeholder of the input
	 * @type {string}
	 */
	placeholder: string;
	/**
	 * The input type
	 * @type {"text"|"email"|"password"|"number"}
	 */
	inputType?: 'text' | 'email' | 'password' | 'number';
	/**
	 * The initial value of the input
	 * @type {string|number}
	 */
	value?: string | number;
	/**
	 * The color of the input
	 * @type {"primary"|"accent"|"warn"}
	 */
	color?: 'primary' | 'accent' | 'warn';
}
export class SelectionDialogConfig extends DialogConfig {
	/**
	 * The ok button text
	 * @type {string}
	 */
	ok?: string;
	/**
	 * The cancel button text
	 * @type {string}
	 */
	cancel?: string;
	/**
	 * The options for the selection dialog
	 * @type {SelectionDialogOptions[]}
	 */
	options: SelectionDialogOptions[];
}
export class SelectionDialogOptions {
	/**
	 * The title of the selection list item
	 * @type {string}
	 */
	content: string;
	/**
	 * Whether the selection list item is disabled
	 * @type {boolean}
	 */
	disabled?: boolean;
	/**
	 * The value of the selection list item
	 * @type {any}
	 */
	value: any;
	/**
	 * The checkbox position of the selection list item
	 * @type {"before"|"after"}
	 */
	checkboxPosition?: 'before' | 'after';
	/**
	 * Whether the selection list item is initially selected
	 * @type {boolean}
	 */
	selected?: boolean;
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
