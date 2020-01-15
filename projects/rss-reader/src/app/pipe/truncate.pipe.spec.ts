import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;
  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('with no additional arguments', () => {
    it('should strip words more than 20 characters', () => {
      const twentyChars = 'abcdefghijklmnopqrst';
      expect(pipe.transform(twentyChars)).toEqual(twentyChars, 'Expected string to not be stripped');

      const longStr = 'Hello world this is quite a long string.';
      const longStrStripped = 'Hello world this is &hellip;';
      expect(pipe.transform(longStr)).toEqual(longStrStripped, 'Expected long string to be stripped');
    });
  });

  describe('with limit argument', () => {
    it('should strip words more than the specified limit length', () => {
      const limit = 15;

      const fifteenChars = 'abcdefghijklmno';
      expect(pipe.transform(fifteenChars, limit)).toEqual(fifteenChars, 'Expected string of 15 characters to not be stripped');

      const longStr = 'Hello world this is another long string.';
      const longStrStripped = 'Hello world thi&hellip;';
      expect(pipe.transform(longStr, limit)).toEqual(longStrStripped, 'Expected long string to be stripped');
    });

    it('should allow a string number to be specified', () => {
      const limit = '15';

      const fifteenChars = 'abcdefghijklmno';
      expect(pipe.transform(fifteenChars, limit)).toEqual(fifteenChars, 'Expected string of 15 characters to not be stripped');

      const longStr = 'Hello world this is another long string.';
      const longStrStripped = 'Hello world thi&hellip;';
      expect(pipe.transform(longStr, limit)).toEqual(longStrStripped, 'Expected long string to be stripped');
    });
  });

  describe('with limit and trail arguments', () => {
    it('should strip words with the specified arguments', () => {
      const limit = 15;
      const trail = '...';

      const fifteenChars = 'abcdefghijklmno';
      expect(pipe.transform(fifteenChars, limit, trail)).toEqual(fifteenChars, 'Expected string of 15 characters to not be stripped');

      const longStr = 'Hello world this is another long string.';
      const longStrStripped = `Hello world thi${trail}`;
      expect(pipe.transform(longStr, limit, trail)).toEqual(longStrStripped, 'Expected long string to be stripped with specified trail');
    });
  });
});
