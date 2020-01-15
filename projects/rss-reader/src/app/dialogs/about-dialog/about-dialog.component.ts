import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html'
})
export class AboutDialogComponent {
  latestVersion = environment.latestVersion.full;
}
