import { Environment } from '../environment.base';
import { Version } from '@angular/core';
import mockReleaseNotesJson from '../app/pages/release-notes/mocks/mock-release-notes.json';
import { GitRepo } from '../app/pages/release-notes/models/release-notes';

export const mockGitRepoDefaults: GitRepo = {
  host: 'https://github.com',
  username: 'FakeUsername248',
  repo: 'mock-repo'
};

export const environment: Environment = {
  latestVersion: new Version(mockReleaseNotesJson.latestVersion),
  production: false,
  gitRepoDefaults: mockGitRepoDefaults
};
