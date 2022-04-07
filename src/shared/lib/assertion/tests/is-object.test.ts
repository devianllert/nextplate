import { isObject, isEmptyObject } from '../is-object';

describe('lib/assertion', () => {
  describe('isObject', () => {
    it('should pass if argument is an object', () => {
      const result = isObject({});

      expect(result).toBe(true);
    });

    it('should not pass if argument is an array', () => {
      const result = isObject([]);

      expect(result).toBe(false);
    });

    it('should not pass if argument is not an object', () => {
      const result = isObject('string');

      expect(result).toBe(false);
    });

    it('should pass if argument is a function', () => {
      const func = () => {};
      func.prop = 0;

      const result = isObject(func);

      expect(result).toBe(true);
    });

    it('should not pass if argument is null or undefined', () => {
      const func = () => {};
      func.prop = 0;

      const result1 = isObject(null);
      const result2 = isObject(undefined);

      expect(result1).toBe(false);
      expect(result2).toBe(false);
    });
  });

  describe('isEmptyObject', () => {
    it('should pass if argument is an empty object', () => {
      const result = isEmptyObject({});

      expect(result).toBe(true);
    });

    it('should not pass if argument is an array', () => {
      const result = isEmptyObject({ foo: 'bar' });

      expect(result).toBe(false);
    });
  });
});
