import { OverlayService } from '../../overlay.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-overlay',
  templateUrl: './notifications-overlay.component.html',
  styleUrls: ['./notifications-overlay.component.scss']
})
export class NotificationsOverlayComponent {

  constructor(private overlayService: OverlayService) { }
  closeOverlay() {
    this.overlayService.close();
  }
}
