import { Component, OnInit } from '@angular/core';
import { GuideItem, GuideItemsService } from '../../guide-items';

@Component({
  selector: 'guide-list',
  templateUrl: 'guide-list.component.html'
})
export class GuidesListComponent implements OnInit {
  constructor(private itemsService: GuideItemsService) {}
  guideItems: GuideItem[];
  // devItems: GuideItem[];
  ngOnInit() {
    this.guideItems = this.itemsService.getGuideItems();
    // this.devItems = this.itemsService.getDevItems();
  }
}
