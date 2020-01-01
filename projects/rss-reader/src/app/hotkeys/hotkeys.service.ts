// Code adapted from https://netbasal.com/diy-keyboard-shortcuts-in-your-angular-application-4704734547a2

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HotkeyHelpDialogComponent } from './hotkey-help-dialog/hotkey-help-dialog.component';

type Platform = 'windows' | 'macos' | 'linux' | 'other';

interface Hotkey {
  /** A valid hotkey bind. */
  keys: string;
  /** The platform where this hotkey will be valid for. */
  platform?: Platform;
}
interface HotkeyOptions {
  /** The element to bind the hotkey to. */
  element: any;
  /** A valid hotkey bind, or a list of hotkey binds. */
  keys: string | Hotkey[];
  /** The description of the hotkey, if any. */
  description?: string;
  /**
   * Blacklist for elements that should not have keyboard shortcuts
   *
   * When specified, it is assumed that all other elements are whitelisted.
   */
  shortcutBlacklistEls?: string[];
  /**
   * Whitelist for elements that should have keyboard shortcuts
   *
   * When specified, it is assumed that all other elements are blacklisted.
   */
  shortcutWhitelistEls?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class HotkeysService {
  hotkeys = new Map<string, string>();
  readonly hotkeyHelpDialogId = 'hotkey-help-dialog';
  defaults: Partial<HotkeyOptions> = {
    // Specify a default description for hotkeys with no specified desc
    description: '<No description>',
    element: this.document
  };

  constructor(
    private eventManager: EventManager,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.addShortcut({ keys: 'shift.?', description: 'Show this help dialog', shortcutBlacklistEls: ['input', 'textarea'] })
      .subscribe(() => {
        this.openHotkeyHelpDialog();
      });
  }

  /**
   * Adds a keyboard shortcut which binds to the specified `element`
   * @param options Options for the shortcut
   * @returns The observable
   */
  addShortcut(options: Partial<HotkeyOptions>): Observable<KeyboardEvent> {
    const merged = { ...this.defaults, ...options };
    const event = `keydown.${merged.keys}`;

    if (merged.description) {
      if (typeof merged.keys === 'string') {
        this.hotkeys.set(merged.keys, merged.description);
      } else {
        merged.keys.forEach(hotkey => {
          if (this.isPlatform(hotkey.platform)) {
            this.hotkeys.set(hotkey.keys, merged.description);
          }
        });
      }
    }

    return new Observable(observer => {
      const handler = (e: KeyboardEvent) => {
        let skipHotkey = false;
        if (merged.shortcutBlacklistEls !== undefined) {
          const blacklistEls = merged.shortcutBlacklistEls.map(el => el.toUpperCase());
          // We can't just assume that the target is always a HTML element
          // See https://stackoverflow.com/q/28900077/6782707
          if (e.target instanceof Element) {
            // Target is a HTML element
            if (blacklistEls.includes(e.target.tagName)) {
              skipHotkey = true;
            }
          }
        }
        if (merged.shortcutWhitelistEls !== undefined) {
          const whitelistEls = merged.shortcutWhitelistEls.map(el => el.toUpperCase());
          // We can't just assume that the target is always a HTML element
          // See https://stackoverflow.com/q/28900077/6782707
          if (e.target instanceof Element) {
            // Target is a HTML element
            if (!whitelistEls.includes(e.target.tagName)) {
              skipHotkey = true;
            }
          }
        }

        if (!skipHotkey) {
          e.preventDefault();
          observer.next(e);
        }
      };

      const dispose = this.eventManager.addEventListener(
        merged.element, event, handler
      );

      return () => {
        dispose();
        if (typeof merged.keys === 'string') {
          this.hotkeys.delete(merged.keys);
        } else {
          merged.keys.forEach(hotkey => {
            if (this.isPlatform(hotkey.platform)) {
              this.hotkeys.delete(hotkey.keys);
            }
          });
        }
      };
    });
  }

  openHotkeyHelpDialog() {
    // Interesting tidbit: as it turns out, MatDialog#getDialogById actually
    // returns undefined, not null if the dialog doesn't exist
    if (this.dialog.getDialogById(this.hotkeyHelpDialogId) !== undefined) {
      // Close existing dialog
      this.dialog.getDialogById(this.hotkeyHelpDialogId).close();
    } else {
      this.dialog.open(HotkeyHelpDialogComponent, {
        data: this.hotkeys,
        id: this.hotkeyHelpDialogId
      });
    }
  }

  /**
   * Whether the platform matches the specified `platform`.
   * @param platform The platform to check.
   */
  private isPlatform(platform: Platform): boolean {
    // See https://stackoverflow.com/a/19883965/6782707
    let result = false;
    switch (window.navigator.platform) {
      case 'Macintosh':
      case 'MacIntel':
        result = platform === 'macos';
        break;
      case 'Windows':
      case 'Win16':
      case 'Win32':
      case 'WinCE':
        result = platform === 'windows';
        break;
      default:
        if (window.navigator.platform.includes('Linux')) {
          result = platform === 'linux';
        } else {
          result = platform === 'other';
        }
        break;
    }
    return result;
  }
}
