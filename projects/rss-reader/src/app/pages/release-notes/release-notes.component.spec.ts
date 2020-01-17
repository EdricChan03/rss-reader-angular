import { ComponentFixture, TestBed, TestBedStatic, TestModuleMetadata } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../../../environments/environment';
import mockReleaseNotesJson from './mocks/mock-release-notes.json';
import { GitRepo } from './release-notes';
import { ReleaseNotesComponent, RELEASE_NOTES_JSON, GIT_REPO } from './release-notes.component';

describe('ReleaseNotesComponent', () => {
  let component: ReleaseNotesComponent;
  let componentEl: HTMLElement;
  let fixture: ComponentFixture<ReleaseNotesComponent>;

  function configureTestingModule(moduleDef?: Partial<TestModuleMetadata>): TestBedStatic {
    const DEFAULT_MODULE_DEF: TestModuleMetadata = {
      declarations: [ReleaseNotesComponent],
      imports: [
        // forRoot returns the needed MarkdownService which allows the tests
        // to pass.
        MarkdownModule.forRoot(),
        MatChipsModule
      ],
      providers: [
        { provide: RELEASE_NOTES_JSON, useFactory: () => mockReleaseNotesJson }
      ]
    };

    return TestBed.configureTestingModule({
      ...DEFAULT_MODULE_DEF,
      ...moduleDef
    });
  }

  beforeEach(() => {
    configureTestingModule().compileComponents();

    fixture = TestBed.createComponent(ReleaseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    componentEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('component code', () => {
    describe('get releaseNotes', () => {
      it('should return the release notes JSON', () => {
        expect(component.releaseNotes).toEqual(mockReleaseNotesJson);
      });
    });

    describe('get versions', () => {
      it('should return the list of versions from the JSON', () => {
        const versions = Object.keys(mockReleaseNotesJson.releases);
        expect(component.versions).toEqual(versions);
      });
    });

    describe('get gitRepo', () => {
      it('should return the parsed GitRepo object', () => {
        const gitRepoObj = mockReleaseNotesJson.gitRepo;
        const parsedRepo = `${gitRepoObj.host}/${gitRepoObj.username}/${gitRepoObj.repo}`;

        expect(component.gitRepo).toEqual(parsedRepo);
      });

      it('should revert to the environment GitRepo object if it does not exist', () => {
        const NO_GIT_REPO_MOCK_JSON = { ...mockReleaseNotesJson };
        delete NO_GIT_REPO_MOCK_JSON.gitRepo;

        const gitRepoObj: any = environment.gitRepoDefaults;
        const noGitRepoParsedRepo = `${gitRepoObj.host}/${gitRepoObj.username}/${gitRepoObj.repo}`;
        const mockGitRepoObj = mockReleaseNotesJson.gitRepo;
        const mockParsedRepo = `${mockGitRepoObj.host}/${mockGitRepoObj.username}/${mockGitRepoObj.repo}`;

        TestBed.resetTestingModule();
        configureTestingModule({
          providers: [
            { provide: RELEASE_NOTES_JSON, useFactory: () => NO_GIT_REPO_MOCK_JSON },
            { provide: GIT_REPO, useFactory: () => gitRepoObj }
          ]
        }).compileComponents();

        const localFixture = TestBed.createComponent(ReleaseNotesComponent);
        const localComponent = localFixture.componentInstance;

        expect(localComponent.gitRepo).toEqual(noGitRepoParsedRepo, 'Expected Git repository to be from environment');
        expect(localComponent.gitRepo).not.toEqual(mockParsedRepo, 'Expected Git repository to not be from mock JSON');
      });
    });

    describe('#createGitRepoUrl', () => {
      it('should parse a GitRepo object', () => {
        const gitRepoObj: GitRepo = {
          host: 'https://github.com',
          username: 'EdricChan03',
          repo: 'rss-reader'
        };
        const expectedVal = 'https://github.com/EdricChan03/rss-reader';

        // tslint:disable-next-line: no-string-literal
        expect(component['createGitRepoUrl'](gitRepoObj)).toEqual(expectedVal);
      });

      it('should accept a string', () => {
        const gitRepoStr: GitRepo = 'https://github.com/EdricChan03/rss-reader';

        // tslint:disable-next-line: no-string-literal
        expect(component['createGitRepoUrl'](gitRepoStr)).toEqual(gitRepoStr);
      });
    });

    describe('#getReleaseNote', () => {
      it('should return the release notes from the specified version', () => {
        const firstVersion = '0.0.0';
        const firstReleaseNotes = mockReleaseNotesJson.releases[firstVersion].releaseNotes;

        expect(component.getReleaseNote(firstVersion)).toEqual(firstReleaseNotes);

        const secondVersion = '0.0.1';
        const secondReleaseNotes = mockReleaseNotesJson.releases[secondVersion].releaseNotes;

        expect(component.getReleaseNote(secondVersion)).toEqual(secondReleaseNotes);
      });
    });

    describe('#getReleaseDate', () => {
      it('should retrieve the release date from the specified version', () => {
        const firstVersion = '0.0.0';
        const firstReleaseDate = mockReleaseNotesJson.releases[firstVersion].releaseDate;

        expect(component.getReleaseDate(firstVersion)).toEqual(firstReleaseDate);

        const secondVersion = '0.0.1';

        expect(component.getReleaseDate(secondVersion)).toBeUndefined();
      });
    });

    describe('#getReleaseAuthor', () => {
      it('should retrieve the relase author from the specified version', () => {
        const firstVersion = '0.0.0';
        const firstReleaseDate = mockReleaseNotesJson.releases[firstVersion].releaseAuthor;

        expect(component.getReleaseAuthor(firstVersion)).toEqual(firstReleaseDate);

        const secondVersion = '0.0.1';

        expect(component.getReleaseAuthor(secondVersion)).toBeUndefined();
      });
    });

    describe('#getReleaseInfo', () => {
      it('should retrieve the release information from the specified version', () => {
        const firstVersion = '0.0.0';
        const firstReleaseInfo = mockReleaseNotesJson.releases[firstVersion];

        expect(component.getReleaseInfo(firstVersion)).toEqual(firstReleaseInfo);

        const secondVersion = '0.0.1';
        const secondReleaseInfo = mockReleaseNotesJson.releases[secondVersion];

        expect(component.getReleaseInfo(secondVersion)).toEqual(secondReleaseInfo);
      });
    });

    describe('#joinReleaseNotes', () => {
      it('should join an array of strings', () => {
        const arrayStrs = [
          'string1',
          'string2',
          'string3'
        ];
        const expectedVal = 'string1\nstring2\nstring3';

        expect(component.joinReleaseNotes(arrayStrs)).toEqual(expectedVal);
      });
    });

    describe('#isArray', () => {
      it('should return whether argument is an array', () => {
        const array = [];
        const notArray = '';

        expect(component.isArray(array)).toBe(true, 'Expected array argument to return true');
        expect(component.isArray(notArray)).toBe(false, 'Expected non-array argument to return false');
      });
    });

    describe('#isUrl', () => {
      it('should return whether argument is a valid URL', () => {
        const specs: { value: string, expected: any, failOutput?: string }[] = [
          {
            value: 'http://google.com',
            expected: true,
            failOutput: 'Expected HTTP protocol URL to return true'
          },
          {
            value: 'https://google.com',
            expected: true,
            failOutput: 'Expected HTTPS protocol URL to return true'
          },
          {
            value: 'foo://google.com',
            expected: false,
            failOutput: 'Expected other protocol URL to return false'
          },
          {
            value: 'https://google',
            expected: false,
            failOutput: 'Expected invalid domain URL to return false'
          }
        ];

        for (const spec of specs) {
          expect(component.isUrl(spec.value)).toBe(spec.expected, spec.failOutput);
        }
      });
    });

    describe('#isObj', () => {
      it('should return whether argument is an object', () => {
        const specs: { value: any, expected: any, failOutput?: string }[] = [
          {
            value: {
              first: 'hello'
            },
            expected: true,
            failOutput: 'Expected valid object to return true'
          },
          {
            value: 'Hello world!',
            expected: false,
            failOutput: 'Expected string to return false'
          },
          {
            value: true,
            expected: false,
            failOutput: 'Expected boolean to return false'
          },
          {
            value: 12,
            expected: false,
            failOutput: 'Expected number to return false'
          },
          {
            value: 62.3,
            expected: false,
            failOutput: 'Expected double to return false'
          },
          {
            value: undefined,
            expected: false,
            failOutput: 'Expected undefined to return false'
          }
        ];

        for (const spec of specs) {
          expect(component.isObj(spec.value)).toBe(spec.expected, spec.failOutput);
        }
      });
    });

    describe('#isStr', () => {
      it('should return whether argument is a string', () => {
        const specs: { value: any, expected: any, failOutput?: string }[] = [
          {
            value: '',
            expected: true,
            failOutput: 'Expected empty string to return true'
          },
          {
            value: 'Hello world!',
            expected: true,
            failOutput: 'Expected string to return true'
          },
          {
            value: true,
            expected: false,
            failOutput: 'Expected boolean to return false'
          },
          {
            value: 12,
            expected: false,
            failOutput: 'Expected number to return false'
          },
          {
            value: 62.3,
            expected: false,
            failOutput: 'Expected double to return false'
          },
          {
            value: undefined,
            expected: false,
            failOutput: 'Expected undefined to return false'
          },
          {
            value: null,
            expected: false,
            failOutput: 'Expected null to return false'
          }
        ];

        for (const spec of specs) {
          expect(component.isStr(spec.value)).toBe(spec.expected, spec.failOutput);
        }
      });
    });
  });

  describe('component template', () => {
    describe('app content', () => {
      it('should be enclosed in a div', () => {
        expect(componentEl.hasChildNodes()).toBe(true, 'Expected component to have child nodes');
        expect(componentEl.childElementCount).toBe(1, 'Expected component to only have 1 child element');
        expect(componentEl.children[0].tagName).toEqual('DIV', 'Expected component children to be a <div> element');
      });

      it('should have a page title heading', () => {
        const appHeaderEl: HTMLHeadingElement = componentEl.querySelector('#app-header');
        const expectedText = 'Release notes';

        expect(appHeaderEl.tagName).toEqual('H1', 'Expected app header tag to be <h1>');
        expect(appHeaderEl.textContent).toEqual(expectedText);
      });
    });

    describe('latest version section', () => {
      it('should have a current version header', () => {
        const currentVersionEl: HTMLHeadingElement = componentEl.querySelector('#current-version');
        const expectedText = `Current version: ${mockReleaseNotesJson.latestVersion}`;

        expect(currentVersionEl.tagName).toEqual('H2', 'Expected current version header tag to be <h2>');
        expect(currentVersionEl.textContent).toEqual(expectedText);
      });

      it('should have a header for release notes', () => {
        const currentVersionNotesEl: HTMLHeadingElement = componentEl.querySelector('#current-version-release-notes');
        const expectedText = `Release notes for ${mockReleaseNotesJson.latestVersion}`;

        expect(currentVersionNotesEl.tagName).toEqual('H3', 'Expected current version notes header tag to be <h3>');
        expect(currentVersionNotesEl.textContent).toEqual(expectedText);
      });
    });

    describe('all release notes section', () => {
      it('should have a header for all release notes', () => {
        if (Object.keys(mockReleaseNotesJson.releases).length > 0) {
          const allReleaseNotesEl: HTMLHeadingElement = componentEl.querySelector('#all-release-notes');

          expect(allReleaseNotesEl.tagName).toEqual('H2', 'Expected all release notes header tag to be <h2>');
        } else {
          // tslint:disable-next-line: no-console
          console.info('Skipping tests for "it should have a header for all release notes" as it is not applicable.');
        }
      });
    });
  });
});
