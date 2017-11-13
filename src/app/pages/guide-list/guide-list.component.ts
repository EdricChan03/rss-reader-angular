import { Component, OnInit } from '@angular/core';
import { GuideItem, GuideItems } from '../../guide-items';

@Component({
	selector: 'guide-list',
	templateUrl: 'guide-list.component.html'
})
export class GuidesList implements OnInit {
	constructor(private _guideItems: GuideItems){}
	guideItems: GuideItem[];
	devItems: GuideItem[];
	ngOnInit() {
		this.guideItems = this._guideItems.getGuideItems();
		this.devItems = this._guideItems.getDevItems();
	}
}