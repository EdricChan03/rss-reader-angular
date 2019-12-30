# `OverlayService`

> **DEPRECATED**
>
> This document has been marked as deprecated as the service shouldn't be
> documented to other developers in the first place.

## About

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

---

# Methods

## `destroyOverlay`

Destroys the currently opened overlay.

## `close`

The same method as `destroyOverlay`, just an alias.

**DEPRECATED:** Consider using the `destroyOverlay` method instead.

## `createOverlay`

Creates an overlay with the specified parameters.

Parameter | Type | Required? | Notes
---|---|---|---
`portal` | `ComponentPortal<any>` | `true` | The portal for the overlay to attach to. (Requires to be initialized with the `new` keyword)
`config` | `OverlayConfig` | `false` | The configuration for the overlay.
`backdropClickClosesOverlay` | `boolean` | `false` | Whether when the backdrop is clicked will it close the overlay.

## Examples

<!-- start-enclose-content -->

### Creating an overlay

```typescript
import { HelpOverlayComponent } from '../help-overlay.component';
// ...

export class MyComponent {
  constructor(private overlayService: OverlayService){ }
  showHelpOverlay() {
    this.overlayService.createOverlay(
      new ComponentPortal(HelpOverlayComponent) /* A portal */,
      {hasBackdrop: true},                      /* Configuration options for the overlay */
      true                                      /* backdrop click closes overlay */);
  }
}
```

### Closing an overlay from the overlay itself

```typescript
export class CoolOverlayComponent {
  constructor(private overlayService: OverlayService){ }
  closeOverlay() {
    this.overlayService.destroyOverlay();
  }
}
```

<!-- end-enclose-content -->

---

If there's any problem(s) with the code/you have a feature request, please post the problem(s) on this [Google Form](https://docs.google.com/forms/d/e/1FAIpQLSfU5LZGOBu8xpWKI1v1Yo7qT2a_8n_-3CqoQsuH2VMhGahiwQ/viewform?usp=pp_url&entry.133779622&entry.510084869=Bug+report).
