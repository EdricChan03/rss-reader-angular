import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuideItems } from './../../guide-items';

@Component({
	selector: 'guide-viewer',
	templateUrl: 'guide-viewer.component.html'
})
export class GuideViewer {

	docUrl: string;
	constructor(private route: ActivatedRoute,
		private router: Router, private guideItems: GuideItems) {
		route.params.subscribe(result => {
			if (result.docTypeId == "guides") {
				this.docUrl = guideItems.getGuideItemById(result.docId).document;
			} else if (result.docTypeId == "dev") {
				this.docUrl = guideItems.getDevItemById(result.docId).document;
			} else {
				console.warn("Invalid URL. Heading back to docs list page..");
				this.router.navigate(["/docs"]);
			}
		})
	}
}