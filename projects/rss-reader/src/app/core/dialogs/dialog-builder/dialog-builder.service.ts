import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

import { PortalDialogOpts } from '../models';
import { Portal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
/**
 * A dialog builder service, akin to Android's `AlertDialog.Builder` class.
 */
export class DialogBuilderService {
  /** The message of the dialog. */
  message: string;
  /** The title of the dialog. */
  title: string;

  /** The portal to render in the dialog. */
  portal: Portal<any>;

  /** The negative button's text. */
  negativeBtnText: string;
  /** The negative button's colour. */
  negativeBtnColor: ThemePalette;
  /** The neutral button's text. */
  neutralBtnText: string;
  /** The neutral button's colour. */
  neutralBtnColor: ThemePalette;
  /** The positive button's text. */
  positiveBtnText: string;
  /** The positive button's colour. */
  positiveBtnColor: ThemePalette;

  constructor(private dialog: MatDialog) { }

  /**
   * Sets the dialog's message.
   * @param message The message to set.
   * @returns The current instance of the builder.
   */
  setMessage(message: string): DialogBuilderService {
    this.message = message;
    return this;
  }

  /**
   * Sets the dialog's title.
   * @param title The title to set.
   * @returns The current instance of the builder.
   */
  setTitle(title: string): DialogBuilderService {
    this.title = title;
    return this;
  }

  /**
   * Sets the dialog negative button's properties.
   * @param text The text to set.
   * @param color The colour to set.
   * @returns The current instance of the builder.
   */
  setNegativeButton(text: string, color?: ThemePalette): DialogBuilderService {
    this.negativeBtnText = text;
    this.negativeBtnColor = color;
    return this;
  }

  /**
   * Sets the dialog neutral button's properties.
   * @param text The text to set.
   * @param color The colour to set.
   * @returns The current instance of the builder.
   */
  setNeutralButton(text: string, color?: ThemePalette): DialogBuilderService {
    this.neutralBtnText = text;
    this.neutralBtnColor = color;
    return this;
  }

  /**
   * Sets the dialog positive button's properties.
   * @param text The text to set.
   * @param color The colour to set.
   * @returns The current instance of the builder.
   */
  setPositiveButton(text: string, color?: ThemePalette): DialogBuilderService {
    this.positiveBtnText = text;
    this.positiveBtnColor = color;
    return this;
  }

  show() {

  }
}
