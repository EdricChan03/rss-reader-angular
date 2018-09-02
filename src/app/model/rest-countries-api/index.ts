/**
 * @description This TypeScript file includes unofficial interfaces for https://restcountries.eu.
 * Descriptions of each property are provided by me.
 * Props to the devs of the website for providing such a useful API! 🎉
 * It's open source as well! Link: https://github.com/apilayer/restcountries
 */

export interface RestCountriesAPICountryCurrency {
  /**
   * The codename of the country's currency
   */
  code?: string;
  /**
   * The name of the country's currency
   */
  name?: string;
  /**
   * The Unicode symbol of the country's currency
   */
  symbol?: string;
}
export interface RestCountriesAPICountryLanguage {
  iso639_1?: string;
  iso639_2?: string;
  name?: string;
  nativeName?: string;
}
export interface RestCountriesAPICountryTranslation {
  [key: string]: string;
}
export interface RestCountriesAPICountryRegionalBloc {
  acronym?: string;
  name?: string;
  otherAcronyms?: string[];
  otherNames?: string[];
}
export interface RestCountriesAPICountry {
  /**
   * The country's name
   */
  name?: string;
  /**
   * The top level domain of the country
   */
  topLevelDomain?: string[];
  /**
   * The 2 letter code of the country
   */
  alpha2Code?: string;
  /**
   * The 3 letter code of the country
   */
  alpha3Code?: string;
  /**
   * Phone number codes for the country
   */
  callingCodes?: string[];
  /**
   * The capital of the country
   * Note: This field will be an empty string if there's no capital.
   */
  capital?: string;
  /**
   * Alternate spellings of the country
   */
  altSpellings?: string[];
  /**
   * The region that the country is in
   */
  region?: string;
  /**
   * The subregion that the country is in
   */
  subregion?: string;
  /**
   * The total population of the country
   */
  population?: number;
  /**
   * The latitude and longtitude points of the country
   */
  latlng?: number[];
  /**
   * The name given to inhabitants of the country
   */
  demonym?: string;
  /**
   * The area of the country in square kilometres
   */
  area?: number;
  /**
   * Used for representing the income distribution of the country's residents
   * See https://en.wikipedia.org/wiki/Gini_coefficient for more info.
   */
  gini?: number;
  /**
   * The timezone(s) of the country (in GMT)
   */
  timezones?: string[];
  /**
   * The borders of the country denoted with country codes
   */
  borders?: string[];
  /**
   * The name of the country according to inhabitants
   */
  nativeName?: string;
  /**
   * A 3-digit country code denoted to represent a country
   * See https://en.wikipedia.org/wiki/ISO_3166-1_numeric for more info
   */
  numericCode?: string;
  /**
   * An array of currencies used in the country
   */
  currencies?: RestCountriesAPICountryCurrency[];
  /**
   * An array of languages spoken in the country
   */
  languages?: RestCountriesAPICountryLanguage[];
  /**
   * An array of alternative names of the country in other areas
   */
  translations?: RestCountriesAPICountryTranslation[];
  /**
   * The country's flag (as a URL)
   */
  flag?: string;
  /**
   * Trading blocs
   */
  regionalBlocs?: RestCountriesAPICountryRegionalBloc[];
  /**
   * Unknown property
   */
  cioc?: string;
}
