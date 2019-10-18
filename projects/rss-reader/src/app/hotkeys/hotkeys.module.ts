import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HotkeyHelpDialogComponent } from './hotkey-help-dialog/hotkey-help-dialog.component';
import { HotkeysService } from './hotkeys.service';

@NgModule({
  declarations: [HotkeyHelpDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [HotkeysService],
  entryComponents: [HotkeyHelpDialogComponent],
  exports: [HotkeyHelpDialogComponent]
})
export class HotkeysModule { }
