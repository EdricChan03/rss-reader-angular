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
import { HotkeysService } from './hotkeys/hotkeys.service';

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
          name: 'My website',
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
    private swUpdate: SwUpdate,
    private hotkeys: HotkeysService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.actionItemService.removeActionItems();
        this._addDefaultActionItems();
      }
    });
  }
  private _addDefaultActionItems() {
    this.actionItemService.addActionItem({
      id: 'keyboard-shortcuts-action-item',
      title: 'Keyboard shortcuts',
      icon: 'keyboard',
      showAsAction: false,
      onClickListener: () => { this.hotkeys.openHotkeyHelpDialog(); }
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
      this.settings = JSON.parse(window.localStorage.getItem('settings')) as Settings;
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
      const snackBarRef = this.shared.openSnackBar({
        msg: 'You are currently offline. Some features may not be available.',
        action: 'Retry',
        additionalOpts: {
          panelClass: ['mat-elevation-z2'],
          horizontalPosition: 'start'
        }
      });
      snackBarRef.onAction().subscribe(() => {
        window.location.reload();
      });
    }

    // SwUpdate functionality
    console.log('SwUpdate#isEnabled:', this.swUpdate.isEnabled);

    this.swUpdate.checkForUpdate().then(() => {
      console.log('[AppComponent] Successfully checked for updates.');
    }, error => {
      console.error('[AppComponent] Could not check for updates:', error);
    });

    this.swUpdate.activated.subscribe(event => {
      console.log('[AppComponent] Successfully activated update!');
      this.shared.openSnackBar({
        msg: 'Successfully updated the app!'
      });
      console.log('[AppComponent] Current version is:', event.current);
      console.log('[AppComponent] Previous version is:', event.previous);
    });

    this.swUpdate.available.subscribe(event => {
      console.log('[AppComponent] Update available: current version is', event.current, 'available version is', event.available);

      function hasNewerVer(): boolean {
        const availableHasVer = 'version' in event.available.appData;
        const currentHasVer = 'version' in event.current.appData;
        let returnVal = false;

        if (availableHasVer && currentHasVer) {
          // tslint:disable-next-line: no-string-literal
          returnVal = event.available.appData['version'] !== event.current.appData['version'];
        }

        return returnVal;
      }

      const message = hasNewerVer() ?
        // tslint:disable-next-line: no-string-literal
        `A newer version (${event.available.appData['version']}) of the app is available!` :
        'A newer version of the app is available!';
      const snackBarRef = this.shared.openSnackBar({
        msg: message,
        action: 'Update & Refresh',
        additionalOpts: {
          // Interesting note: The snackbar code actually checks if the duration is above 0 and only enables auto-hide from that.
          duration: 0
        }
      });

      snackBarRef.onAction().subscribe(() => {
        this.swUpdate.activateUpdate().then(() => {
          window.location.reload();
        }, error => {
          console.error('[AppComponent] Could not activate update:', error);
        });
      });

    });
  }
}
