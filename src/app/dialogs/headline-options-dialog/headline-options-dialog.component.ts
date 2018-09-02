import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RestCountriesAPICountry } from '../../model/rest-countries-api';
import { switchMap, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-headline-options-dialog',
  templateUrl: './headline-options-dialog.component.html'
})
export class HeadlineOptionsDialogComponent implements OnInit {

  filteredOptions: Observable<RestCountriesAPICountry[]>;
  countries: RestCountriesAPICountry[];
  headlineOptForm: FormGroup;
  options: {
    apiKey?: string;
    country?: string;
    topic?: string;
  };
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.headlineOptForm = fb.group({
      apiKey: ['', Validators.required],
      country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      topic: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.options) {
      this.headlineOptForm.patchValue(this.options);
    }
    this.http.get<RestCountriesAPICountry[]>('https://restcountries.eu/rest/v2/all')
      .subscribe(result => {
        this.countries = result;
      },
        err => console.error(err));
    setTimeout(() => {
      this.filteredOptions = this.headlineOptForm.get('country')!.valueChanges
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
