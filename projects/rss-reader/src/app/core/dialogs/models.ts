import { Portal } from '@angular/cdk/portal';
import { ThemePalette } from '@angular/material/core';
import { SafeHtml } from '@angular/platform-browser';

export type ButtonType = 'negative' | 'neutral' | 'positive';

export type DialogType = 'alert' | 'confirm' | 'message' | 'prompt' | 'portal'
  | 'selection';

export interface BaseDialogOpts {
  /** The dialog's title. */
  title?: string;
}

export interface DialogBtnOpts {
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
  /**
   * Whether to hide the action buttons.
   *
   * Optionally, you can specify which buttons to hide.
   */
  hideActionBtns?: ButtonType[] | boolean;
  /** The initial button to focus on. */
  initialActionBtnFocus?: ButtonType;
}

export interface DialogOptsWithMsg {
  /** The dialog's message. */
  msg?: string | SafeHtml;
  /** The dialog's title. */
  title?: string;
  /** Whether the dialog's message is in HTML. */
  isHtml?: boolean;
}

export interface DialogOpts extends BaseDialogOpts, DialogBtnOpts,
  DialogOptsWithMsg { }

export interface PromptDialogInputConfig {
  /** The input's placeholder. */
  placeholder?: string;
  /** The input's label. */
  label?: string;
  /** The input type. */
  inputType?: string;
  /** The input's initial value. */
  value?: string;
  /** The input's color. */
  color?: ThemePalette;
}

export interface PromptDialogOpts extends DialogOpts {
  /** Configuration for the input. */
  inputConfig?: PromptDialogInputConfig;
  /**
   * The input's placeholder.
   * @deprecated Use {@link PromptDialogInputConfig#placeholder} instead
   */
  placeholder?: string;
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
  color?: ThemePalette;
}

export interface SelectionDialogOpts extends DialogOpts {
  /** Options to be shown in the dialog. */
  options: SelectionDialogOption[];
}

export interface SelectionDialogOption {
  /** The title of the option. */
  title: string;
  /** The value of the option. */
  value: any;
  /** Whether the option is disabled. */
  disabled?: boolean;
  /** Whether the option is initially selected. */
  selected?: boolean;
  /** The checkbox position of the option. */
  checkboxPosition?: 'before' | 'after';
  /** The color of the option. */
  color?: ThemePalette;
}

export interface PortalDialogOpts<T> extends DialogOpts {
  /** The portal to render in the dialog. */
  portal: Portal<T>;
}

/** The result returned by the dialog. */
export enum DialogResult {
  /** Indicates that the user clicked the "Cancel" (or negative) button. */
  NEGATIVE = 'cancel',
  /** Alias for {@link DialogResult#NEGATIVE}. */
  CANCEL = 'cancel',
  /** Indicates that the user clicked the neutral button. */
  NEUTRAL = 'neutral',
  /** Indicates that the user clicked the "OK" (or positive) button. */
  POSITIVE = 'ok',
  /** Alias for {@link DialogResult#POSITIVE}. */
  OK = 'ok'
}
