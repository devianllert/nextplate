import { get } from '../get';

describe('get', () => {
  it('returns a deeply nested value', () => {
    const a = get(
      {
        colors: {
          blue: ['#0cf', '#0be', '#09d', '#07c'],
        },
      },
      'colors.blue.3',
    );

    expect(a).toBe('#07c');
  });

  it('returns 0 index items', () => {
    const a = get(['a', 'b', 'c'], 0);

    expect(a).toBe('a');
  });
});
