import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationStart, Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { ActionItemService } from './actionitem.service';
import { AboutDialogComponent } from './dialogs';
import { environment } from '../environments/environment';
import { Settings } from './models/settings';
import { OverlayService } from './overlay.service';
import { OnboardingOverlayComponent } from './overlays';
import { SharedService } from './shared.service';
import { HotkeysService } from './hotkeys/hotkeys.service';
import { SettingsStorageService } from './core/settings-storage/settings-storage.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'rss-reader',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('left', { static: true }) sidenav: MatSidenav;
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
    private overlayService: OverlayService,
    private actionItemService: ActionItemService,
    router: Router,
    private dialog: MatDialog,
    private swUpdate: SwUpdate,
    private hotkeys: HotkeysService,
    private settingsStorage: SettingsStorageService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.actionItemService.removeActionItems();
        this.addDefaultActionItems();
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
    this.createOnboardingOverlay();
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
    if (this.settingsStorage.settings) {
      if (this.settingsStorage.settings.theme) {
        document.body.classList.add(this.settingsStorage.settings.theme);
      } else {
        console.warn('Theme setting was not found. Using default...');
        document.body.classList.add('indigo-pink');
      }
    } else {
      const tempSettings: Settings = { showImages: true, multipleRss: false, openNewTab: true, theme: 'indigo-pink' };
      document.body.classList.add('indigo-pink');
      this.settingsStorage.setSettings(tempSettings);
    }
    if (this.isOffline) {
      console.log('User is offline');
      // eslint-disable-next-line max-len
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

      const hasNewerVer = () => {
        const availableHasVer = 'version' in event.available.appData;
        const currentHasVer = 'version' in event.current.appData;
        let returnVal = false;

        if (availableHasVer && currentHasVer) {
          returnVal = event.available.appData['version'] !== event.current.appData['version'];
        }

        return returnVal;
      };

      const message = hasNewerVer() ?
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

  private addDefaultActionItems() {
    this.actionItemService.addActionItem({
      id: 'keyboard-shortcuts-action-item',
      title: 'Keyboard shortcuts',
      icon: 'keyboard',
      showAsAction: false,
      onClickListener: () => { this.hotkeys.openHotkeyHelpDialog(); }
    });
  }

  private createOnboardingOverlay() {
    this.overlayService.createOverlay(new ComponentPortal(OnboardingOverlayComponent), {
      positionStrategy: this.overlayService.createCenterOverlayPositionStrategy(),
      hasBackdrop: true
    }, true);
  }
}
