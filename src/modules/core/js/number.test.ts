import { clamp } from './number';

/**
 * @group unit
 * @group utils
 */
describe(`utils/js/number.ts`, () => {
  describe(`clamp`, () => {
    it(`when the current item is the first one`, async () => {
      expect(clamp(7, 0, 10)).toBe(7);
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(-10, 0, 10)).toBe(0);
    });
  });
});
