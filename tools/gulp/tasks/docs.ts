import { dest, task, parallel, src } from 'gulp';
import * as path from 'path';

import markdown from 'gulp-markdown';
import transform from 'gulp-transform';
import hljs from 'highlight.js';
import rename from 'gulp-rename';

const markdownOptions = {
  // Add syntax highlight using highlight.js
  highlight: (code: string, language: string): string => {
    if (language) {
      // highlight.js expects "typescript" written out, while Github supports "ts".
      const lang = language.toLowerCase() === 'ts' ? 'typescript' : language;
      return hljs.highlight(lang, code).value;
    }

    return code;
  }
};
const LINK_PATTERN = /(<a[^>]*) href="([^"]*)"/g;
const IMG_PATTERN = /(<img[^>]*) src="([^"]*)"/g;
const PRE_PATTERN = /(<pre[^>]*)/g;
const START_COMMENT_PATTERN = /(<!-- start-enclose-content -->)/g;
const END_COMMENT_PATTERN = /(<!-- end-enclose-content -->)/g;

const docsAssetsPath = 'projects/rss-reader/src/assets/docs';

task('docs-guides', () => {
  return src('docs/guides/**/!(README.md)')
    .pipe(markdown(markdownOptions))
    .pipe(transform('utf8', transformMarkdownFiles))
    // tslint:disable-next-line:no-shadowed-variable
    .pipe(rename((path: rename.ParsedPath) => {
      path.extname = '.html';
    }))
    .pipe(dest(`${docsAssetsPath}/guides`));
});
task('docs-dev', () => {
  return src('docs/dev/**/!(README.md)')
    .pipe(markdown(markdownOptions))
    .pipe(transform('utf8', transformMarkdownFiles))
    // tslint:disable-next-line:no-shadowed-variable
    .pipe(rename((path: rename.ParsedPath) => {
      path.extname = '.html';
    }))
    .pipe(dest(`${docsAssetsPath}/dev`));
});
task('docs-img', () => {
  return src('docs/img/**')
    .pipe(dest(`${docsAssetsPath}/img`));
});

task('docs', parallel(['docs-guides', 'docs-dev', 'docs-img']));

// TODO(EdricChan03): Understand how this code actually works.
function transformMarkdownFiles(content: string, file: any): Buffer | string {

  // Markdown files can contain links to other markdown files.
  // Most of those links don't work in the Material docs, because the paths are invalid in the
  // documentation page. Using a RegExp to rewrite links in HTML files to work in the docs.
  // Replace the URL in anchor elements inside of compiled markdown files.
  content = content.replace(LINK_PATTERN, (_match: string, head: string, link: string) =>
    // The head is the first match of the RegExp and is necessary to ensure that the RegExp matches
    // an anchor element. The head will be then used to re-create the existing anchor element.
    // If the head is not prepended to the replaced value, then the first match will be lost.
    `${head} href="${fixMarkdownDocLinks(link, file.path)}" class="anchor-link"`
  );
  content = content.replace(IMG_PATTERN, (_match: string, head: string, link: string) =>
    // The head is the first match of the RegExp and is necessary to ensure that the RegExp matches
    // an anchor element. The head will be then used to re-create the existing anchor element.
    // If the head is not prepended to the replaced value, then the first match will be lost.
    `${head} src="${fixMarkdownDocImgs(link)}"`
  );
  content = content.replace(PRE_PATTERN, (_match: string, head: string) =>
    `${head} class="hljs"`
  );
  content = content.replace(START_COMMENT_PATTERN, '<div expansion-panel>');
  content = content.replace(END_COMMENT_PATTERN, '</div>');
  return content;
}

function fixMarkdownDocLinks(link: string, filePath: string): string {
  // As for now, only markdown links that are relative and inside of the guides/ directory
  // will be rewritten.
  if (!filePath.includes(path.normalize('guides/')) || link.startsWith('http')) {
    return link;
  }

  const baseName = path.basename(link, path.extname(link));

  // Temporary link the file to the /guide URL because that's the route where the
  // guides can be loaded in the Material docs.
  return `doc/guides/${baseName}`;
}
function fixMarkdownDocImgs(link: string): string {
  link = link.replace('..', 'assets/docs');
  return link;
}
process.on('unhandledRejection', up => { throw up; });
