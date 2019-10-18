import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hotkey-help-dialog',
  templateUrl: './hotkey-help-dialog.component.html'
})
export class HotkeyHelpDialogComponent {
  hotkeys = Array.from(this.data);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Map<string, string>) {}

  getDisplayedShortcut(keys: string): string[] {
    const result = [];
    const keysArray = keys.split('.');
    // tslint:disable-next-line: forin
    for (const key of keysArray) {
      if (keysArray.includes(key)) {
        let tempResult = key;
        switch (key) {
          case 'enter':
            tempResult = 'Enter';
            break;
          case 'esc':
            tempResult = 'Esc';
            break;
          case 'shift':
            tempResult = 'Shift';
            break;
          case 'control':
            tempResult = 'Control';
            break;
          case 'alt':
            // The Alt key is an Option key on macOS devices
            tempResult = window.navigator.platform === 'MacIntel' ? 'Option' : 'Alt';
            break;
          case 'meta':
            tempResult = 'Command';
            break;
          case 'tab':
            tempResult = 'Tab';
            break;
          case 'backspace':
            tempResult = 'Backspace';
            break;
          case 'arrowup':
          case 'arrowdown':
          case 'arrowleft':
          case 'arrowright':
            switch (key) {
              case 'arrowup':
                tempResult = '↑';
                break;
              case 'arrowdown':
                tempResult = '↓';
                break;
              case 'arrowleft':
                tempResult = '←';
                break;
              case 'arrowright':
                tempResult = '→';
                break;
            }
            break;
          default:
            if (key.startsWith('f') && key.length === 2) {
              tempResult = `F${key[1]}`;
            } else {
              tempResult = key;
            }
        }
        result.push(tempResult);
      }
    }
    return result;
  }
}
