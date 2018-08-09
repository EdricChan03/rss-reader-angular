import { ActionIcon, ActionIconService } from './actionitem.service';
import {
  AppsOverlayComponent,
  FilterOverlayComponent,
  NotificationsOverlayComponent,
  OnboardingOverlayComponent
} from './overlays';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';

import { AboutDialog } from './dialogs/about-dialog/about-dialog.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ComponentPortal } from '@angular/cdk/portal';
import { DomSanitizer } from '@angular/platform-browser';
import { Feed } from './model/feed';
import { HttpClient } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderByPipe } from './pipe/orderby.pipe';
import { OverlayService } from './overlay.service';
import { Settings } from './model/settings';
import { SharedService } from './shared.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'rss-reader',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('left') sidenav: MatSidenav;
  @ViewChild('appsBtn') appsBtn: MatButton;
  @ViewChild('notificationsBtn') notificationsBtn: MatButton;
  settings: Settings;
  environment = environment;
  links = [
    {
      name: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      name: 'Settings',
      url: 'settings',
      icon: 'settings'
    },
    {
      name: 'Guides',
      url: 'docs',
      icon: 'book'
    },
    {
      name: 'Explore',
      url: 'explore',
      icon: 'explore'
    }
  ];
  constructor(
    private shared: SharedService,
    private dom: DomSanitizer,
    private overlayContainer: OverlayContainer,
    private overlayService: OverlayService,
    private actionItemService: ActionIconService,
    private router: Router,
    private overlay: Overlay,
    private dialog: MatDialog
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (router.url === '/home') {
          this.actionItemService.removeActionItemByTitle('Select RSS...');
          this.actionItemService.removeActionItemByTitle('RSS Options...');
          this.actionItemService.removeActionItemByTitle('Refresh feed');
          if (window.localStorage.getItem('feedUrl')) {
            this.actionItemService.removeActionItemByTitle('RSS Channel info');
          }
        }
      }
    });
  }
  get isOffline() {
    return !navigator.onLine;
  }
  get isMobile() {
    return this.shared.isMobile();
  }
  get isSidenavOpen() {
    if (this.sidenav.opened) {
      return true;
    } else {
      return false;
    }
  }
  aboutThisApp() {
    this.dialog.open(AboutDialog);
  }
  showOnboardingOverlay() {
    this._createOnboardingOverlay();
  }
  private _createOnboardingOverlay() {
    this.overlayService.createOverlay(new ComponentPortal(OnboardingOverlayComponent), {
      positionStrategy: this.overlayService.createCenterOverlayPositionStrategy(),
      hasBackdrop: true
    }, true);
  }
  showAppsOverlay() {
    this._createAppsOverlay();
  }
  private _createAppsOverlay() {
    this.overlayService.createOverlay(new ComponentPortal(AppsOverlayComponent), {
      // tslint:disable-next-line:max-line-length
      positionStrategy: this.overlayService.createBelowPosElPositionStrategy(this.appsBtn._elementRef, { originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }),
      hasBackdrop: true
    }, true);
  }
  showNotificationsOverlay() {
    this._createNotificationsOverlay();
  }
  private _createNotificationsOverlay() {
    this.overlayService.createOverlay(new ComponentPortal(NotificationsOverlayComponent), {
      // tslint:disable-next-line:max-line-length
      positionStrategy: this.overlayService.createBelowPosElPositionStrategy(this.notificationsBtn._elementRef, { originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }),
      hasBackdrop: true
    }, true);

  }
  ngOnDestroy() {
    this.overlayService.destroyOverlay();
  }
  ngOnInit() {
    if (window.localStorage.getItem('hasLaunched')) {
      if (!JSON.parse(window.localStorage.getItem('hasLaunched'))) {
        window.localStorage.setItem('hasLaunched', JSON.stringify(true));
        this.showOnboardingOverlay();
      }
    }
    if (window.localStorage.getItem('settings')) {
      this.settings = <Settings>JSON.parse(window.localStorage.getItem('settings'));
      if (this.settings.theme) {
        document.getElementsByTagName('body')[0].classList.add(this.settings.theme);
        this.overlayContainer.getContainerElement().classList.add(this.settings.theme);
      } else {
        console.warn('Theme setting was not found. Using default...');
        document.getElementsByTagName('body')[0].classList.add('indigo-pink');
        this.overlayContainer.getContainerElement().classList.add('indigo-pink');
      }
    } else {
      const tempSettings: Settings = { showImages: true, multipleRss: false, openNewTab: true, theme: 'indigo-pink' };
      document.getElementsByTagName('body')[0].classList.add('indigo-pink');
      this.overlayContainer.getContainerElement().classList.add('indigo-pink');
      window.localStorage.setItem('settings', JSON.stringify(tempSettings));
    }
    if (this.isOffline) {
      console.log('User is offline');
      // tslint:disable-next-line:max-line-length
      const snackBarRef = this.shared.openSnackBar({ msg: 'You are currently offline. Some features may not be available.', action: 'Retry', additionalOpts: { panelClass: ['mat-elevation-z2'], horizontalPosition: 'start' } });
      snackBarRef.onAction().subscribe(() => {
        window.location.reload(true);
      });
    }
  }
}
