import { Component, InjectionToken, Inject } from '@angular/core';
import { ReleaseNotesJSON, ReleaseNotes, Release, GitRepo } from './release-notes';
import releaseNotesJsonFile from '../../../assets/release-notes/release-notes.json';
import { environment } from '../../../environments/environment';

export const RELEASE_NOTES_JSON = new InjectionToken<ReleaseNotesJSON>('Release notes JSON file', {
  providedIn: 'root',
  factory: () => releaseNotesJsonFile
});

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html'
})
export class ReleaseNotesComponent {
  constructor(@Inject(RELEASE_NOTES_JSON) public releaseNotesJson: ReleaseNotesJSON) {}

  /** Retrieves the release notes JSON file. */
  get releaseNotes(): ReleaseNotesJSON {
    return this.releaseNotesJson;
  }

  /** Retrieves the list of versions. */
  get versions(): string[] {
    return Object.keys(this.releaseNotes.releases);
  }

  /** Retrieves metadata of the Git repository, or defaults to the environment. */
  get gitRepo(): string {
    return this.releaseNotes.gitRepo ?
      this.createGitRepoUrl(this.releaseNotes.gitRepo) : this.createGitRepoUrl(environment.gitRepoDefaults);
  }

  /**
   * Generates a URL to the specified Git repository.
   * @param gitRepo The Git repository to be converted to a link.
   */
  private createGitRepoUrl(gitRepo: GitRepo): string {
    return typeof gitRepo === 'object' ? `${gitRepo.host}/${gitRepo.username}/${gitRepo.repo}` : gitRepo;
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

  isArray(val: any): boolean {
    return Array.isArray(val);
  }

  // See https://stackoverflow.com/a/46296668/6782707 for more info.
  isUrl(val: string): boolean {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(val);
  }

  isStr(val: any): boolean {
    return typeof val === 'string';
  }

  isObj(val: any): boolean {
    return typeof val === 'object';
  }
}
