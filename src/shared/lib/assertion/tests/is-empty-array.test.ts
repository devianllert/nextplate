import { isEmptyArray } from '../is-empty-array';

describe('lib/assertion', () => {
  it('should pass if argument is an empty array', () => {
    const result = isEmptyArray([]);

    expect(result).toBe(true);
  });

  it('should not pass if argument is not an empty array', () => {
    const result = isEmptyArray([1, 2, 3]);

    expect(result).toBe(false);
  });

  it('should not pass if argument is not an array', () => {
    const result = isEmptyArray({});

    expect(result).toBe(false);
  });
})
