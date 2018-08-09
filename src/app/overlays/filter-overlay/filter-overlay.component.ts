import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-overlay',
  templateUrl: './filter-overlay.component.html',
})
export class FilterOverlayComponent {
  opts = {
    domains: '',
    langCode: '',
    sortBy: 'popularity'
  };
}
