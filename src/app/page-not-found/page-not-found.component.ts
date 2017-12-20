import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionIcon, ActionIconService } from '../actionitem.service';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {

	constructor(public router: Router, private actionItemService: ActionIconService) { }

	ngOnInit() {
		this.actionItemService.addActionIcon({title: 'Go back', icon: 'arrow_back', onClickListener: () => {
			window.history.back();
		}, showAsAction: true});
	}
}
