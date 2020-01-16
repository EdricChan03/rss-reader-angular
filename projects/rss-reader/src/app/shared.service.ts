import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Component, Injectable, NgModule, OnInit, ViewChild, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule, ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { SafeHtml, Title } from '@angular/platform-browser';

/** An abstract dialog class. */
export abstract class Dialog {
  abstract get negativeBtnColor(): ThemePalette;

  abstract get neutralBtnColor(): ThemePalette;

  abstract get positiveBtnColor(): ThemePalette;
}

@Component({
  selector: 'alert-dialog',
  template: `
  <h2 matDialogTitle *ngIf="opts?.title">{{ opts.title }}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <p class="mat-body" *ngIf="!opts.isHtml">{{ opts.msg }}</p>
    <span *ngIf="opts.isHtml" [innerHTML]="opts.msg"></span>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button *ngIf="opts?.negativeBtnText" [color]="negativeBtnColor" matDialogClose="cancel">{{ opts.negativeBtnText }}</button>
    <button mat-button *ngIf="opts?.neutralBtnText" [color]="neutralBtnColor" matDialogClose="neutral">{{ opts.neutralBtnText }}</button>
    <button mat-button *ngIf="positiveBtnText" [color]="positiveBtnColor" matDialogClose="ok">{{ positiveBtnText }}</button>
  </mat-dialog-actions>
  `
})
// tslint:disable-next-line:component-class-suffix
export class AlertDialog extends Dialog {
  constructor(@Inject(MAT_DIALOG_DATA) public opts: AlertDialogOpts) {
    super();
  }

  get negativeBtnColor(): ThemePalette {
    return this.opts.negativeBtnColor ? this.opts.negativeBtnColor : 'primary';
  }

  get neutralBtnColor(): ThemePalette {
    return this.opts.neutralBtnColor ? this.opts.neutralBtnColor : 'primary';
  }

  get positiveBtnColor(): ThemePalette {
    return this.opts.positiveBtnColor ? this.opts.positiveBtnColor : 'primary';
  }

  get positiveBtnText(): string {
    // This is to handle users using the now deprecated `ok` property.
    // tslint:disable-next-line:deprecation
    return this.opts.ok ? this.opts.ok : this.opts.positiveBtnText ? this.opts.positiveBtnText : 'Dismiss';
  }
}

@Component({
  selector: 'confirm-dialog',
  template: `
  <h2 matDialogTitle *ngIf="opts?.title">{{ opts.title }}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <p class="mat-body" *ngIf="!opts.isHtml">{{ opts.msg }}</p>
    <span *ngIf="opts.isHtml" [innerHTML]="opts.msg"></span>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button *ngIf="negativeBtnText" [color]="negativeBtnColor" matDialogClose="cancel">{{ negativeBtnText }}</button>
    <button mat-button *ngIf="opts?.neutralBtnText" [color]="neutralBtnColor" matDialogClose="neutral">{{ opts.neutralBtnText }}</button>
    <button mat-button *ngIf="positiveBtnText" [color]="positiveBtnColor" matDialogClose="ok">{{ positiveBtnText }}</button>
  </mat-dialog-actions>
  `
})
// tslint:disable-next-line:component-class-suffix
export class ConfirmDialog extends Dialog {
  constructor(@Inject(MAT_DIALOG_DATA) public opts: ConfirmDialogOpts) {
    super();
  }

  get negativeBtnColor(): ThemePalette {
    return this.opts.negativeBtnColor ? this.opts.negativeBtnColor : 'primary';
  }

  get neutralBtnColor(): ThemePalette {
    return this.opts.neutralBtnColor ? this.opts.neutralBtnColor : 'primary';
  }

  get positiveBtnColor(): ThemePalette {
    return this.opts.positiveBtnColor ? this.opts.positiveBtnColor : 'primary';
  }

  get negativeBtnText(): string {
    // This is to handle users using the now deprecated `ok` property.
    // tslint:disable-next-line:deprecation
    return this.opts.cancel ? this.opts.ok : this.opts.positiveBtnText ? this.opts.positiveBtnText : 'Cancel';
  }

