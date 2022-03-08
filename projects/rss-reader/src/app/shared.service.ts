import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ComponentType } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

export interface SnackBarOpts<D = any> {
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

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private internalTitle = '';
  constructor(
    private snackBar: MatSnackBar,
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

  /** Detects if the user is using a mobile device based on CSS media queries. */
  get isMobile(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }

  /** Detects if the user is using a handset in portrait mode based on CSS media queries. */
  get isPortraitHandset(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.HandsetPortrait);
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
    // eslint-disable-next-line import/no-deprecated
    const config = opts.config ? opts.config : opts.additionalOpts;
    return this.snackBar.open(opts.msg, opts.action ? opts.action : undefined, config);
  }

  private handleSnackBarWithComponent(opts: SnackBarOpts): MatSnackBarRef<any> {
    // eslint-disable-next-line import/no-deprecated
    const config = opts.config ? opts.config : opts.additionalOpts;
    return this.snackBar.openFromComponent(opts.component, config);
  }

  /** Closes the current snackbar. */
  closeSnackBar() {
    this.snackBar.dismiss();
  }
}

@NgModule({
  providers: [
    SharedService
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
