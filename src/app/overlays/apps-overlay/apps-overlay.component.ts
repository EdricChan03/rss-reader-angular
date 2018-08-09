import { OverlayService } from '../../overlay.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-apps-overlay',
  templateUrl: './apps-overlay.component.html',
  styleUrls: ['./apps-overlay.component.scss']
})
export class AppsOverlayComponent {

  showMore: boolean = false;
  constructor(private overlayService: OverlayService) { }

  closeOverlay() {
    this.overlayService.close();
  }

}
