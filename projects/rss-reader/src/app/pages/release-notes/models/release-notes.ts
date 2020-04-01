export interface Release {
  /** Release notes for the version. */
  releaseNotes: string[];
  /** Release name for the version. */
  releaseName?: string;
  /** Release date for the version. */
  releaseDate?: string;
  /** The person who released the version. */
  releaseAuthor?: string;
  /** The Git commit SHA of the version. */
  releaseCommitSha?: string;
  /** The release's status. */
  releaseStatus?: ReleaseStatus[] | string;
  /** Comments about the release, if any. */
  releaseComments?: string[] | string;
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

export type ReleaseStatus = 'draft' | 'wip' | 'deprecated' | 'released' | 'unreleased' | 'other';

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
