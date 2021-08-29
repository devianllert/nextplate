import { color } from '../colors';

describe('colors', () => {
  it('returns colors styles', () => {
    const style = color({
      color: 'gold',
      backgroundColor: 'tomato',
    });

    expect(style).toEqual({
      color: 'gold',
      backgroundColor: 'tomato',
    });
  });
});
