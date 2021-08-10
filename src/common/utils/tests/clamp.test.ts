import { clamp } from '../clamp';

describe('clamp', () => {
  it('clamps given value by upper boundary', () => {
    const value = clamp(15, 0, 10);

    expect(value).toBe(10);
  });

  it('clamps given value by lower boundary', () => {
    const value = clamp(-15, -10, 10);

    expect(value).toBe(-10);
  });
});
