/* tslint:disable:no-unused-variable */

import { StripHtmlTagsPipe } from './strip-html-tags.pipe';

// Adapted from
// https://github.com/zspecza/common-tags/blob/master/src/oneLine/oneLine.js
function removeWhitespace(str: string) {
  return str.replace(/^\s+|\s+$/gm, '').split('\n').join('');
}

describe('StripHtmlTagsPipe', () => {
  it('should create an instance', () => {
    const pipe = new StripHtmlTagsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should strip all tags', () => {
    const html = removeWhitespace(`<p>Hello, paragraph tag!</p>
    <em>Emphasised text</em>`);
    const expectedHtml = 'Hello, paragraph tag!Emphasised text';

    const pipe = new StripHtmlTagsPipe();
    const value = pipe.transform(html);

    expect(value).toEqual(expectedHtml, 'Expected all HTML tags to be stripped');
  });

  it('should strip comments', () => {
    const html = removeWhitespace(`<!-- HTML comment -->
    <p>Hello, HTML!</p>
    <!--
    This is a comment
    that spans multiple lines
    -->`);
    const expectedHtml = 'Hello, HTML!';

    const pipe = new StripHtmlTagsPipe();
    const value = pipe.transform(html);

    expect(value).toEqual(expectedHtml, 'Expected HTML comments to be stripped');
  });

  it('should strip <script> tags', () => {
    const html = removeWhitespace(`<script>console.log('Hello XSS!');</script>
    <p>Hello, HTML content!</p>`);
    const expectedHtml = 'Hello, HTML content!';

    const pipe = new StripHtmlTagsPipe();
    const value = pipe.transform(html);

    expect(value).toEqual(expectedHtml, 'Expected HTML <script> tags to be stripped');
  });

  it('should strip <style> tags', () => {
    const html = removeWhitespace(`<style>p{color:red;font-family:Arial;}</style>
    <p>Hello, HTML content!</p>`);
    const expectedHtml = 'Hello, HTML content!';

    const pipe = new StripHtmlTagsPipe();
    const value = pipe.transform(html);

    expect(value).toEqual(expectedHtml, 'Expected HTML <style> tags to be stripped');
  });
});
