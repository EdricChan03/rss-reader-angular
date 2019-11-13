export interface Release {
  /** Release notes for the version. */
  releaseNotes: ReleaseNotes;
  /** Release date for the version. */
  releaseDate?: string;
  /** The person who released the version. */
  releaseAuthor?: string;
  /** The Git commit SHA of the version. */
  releaseCommitSha?: string;
  /** The release type. (Currently not supported) */
  releaseType?: ReleaseType;
}

/**
 * Contains either a string representing a link to the repository, or an
 * object containing metadata of the repository.
 */
export type GitRepo = {
  /** The host of the repository. (The host's address should be used) */
  host: string;
  /** The username that owns the repository. */
  username: string;
  /** The name of the repository. */
  repo: string;
} | string;

export type ReleaseNotes = {
  /** A summary of the release notes. */
  summary: string[] | string;
  /** A detailed version of the release notes. */
  details?: string[] | string;
} | string[] | string;

export type ReleaseType = 'stable' | 'beta' | 'nightly';

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
  /** A link to the Git repository. */
  gitRepo?: GitRepo;
}
