import { isFunction } from '../is-function';

describe('lib/assertion', () => {
  it('should pass if argument is a function', () => {
    const result = isFunction(() => {});

    expect(result).toBe(true);
  });

  it('should not pass if argument is not a function', () => {
    const result = isFunction({});

    expect(result).toBe(false);
  });
})
