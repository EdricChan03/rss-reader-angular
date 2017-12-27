import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayRef, Overlay, OverlayConfig, GlobalPositionStrategy, OriginConnectionPosition, OverlayConnectionPosition, ConnectedPositionStrategy } from '@angular/cdk/overlay';
import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class OverlayService {

	private _overlayRef: OverlayRef;
	private _componentPortal: ComponentPortal<any>;
	constructor(private _overlay: Overlay) { }
	/**
	 * Attaches a portal to the overlay
	 * @private
	 */
	private _attachPortal(): void {
		if (!this._overlayRef.hasAttached() && this._componentPortal) {
			this._overlayRef.attach(this._componentPortal);
		}
	}
	/**
	 * Destroys the currently opened overlay
	 */
	destroyOverlay(): void {
		if (this._overlayRef.hasAttached() && this._overlayRef !== null) {
			this._overlayRef.dispose();
		}
	}
	/**
	 * Closes the overlay currently opened (alias)
	 * @see {@link OverlayService#destroyOverlay}
	 */
	close(): void {
		this.destroyOverlay();
	}
	getOverlayRef(): OverlayRef | void {
		if (this._overlayRef) {
			return this._overlayRef;
		}
	}
	/**
	 * Creates a center overlay position strategy
	 * @returns {GlobalPositionStrategy} The position strategy
	 */
	createCenterOverlayPositionStrategy(): GlobalPositionStrategy {
		return this._overlay
			.position()
			.global()
			.centerHorizontally()
			.centerVertically();
	}
	/**
	 * Creates a below the position of an element position strategy
	 * @param {ElementRef} elementRef The element ref
	 * @param {OriginConnectionPosition} originPos The origin's positions
	 * @param {OverlayConnectionPosition} overlayPos The overlay's positions
	 * @returns {ConnectedPositionStrategy} The position strategy
	 */
	createBelowPosElPositionStrategy(
		elementRef: ElementRef,
		originPos: OriginConnectionPosition,
		overlayPos: OverlayConnectionPosition
	): ConnectedPositionStrategy {
		return this._overlay
			.position()
			.connectedTo(elementRef, originPos, overlayPos);
	}

	/**
	 * Creates an overlay with the specified parameters
	 * @param {ComponentPortal<any>} portal The portal to attach to the overlay's ref. For more info, visit {@link Overlay#create}
	 * @param {OverlayConfig} config The configuration of the overlay. See {@link OverlayConfig} for more properties.
	 * @param {boolean} backdropClickClosesOverlay Whether when the overlay's backdrop is clicked and it will close the overlay
	 */
	createOverlay(portal: ComponentPortal<any>, config?: OverlayConfig, backdropClickClosesOverlay?: boolean): OverlayRef {
		this._overlayRef = this._overlay.create(config);
		this._componentPortal = portal;
		this._attachPortal();
		if (backdropClickClosesOverlay && config.hasBackdrop) {
			this._overlayRef.backdropClick().subscribe(() => {
				this.close();
			});
		}
		return this._overlayRef;
	}
}
