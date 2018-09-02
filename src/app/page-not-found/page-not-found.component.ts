import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionItemService } from '../actionitem.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {

  constructor(public router: Router, private actionItemService: ActionItemService) { }

  ngOnInit() {
    this.actionItemService.addActionItem({title: 'Go back', icon: 'arrow_back', onClickListener: () => {
      window.history.back();
    }, showAsAction: true});
  }
}