  get positiveBtnText(): string {
    // This is to handle users using the now deprecated `ok` property.
    // tslint:disable-next-line:deprecation
    return this.opts.ok ? this.opts.ok : this.opts.positiveBtnText ? this.opts.positiveBtnText : 'OK';
  }
}

@Component({
  selector: 'prompt-dialog',
  template: `
  <h2 matDialogTitle *ngIf="opts?.title">{{ opts?.title }}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <p class="mat-body" *ngIf="!opts.isHtml">{{ opts.msg }}</p>
    <span *ngIf="opts.isHtml" [innerHTML]="opts.msg"></span>
    <form #form="ngForm">
      <mat-form-field [color]="inputColor" style="width:100%">
        <mat-label>{{ opts.placeholder }}</mat-label>
        <input
          matInput
          [(ngModel)]="input"
          type="{{opts.inputType ? opts.inputType : 'text'}}"
          required
          name="input">
        <mat-error>This is required.</mat-error>
      </mat-form-field>
    </form>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button *ngIf="negativeBtnText" [color]="negativeBtnColor" matDialogClose="cancel">{{ negativeBtnText }}</button>
    <button mat-button *ngIf="opts?.neutralBtnText" [color]="neutralBtnColor" matDialogClose="neutral">{{ opts.neutralBtnText }}</button>
    <button mat-button *ngIf="positiveBtnText" [color]="positiveBtnColor" [matDialogClose]="input" [disabled]="form.invalid">{{ positiveBtnText }}</button>
  </mat-dialog-actions>
  `
})
// tslint:disable-next-line:component-class-suffix
export class PromptDialog extends Dialog implements OnInit {
  input: string | number;
  constructor(@Inject(MAT_DIALOG_DATA) public opts: PromptDialogOpts) {
    super();
  }

  get negativeBtnColor(): ThemePalette {
    return this.opts.negativeBtnColor ? this.opts.negativeBtnColor : 'primary';
  }

  get neutralBtnColor(): ThemePalette {
    return this.opts.neutralBtnColor ? this.opts.neutralBtnColor : 'primary';
  }

  get positiveBtnColor(): ThemePalette {
    return this.opts.positiveBtnColor ? this.opts.positiveBtnColor : 'primary';
  }

  get negativeBtnText(): string {
    // This is to handle users using the now deprecated `cancel` property.
    // tslint:disable-next-line:deprecation
    return this.opts.cancel ? this.opts.cancel : this.opts.negativeBtnText ? this.opts.negativeBtnText : 'Cancel';
  }

  get positiveBtnText(): string {
    // This is to handle users using the now deprecated `ok` property.
    // tslint:disable-next-line:deprecation
    return this.opts.ok ? this.opts.ok : this.opts.positiveBtnText ? this.opts.positiveBtnText : 'OK';
  }


  get inputColor(): ThemePalette {
    // This is to handle users using the now deprecated `color` property.
    // tslint:disable-next-line:deprecation
    return this.opts.color ? this.opts.color : this.opts.inputConfig.color ? this.opts.inputConfig.color : 'primary';
  }

  ngOnInit() {
    // tslint:disable:deprecation
    if (this.opts.value) {
      this.input = this.opts.value;
    } else if (this.opts.inputConfig.value) {
      this.input = this.opts.inputConfig.value;
    }
    // tslint:enable:deprecation
  }
}

@Component({
  selector: 'selection-dialog',
  template: `
  <h2 matDialogTitle *ngIf="opts?.title">{{ opts.title }}</h2>
  <mat-dialog-content fxLayout="column" class="mat-typography">
    <mat-selection-list #selection>
      <mat-list-option
        *ngFor="let option of opts.options"
        [disabled]="option.disabled"
        [value]="option.value"
        [checkboxPosition]="option.checkboxPosition ? option.checkboxPosition : 'before'"
        [selected]="option.selected">
        {{ option.content }}
      </mat-list-option>
    </mat-selection-list>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button *ngIf="negativeBtnText" [color]="negativeBtnColor" matDialogClose="cancel">{{ negativeBtnText }}</button>
    <button mat-button *ngIf="opts?.neutralBtnText" [color]="neutralBtnColor" matDialogClose="neutral">{{ opts.neutralBtnText }}</button>
    <button
      mat-button
      *ngIf="positiveBtnText"
      [color]="positiveBtnColor"
      [matDialogClose]="selection.selectedOptions"
      [disabled]="selection.selectedOptions.selected.length < 1">
      {{ positiveBtnText }}
    </button>
  </mat-dialog-actions>
  `
})
// tslint:disable-next-line:component-class-suffix
export class SelectionDialog extends Dialog {
  constructor(@Inject(MAT_DIALOG_DATA) public opts: SelectionDialogOpts) {
    super();
  }

