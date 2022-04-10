import { isEmpty } from '../is-empty';

describe('lib/assertion', () => {
  it('should pass if argument is an empty string', () => {
    const result = isEmpty('');

    expect(result).toBe(true);
  });

  it('should not pass if argument is not an empty string', () => {
    const result = isEmpty('123');

    expect(result).toBe(false);
  });

  it('should pass if argument is an empty array', () => {
    const result = isEmpty([]);

    expect(result).toBe(true);
  });

  it('should not pass if argument is not an empty array', () => {
    const result = isEmpty([1, 2, 3]);

    expect(result).toBe(false);
  });

  it('should pass if argument is an empty object', () => {
    const result = isEmpty({});

    expect(result).toBe(true);
  });

  it('should not pass if argument is not an empty object', () => {
    const result = isEmpty({ foo: 'bar' });

    expect(result).toBe(false);
  });

  it('should pass if argument is null or undefined', () => {
    const result1 = isEmpty(null);
    const result2 = isEmpty(undefined);

    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });
})
