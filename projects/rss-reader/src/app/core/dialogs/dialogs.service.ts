import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PortalDialogComponent } from './portal-dialog/portal-dialog.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { SelectionDialogComponent } from './selection-dialog/selection-dialog.component';

import {
  AlertDialogOpts,
  ConfirmDialogOpts,
  DialogResult,
  PortalDialogOpts,
  PromptDialogOpts,
  SelectionDialogOpts
} from './models';
import { DialogsModule } from './dialogs.module';

@Injectable({
  // Note: Angular auto-adds the service to the module as a provider.
  providedIn: DialogsModule
})
export class DialogsService {
  constructor(private dialog: MatDialog) { }

  private createOrGetDialogConfig<D = any>(config?: MatDialogConfig<D>): MatDialogConfig<D> {
    return config ? config : new MatDialogConfig<D>();
  }

  /**
   * Opens an alert dialog with the specified parameters
   * @param opts The options for the dialog.
   * @param config Additional configurations for the dialog.
   * @returns The dialog reference
   */
  openAlertDialog(
    opts: AlertDialogOpts,
    config?: MatDialogConfig<AlertDialogOpts>
  ): MatDialogRef<AlertDialogComponent, DialogResult> {
    const tempConfig = this.createOrGetDialogConfig<AlertDialogOpts>(config);
    tempConfig.data = opts;
    return this.dialog.open(AlertDialogComponent, tempConfig);
  }

  /**
   * Opens a confirm dialog with the specified parameters
   * @param opts The options for the dialog
   * @param config Additional configurations for the dialog.
   * @returns The dialog reference
   */
  openConfirmDialog(
    opts: ConfirmDialogOpts,
    config?: MatDialogConfig<ConfirmDialogOpts>
  ): MatDialogRef<ConfirmDialogComponent, DialogResult> {
    const tempConfig = this.createOrGetDialogConfig<ConfirmDialogOpts>(config);
    tempConfig.data = opts;
    return this.dialog.open(ConfirmDialogComponent, tempConfig);
  }

  /**
   * Opens a prompt dialog with the specified parameters
   * @param opts The options for the dialog
   * @param config Additional configurations for the dialog.
   * @returns The dialog reference
   */
  openPromptDialog(
    opts: PromptDialogOpts,
    config?: MatDialogConfig<PromptDialogOpts>
  ): MatDialogRef<PromptDialogComponent, DialogResult> {
    const tempConfig = this.createOrGetDialogConfig<PromptDialogOpts>(config);
    tempConfig.data = opts;
    return this.dialog.open(PromptDialogComponent, tempConfig);
  }
  /**
   * Opens a selection dialog with the configured options
   * @param opts The options for the dialog
   * @param config Additional configurations for the dialog.
   * @returns The dialog reference
   */
  openSelectionDialog(
    opts: SelectionDialogOpts,
    config?: MatDialogConfig<SelectionDialogOpts>
  ): MatDialogRef<SelectionDialogComponent, DialogResult> {
    const tempConfig = this.createOrGetDialogConfig<SelectionDialogOpts>(config);
    tempConfig.data = opts;
    tempConfig.panelClass = 'selection-dialog';
    return this.dialog.open(SelectionDialogComponent, tempConfig);
  }

  /**
   * Opens a portal dialog with the specified parameters
   * @param opts The options for the dialog
   * @param config Additional configurations for the dialog
   * @template T The portal's type
   * @returns The dialog reference
   */
  openPortalDialog<T>(
    opts: PortalDialogOpts<T>,
    config?: MatDialogConfig<PortalDialogOpts<T>>
  ): MatDialogRef<PortalDialogComponent, DialogResult> {
    const tempConfig = this.createOrGetDialogConfig<PortalDialogOpts<T>>(config);
    tempConfig.data = opts;
    return this.dialog.open(PortalDialogComponent, tempConfig);
  }
}
