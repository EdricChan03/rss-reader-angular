import { Component, Inject, SecurityContext } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
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
    // eslint-disable-next-line max-len
    return this.dom.sanitize(SecurityContext.URL, `https://docs.google.com/forms/d/e/1FAIpQLSca8Iug_FPflBOHJdUN4KUBrUurOLjcyHAWqkn0_TTJ1oYmRQ/viewform?usp=pp_url&entry.1135652000=${this.data.feedUrl}`);
  }
}
