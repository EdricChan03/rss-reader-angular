import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { ActionItemService } from './actionitem.service';
import { AboutDialogComponent } from './dialogs';
import { environment } from '../environments/environment';
import { Settings } from './model/settings';
import { OverlayService } from './overlay.service';
import { OnboardingOverlayComponent } from './overlays';
import { SharedService } from './shared.service';

@Component({
  selector: 'rss-reader',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('left', { static: true }) sidenav: MatSidenav;
  settings: Settings;
  environment = environment;
  projects = [
    {
      subheaderName: 'Projects',
      subheaderProjects: [
        {
          name: 'RSS Reader',
          url: 'https://edricchan03.github.io/rss-reader',
          icon: 'rss_feed'
        },
        {
          name: 'StudyBuddy',
          url: 'https://studybuddy-e5f46.firebaseapp.com',
          icon: 'book'
        },
        {
          name: 'Market2',
          url: 'https://market2-ed1e4.firebaseapp.com',
          icon: 'shopping_cart'
        },
        {
          name: 'Chan4077.GitHub.io',
          url: 'https://edricchan03.github.io',
          icon: 'home'
        },
        {
          name: 'First-Mod',
          url: 'https://edricchan03.github.io/First-Mod',
          icon: 'gamepads'
        }]
    },
    {
      subheaderName: 'Libraries',
      subheaderProjects: [
        {
          name: 'ngx-ytd-api',
          url: 'https://ngx-ytd-api.firebaseapp.com/master',
          icon: ''
        }
      ]
    }
  ];
  links = [
    {
      name: 'Feed',
      url: 'feed',
      icon: 'rss_feed'
    },
    {
      name: 'Headlines',
      url: 'headlines',
      icon: 'newspaper',
      isSvgIcon: true
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
    },
    {
      name: 'Settings',
      url: 'settings',
      icon: 'settings'
    },
    {
      name: 'Release notes',
      url: 'release-notes',
      icon: 'new_releases'
    }
  ];
  constructor(
    public shared: SharedService,
    private dom: DomSanitizer,
    private overlayContainer: OverlayContainer,
    private overlayService: OverlayService,
    private actionItemService: ActionItemService,
    private router: Router,
    private overlay: Overlay,
    private dialog: MatDialog,
    private swUpdate: SwUpdate
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.actionItemService.removeActionItems();
      }
    });
  }
  get isOffline() {
    return !navigator.onLine;
  }
  get isSidenavOpen() {
    if (this.sidenav.opened) {
      return true;
    } else {
      return false;
    }
  }
  aboutThisApp() {
    this.dialog.open(AboutDialogComponent);
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
    this.swUpdate.available.subscribe(event => {
      console.log('[App] Update available: current version is', event.current, 'available version is', event.available);
      const snackBarRef = this.shared.openSnackBar({
        msg: 'A newer version of this app is available!',
        action: 'Update & Refresh'
      });

      snackBarRef.onAction().subscribe(() => {
        this.shared.activateUpdate();
      });

    });
  }
}
