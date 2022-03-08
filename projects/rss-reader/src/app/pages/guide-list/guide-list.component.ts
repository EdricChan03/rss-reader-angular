import { Component, OnInit } from '@angular/core';
import { GuideItem, GuideItemsService } from '../../guide-items';

@Component({
  selector: 'app-guide-list',
  templateUrl: 'guide-list.component.html'
})
export class GuidesListComponent implements OnInit {
  guideItems: GuideItem[];
  // devItems: GuideItem[];
  constructor(private itemsService: GuideItemsService) {}
  ngOnInit() {
    this.guideItems = this.itemsService.getGuideItems();
    // this.devItems = this.itemsService.getDevItems();
  }
}
