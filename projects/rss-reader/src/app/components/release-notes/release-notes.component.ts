import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReleaseNotesJSON, ReleaseNotes, Release } from './release-notes';
import releaseNotes from '../../../assets/release-notes.json';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styles: []
})
export class ReleaseNotesComponent implements OnInit {

  constructor(private http: HttpClient) { }

  /** Retrieves the release notes JSON file. */
  get releaseNotes(): ReleaseNotesJSON {
    return releaseNotes;
  }

  /** Retrieves the list of versions. */
  get versions(): string[] {
    return Object.keys(this.releaseNotes.releases);
  }

  /**
   * Retrieves the release notes for the specified `version`.
   * @param version The version
   */
  getReleaseNote(version: string): ReleaseNotes {
    return this.releaseNotes.releases[version].releaseNotes;
  }

  /**
   * Retrieves the date when the `version` was released.
   * @param version The version to retrieve.
   */
  getReleaseDate(version: string): string {
    return this.releaseNotes.releases[version].releaseDate;
  }

  /**
   * Retrieves the author of the release.
   * @param version The version to retrieve.
   */
  getReleaseAuthor(version: string): string {
    return this.releaseNotes.releases[version].releaseAuthor;
  }

  /**
   * Retrieves information about a particular version's release notes.
   * @param version The version to retrieve.
   */
  getReleaseInfo(version: string): Release {
    return this.releaseNotes.releases[version];
  }

  /**
   * Joins a list of release notes to a string.
   * @param notes The notes to join
   */
  joinReleaseNotes(notes: string[]): string {
    return notes.join('\n');
  }

  /**
   * Checks if the specified `val` parameter is an array.
   * @param val The value to check.
   */
  isArray(val: any): boolean {
    return Array.isArray(val);
  }

  /**
   * Checks whether the specified `val` parameter is a URL.
   * @param val The value to check.
   *
   * _See https://stackoverflow.com/a/46296668/6782707 for more info._
   */
  isUrl(val: string): boolean {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(val);
  }

  /**
   * Checks whether the specified `val` parameter is a string.
   * @param val The value to check.
   */
  isStr(val: any): boolean {
    return typeof val === 'string';
  }

  ngOnInit() {
  }

}
