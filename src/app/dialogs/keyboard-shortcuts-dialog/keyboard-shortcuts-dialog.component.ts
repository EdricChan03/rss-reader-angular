import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeyboardShortcut } from '../../model/keyboard-shortcut';

@Component({
  selector: 'app-keyboard-shortcuts-dialog',
  templateUrl: './keyboard-shortcuts-dialog.component.html',
  styles: []
})
export class KeyboardShortcutsDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public shortcuts: KeyboardShortcut[]
  ) { }

}
