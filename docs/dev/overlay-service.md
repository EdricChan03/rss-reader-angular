# `OverlayService`
## What it does
It's basically just an easier way of handling `Overlay`s that are currently opened.

## Notices
1. `OverlayModule` and `PortalModule` must be imported from `@angular/cdk/overlay` and `@angular/cdk/portal` in order for the service to work.
2. Ensure that `OverlayService` is imported and placed under the `providers` array in your app's module file:
```typescript
import { OverlayService } from './path/to/overlay.service';
@NgModule({
	providers: [
		OverlayService
	]
})
export class AppModule {}
```

# Methods
## `destroyOverlay`
Destroys the currently opened overlay.

## `close`
The same method as `destroyOverlay`, just an alias.

## `createOverlay`
Creates an overlay with the specified parameters.

Parameter | Type | Required? | Notes
---|---|---|---
`portal` | `ComponentPortal<any>` | `true` | The portal for the overlay to attach to. (Requires to be initialized with the `new` keyword)
`config` | `OverlayConfig` | `false` | The configuration for the overlay.
`backdropClickClosesOverlay` | `boolean` | `false` | Whether when the backdrop is clicked will it close the overlay.

# Examples
<!-- start-enclose-content -->
## Creating an overlay
```typescript

export class MyComponent {
	constructor(private overlayService: OverlayService){}
	createOverlay() {
		this.overlayService.createOverlay(new ComponentPortal(MyOverlayComponent), {hasBackdrop: true}, true);
	}
}
```
## Closing an overlay from the overlay itself
```typescript
export class AnotherOverlayComponent {
	constructor(private overlayService: OverlayService){}
	closeOverlay() {
		this.overlayService.close();
	}
}
```
<!-- end-enclose-content -->

# Report a bug
If there's any problems with the service, please report it on this [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSfU5LZGOBu8xpWKI1v1Yo7qT2a_8n_-3CqoQsuH2VMhGahiwQ/viewform?usp=pp_url&entry.133779622&entry.510084869=Bug+report). Thanks! :smile: