import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { SelectionDialogComponent } from './selection-dialog/selection-dialog.component';

import { PortalDialogComponent } from './portal-dialog/portal-dialog.component';

const DIALOGS = [
  AlertDialogComponent,
  ConfirmDialogComponent,
  PromptDialogComponent,
  SelectionDialogComponent
]

const MATERIAL_MODULES = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule
]

@NgModule({
  declarations: [DIALOGS, PortalDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexModule,
    PortalModule,
    MATERIAL_MODULES
  ]
})
export class DialogsModule { }
