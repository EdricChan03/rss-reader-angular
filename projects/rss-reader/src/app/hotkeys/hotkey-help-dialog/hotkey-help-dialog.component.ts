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
    // eslint-disable-next-line guard-for-in
    for (const key of keysArray) {
      if (keysArray.includes(key)) {
        let tempResult = key;
        switch (key) {
          case 'enter':
          case 'esc':
          case 'shift':
          case 'control':
          case 'tab':
          case 'backspace':
            tempResult = this.capitalise(key);
            break;
          case 'alt':
            // The Alt key is an Option key on macOS devices
            tempResult = window.navigator.platform === 'MacIntel' ? 'Option' : 'Alt';
            break;
          case 'meta':
            tempResult = 'Command';
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
            if (key.startsWith('f') && (key.length === 2 || key.length === 3)) {
              // See https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/ for more info
              tempResult = this.capitalise(key);
            } else {
              tempResult = key.toLocaleLowerCase();
            }
        }
        result.push(tempResult);
      }
    }
    return result;
  }

  private capitalise(str: string): string {
    // See https://joshtronic.com/2016/02/14/how-to-capitalize-the-first-letter-in-a-string-in-javascript/
    return str.charAt(0).toLocaleUpperCase() + str.substring(1);
  }
}
