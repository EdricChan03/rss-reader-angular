import {
  FlexibleConnectedPositionStrategy,
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { ElementRef, Injectable } from '@angular/core';

import { ComponentPortal } from '@angular/cdk/portal';

@Injectable()
export class OverlayService {

  private overlayRef: OverlayRef;
  private componentPortal: ComponentPortal<any>;
  constructor(private overlay: Overlay) { }

  /**
   * Destroys the currently opened overlay
   */
  destroyOverlay(): void {
    if (this.overlayRef.hasAttached() && this.overlayRef !== null) {
      this.overlayRef.dispose();
    }
  }
  /**
   * Closes the overlay currently opened (alias of {@link OverlayService#destroyOverlay})
   *
   * @see {@link OverlayService#destroyOverlay}
   */
  close(): void {
    this.destroyOverlay();
  }
  getOverlayRef(): OverlayRef | void {
    if (this.overlayRef) {
      return this.overlayRef;
    }
  }
  /**
   * Creates a center overlay position strategy
   *
   * @returns The position strategy
   */
  createCenterOverlayPositionStrategy(): GlobalPositionStrategy {
    return this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
  }
  /**
   * Creates a below the position of an element position strategy
   *
   * @param elementRef The element ref
   * @returns The position strategy
   */
  createBelowPosElPositionStrategy(
    elementRef: ElementRef
  ): FlexibleConnectedPositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(elementRef);
  }

  /**
   * Creates an overlay with the specified parameters
   *
   * @param portal The portal to attach to the overlay's ref. For more info, visit {@link Overlay#create}
   * @param config The configuration of the overlay. See {@link OverlayConfig} for more properties.
   * @param backdropClickClosesOverlay Whether when the overlay's backdrop is clicked and it will close the overlay
   */
  createOverlay(portal: ComponentPortal<any>, config?: OverlayConfig, backdropClickClosesOverlay?: boolean): OverlayRef {
    this.overlayRef = this.overlay.create(config);
    this.componentPortal = portal;
    this.attachPortal();
    if (backdropClickClosesOverlay && config.hasBackdrop) {
      this.overlayRef.backdropClick().subscribe(() => {
        this.destroyOverlay();
      });
    }
    return this.overlayRef;
  }
  /**
   * Attaches a portal to the overlay
   */
  private attachPortal(): void {
    if (!this.overlayRef.hasAttached() && this.componentPortal) {
      this.overlayRef.attach(this.componentPortal);
    }
  }
}
