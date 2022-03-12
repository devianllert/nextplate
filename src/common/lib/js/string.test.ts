import { replaceAllOccurrences } from './string';

/**
 * @group unit
 * @group utils
 */
describe(`utils/js/string.ts`, () => {
  describe(`replaceAllOccurrences`, () => {
    describe(`should replace all occurrences`, () => {
      it(`when replacing one variable`, async () => {
        expect(replaceAllOccurrences('Hello {name}', { name: 'Unly' })).toBe('Hello Unly');
      });

      it(`when replacing many variables`, async () => {
        expect(replaceAllOccurrences('Hello {name}, {intro}', { name: 'Unly', intro: 'How are you?' })).toBe('Hello Unly, How are you?');
      });
    });

    describe(`should not crash when provided unexpected input`, () => {
      it(`when the "variables" are of unexpected types`, async () => {
        // @ts-expect-error
        expect(replaceAllOccurrences('example', 1)).toBe('example');
        // @ts-expect-error
        expect(replaceAllOccurrences('example', 'test')).toBe('example');
        // @ts-ignore-error
        expect(replaceAllOccurrences('example', ['test'])).toBe('example');
      });
    });
  });
});
