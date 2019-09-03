export interface Release {
  /** Release notes for the version. */
  releaseNotes: ReleaseNotes;
  /** Release date for the version. */
  releaseDate?: string;
  /** The person who released the version. */
  releaseAuthor?: string;
}

export interface ReleaseNotes {
  /** A summary of the release notes. */
  summary: string[] | string;
  /** A detailed version of the release notes. */
  details?: string[] | string;
}

export interface Releases {
  [key: string]: Release;
}
export interface ReleaseNotesJSON {
  /** The schema of the JSON file. */
  $schema: string;
  /** The latest version of the app. */
  latestVersion: string;
  /** The list of releases. */
  releases: Releases;
}
