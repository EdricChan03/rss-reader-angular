import { FilterOverlayComponent } from '../overlays/filter-overlay/filter-overlay.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy {
  isInputFocused = false;
  search: string;
  newsSources: Source[];
  filteredNewsSources: any;
  private _overlayRef: OverlayRef;
  private newsApiSourcesEndpoint = 'https://newsapi.org/v2/sources?apiKey=1bc8e59db83a42b490cb2f6f2b604f69';
  private newsApiEverythingEndpoint = 'https://newsapi.org/v2/everything?apiKey=1bc8e59db83a42b490cb2f6f2b604f69';
  private _overlayIsOpen = false;
  @ViewChild('filterOverlayBtn', { static: true }) filterOverlayBtn: MatButton;
  constructor(
    private http: HttpClient,
    private shared: SharedService,
    private overlay: Overlay) { }
  getNewsSources() {
    this.http.get<SourceAPI>(this.newsApiSourcesEndpoint).subscribe(result => {
      if (result.status === 'error') {
        if (result.code && result.message) {
          // tslint:disable-next-line:max-line-length
          const snackBarRef = this.shared.openSnackBar({ msg: `Error ${result.code}: ${result.message}`, action: 'Retry', additionalOpts: { duration: 5000, panelClass: ['mat-elevation-z2'] } });
          snackBarRef.onAction().subscribe(() => {
            this.getNewsSources();
          });
        } else {
          const snackBarRef = this.shared.openSnackBar({
            msg: 'Error: An unknown error occured. Try refreshing!',
            additionalOpts: {
              duration: 5000
            }
          });
          snackBarRef.onAction().subscribe(() => {
            this.getNewsSources();
          });
        }
      } else {
        this.newsSources = result.sources;
      }
    });
  }
  searchEverything(searchStr: string) {
    const searchEverythingEndpoint = this.http.get(`${this.newsApiEverythingEndpoint}&q=${searchStr}`);
  }
  toggleFilterOverlay() {
    this._overlayIsOpen = !this._overlayIsOpen;
    if (this._overlayIsOpen) {
      if (!this._overlayRef) {
        this._createOverlay();
      }
    } else {
      if (this._overlayRef && this._overlayRef.hasAttached()) {
        this._overlayRef.dispose();
        this._overlayRef = null;
      }
    }
  }
  private _createOverlay() {
    this._overlayRef = this.overlay.create({
      // tslint:disable-next-line:max-line-length
      positionStrategy: this.overlay.position().connectedTo(this.filterOverlayBtn._elementRef, { originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' })
    });
    const filterOptionsPortal = new ComponentPortal(FilterOverlayComponent);
    this._overlayRef.attach(filterOptionsPortal);
  }
  ngOnInit() {
    this.getNewsSources();
  }
  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

}

// More info available at https://newsapi.org/docs/endpoints/sources
interface SourceAPI {
  status: 'ok' | 'error';
  code?: string;
  message?: string;
  sources: Source[];
}
interface Source {
  name: string;
  description: string;
  url: string;
  category?: string;
  language?: string;
  country?: string;
}
