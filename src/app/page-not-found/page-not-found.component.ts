import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {

	constructor(public router: Router) { }

	ngOnInit() {
	}

}