  get negativeBtnColor(): ThemePalette {
    return this.opts.negativeBtnColor ? this.opts.negativeBtnColor : 'primary';
  }

  get neutralBtnColor(): ThemePalette {
    return this.opts.neutralBtnColor ? this.opts.neutralBtnColor : 'primary';
  }

  get positiveBtnColor(): ThemePalette {
    return this.opts.positiveBtnColor ? this.opts.positiveBtnColor : 'primary';
  }

  get negativeBtnText(): string {
    // This is to handle users using the now deprecated `cancel` property.
    // tslint:disable-next-line:deprecation
    return this.opts.cancel ? this.opts.cancel : this.opts.negativeBtnText ? this.opts.negativeBtnText : 'Cancel';
  }

  get positiveBtnText(): string {
    // This is to handle users using the now deprecated `ok` property.
    // tslint:disable-next-line:deprecation
    return this.opts.ok ? this.opts.ok : this.opts.positiveBtnText ? this.opts.positiveBtnText : 'OK';
  }
}

export class SnackBarOpts<D = any> {
  /** The snackbar's message. */
  msg: string;
  /** The snackbar's action. */
  action?: string;
  /** A component to open the snackbar with. */
  component?: ComponentType<any>;
  /** Configuration for the snackbar. */
  config?: MatSnackBarConfig<D>;
  /**
   * Additional options for the snackbar.
   * @deprecated Use {@link SnackBarOpts#config} instead
   */
  additionalOpts?: MatSnackBarConfig<D>;
}

export class DialogOpts {
  /** The dialog's message. */
  msg: string | SafeHtml;
  /** The dialog's title. */
  title?: string;
  /** Whether the dialog's message is in HTML. */
  isHtml?: boolean;
  /** The positive button's text. */
  positiveBtnText?: string;
  /** The positive button's color. */
  positiveBtnColor?: ThemePalette;
  /** The negative button's text. */
  negativeBtnText?: string;
  /** The negative button's color. */
  negativeBtnColor?: ThemePalette;
  /** The neutral button's text. */
  neutralBtnText?: string;
  /** The neutral button's color. */
  neutralBtnColor?: ThemePalette;
}

export class AlertDialogOpts extends DialogOpts {
  /**
   * The ok button's text.
   * @deprecated Use {@link DialogOpts#positiveBtnText} instead
   */
  ok?: string;
}

export class ConfirmDialogOpts extends DialogOpts {
  /**
   * The ok button's text.
   * @deprecated Use {@link DialogOpts#positiveBtnText} instead
   */
  ok?: string;
  /**
   * The cancel button's text.
   * @deprecated Use {@link DialogOpts#negativeBtnText} instead
   */
  cancel?: string;
}

export class PromptDialogInputConfig {
  /** The input's placeholder. */
  placeholder: string;
  /** The input type. */
  inputType?: string;
  /** The input's initial value. */
  value?: string;
  /** The input's color. */
  color?: ThemePalette;
}

export class PromptDialogOpts extends DialogOpts {
  /**
   * The ok button's text.
   * @deprecated Use {@link DialogOpts#positiveBtnText} instead
   */
  ok?: string;
  /**
   * The cancel button's text.
   * @deprecated Use {@link DialogOpts#negativeBtnText} instead
   */
  cancel?: string;
  /** Configuration for the input. */
  inputConfig?: PromptDialogInputConfig;
  /**
   * The input's placeholder.
   * @deprecated Use {@link PromptDialogInputConfig#placeholder} instead
   */
  placeholder: string;
  /**
   * The input type.
   * @deprecated Use {@link PromptDialogInputConfig#inputType} instead
   */
  inputType?: 'text' | 'email' | 'password' | 'number';
  /**
   * The initial value of the input
   * @deprecated Use {@link PromptDialogInputConfig#value} instead
   */
  value?: string | number;
  /**
   * The color of the input
   * @deprecated Use {@link PromptDialogInputConfig#color} instead
   */
  color?: 'primary' | 'accent' | 'warn';
}

