import { isNumber } from '../is-number';

describe('lib/assertion', () => {
  it('should pass if argument is number', () => {
    const result = isNumber(105);

    expect(result).toBe(true);
  });

  it('should not pass if argument is NaN', () => {
    const result = isNumber(NaN);

    expect(result).toBe(false);
  });

  it('should not pass if argument is not a number', () => {
    const result = isNumber('string');

    expect(result).toBe(false);
  });
})
