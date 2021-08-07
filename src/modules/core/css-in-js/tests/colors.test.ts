import { colors } from '../colors';

describe('colors', () => {
  it('returns colors styles', () => {
    const style = colors({
      color: 'gold',
      backgroundColor: 'tomato',
    });

    expect(style).toEqual({
      color: 'gold',
      backgroundColor: 'tomato',
    });
  });
});
