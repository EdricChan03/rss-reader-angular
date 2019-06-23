import { Component, Inject, SecurityContext } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-submit-rss-dialog',
  templateUrl: './submit-rss-dialog.component.html'
})
export class SubmitRssDialogComponent {
  constructor(
    private dom: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: { feedUrl: string }
  ) { }

  getFormUrl(): SafeResourceUrl {
    // tslint:disable-next-line:max-line-length
    return this.dom.sanitize(SecurityContext.RESOURCE_URL, `https://docs.google.com/forms/d/e/1FAIpQLSca8Iug_FPflBOHJdUN4KUBrUurOLjcyHAWqkn0_TTJ1oYmRQ/viewform?usp=pp_url&entry.1135652000=${this.data.feedUrl}`);
  }
}
