import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RestCountriesAPICountry } from '../../models/rest-countries-api';
import { switchMap, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface HeadlineOptions {
  /**
   * The API key
   */
  apiKey?: string;
  /**
   * A country code
   */
  country?: string;
  /**
   * The category to fetch
   */
  category?: string;
  /**
   * The number of articles to return
   */
  pageSize?: number;
}

@Component({
  selector: 'app-headline-options-dialog',
  templateUrl: './headline-options-dialog.component.html'
})
export class HeadlineOptionsDialogComponent implements OnInit {

  filteredOptions: Observable<RestCountriesAPICountry[]>;
  headlineOptForm: FormGroup;
  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public headlineOpts: HeadlineOptions
  ) {
    this.headlineOptForm = fb.group({
      apiKey: ['', Validators.required],
      q: '',
      country: '',
      // country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      category: '',
      pageSize: 20
    });
  }

  ngOnInit() {
    if (this.headlineOpts) {
      this.headlineOptForm.patchValue(this.headlineOpts);
    }
    setTimeout(() => {
      this.filteredOptions = this.headlineOptForm.get('country').valueChanges
        .pipe(
          // debounceTime(150),
          switchMap(value => this.filter(value))
        );
    });
  }
  filter(name: string): Observable<RestCountriesAPICountry[]> {
    return this.http.get<RestCountriesAPICountry[]>(`https://restcountries.eu/rest/v2/name/${encodeURIComponent(name)}`);
  }

}
