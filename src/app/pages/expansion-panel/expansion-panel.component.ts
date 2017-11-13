import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
	selector: 'expansion-panel',
	templateUrl: './expansion-panel.component.html'
})
export class ExpansionPanelComponent {
	html: SafeHtml;
}