export class SelectionDialogOpts extends DialogOpts {
  /**
   * The ok button's text.
   * @deprecated Use {@link DialogOpts#positiveBtnText} instead
   */
  ok?: string;
  /**
   * The cancel button's text.
   * @deprecated Use {@link DialogOpts#negativeBtnText} instead
   */
  cancel?: string;
  /** Options to be shown in the dialog. */
  options: SelectionDialogOption[];
}

export class SelectionDialogOption {
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
    private breakpointObserver: BreakpointObserver
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
  openSnackBar(opts: SnackBarOpts): MatSnackBarRef<SimpleSnackBar> {
    return this.handleSnackBar(opts);
  }
  /**
   * Opens a snackBar with the specified params and a return of the snackBar's ref (for component)
   * @param opts The options of the snackBar
   * @returns The snackbar reference
   */
  openSnackBarComponent(opts: SnackBarOpts): MatSnackBarRef<any> {
    return this.handleSnackBarWithComponent(opts);
  }

  private handleSnackBar(opts: SnackBarOpts): MatSnackBarRef<SimpleSnackBar> {
    // tslint:disable-next-line:deprecation
    const config = opts.config ? opts.config : opts.additionalOpts;
    return this.snackBar.open(opts.msg, opts.action ? opts.action : undefined, config);
  }

  private handleSnackBarWithComponent(opts: SnackBarOpts): MatSnackBarRef<any> {
    // tslint:disable-next-line:deprecation
    const config = opts.config ? opts.config : opts.additionalOpts;
    return this.snackBar.openFromComponent(opts.component, config);
  }

  /** Closes the current snackbar. */
  closeSnackBar() {
    this.snackBar.dismiss();
  }

  private createOrGetDialogConfig<D = any>(config?: MatDialogConfig<D>): MatDialogConfig<D> {
    return config ? config : new MatDialogConfig<D>();
  }

  /**
   * Opens an alert dialog with the specified parameters
   * @param opts The options for the dialog.
   * @param config Additional configurations for the dialog.
   * @returns The dialog reference
   */
  openAlertDialog(opts: AlertDialogOpts, config?: MatDialogConfig<AlertDialogOpts>): MatDialogRef<AlertDialog> {
    const tempConfig = this.createOrGetDialogConfig<AlertDialogOpts>(config);
    tempConfig.data = opts;
    return this.dialog.open(AlertDialog, tempConfig);
  }

  /**
   * Opens a confirm dialog with the specified parameters
   * @param opts The options for the dialog
   * @param config Additional configurations for the dialog.
   * @returns The dialog reference
   */
  openConfirmDialog(opts: ConfirmDialogOpts, config?: MatDialogConfig<ConfirmDialogOpts>): MatDialogRef<ConfirmDialog> {
    const tempConfig = this.createOrGetDialogConfig<ConfirmDialogOpts>(config);
    tempConfig.data = opts;
    return this.dialog.open(ConfirmDialog, tempConfig);
  }

  /**
   * Opens a prompt dialog with the specified parameters
   * @param opts The options for the dialog
   * @param config Additional configurations for the dialog.
   * @returns The dialog reference
   */
  openPromptDialog(opts: PromptDialogOpts, config?: MatDialogConfig<PromptDialogOpts>): MatDialogRef<PromptDialog> {
    const tempConfig = this.createOrGetDialogConfig<PromptDialogOpts>(config);
    tempConfig.data = opts;
    return this.dialog.open(PromptDialog, tempConfig);
  }
  /**
   * Opens a selection dialog with the configured options
   * @param opts The options for the dialog
   * @param config Additional configurations for the dialog.
   * @returns The dialog reference
   */
  openSelectionDialog(opts: SelectionDialogOpts, config?: MatDialogConfig<SelectionDialogOpts>): MatDialogRef<SelectionDialog> {
    const tempConfig = this.createOrGetDialogConfig<SelectionDialogOpts>(config);
    tempConfig.data = opts;
    tempConfig.panelClass = 'selection-dialog';
    return this.dialog.open(SelectionDialog, tempConfig);
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
