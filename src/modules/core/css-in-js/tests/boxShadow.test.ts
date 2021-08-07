import { boxShadow } from '../boxShadow';

describe('boxShadow', () => {
  it('returns shadow styles', () => {
    const style = boxShadow({
      textShadow: '0 -1px rgba(255, 255, 255, .25)',
      boxShadow: 0,
    });

    expect(style).toEqual({
      textShadow: '0 -1px rgba(255, 255, 255, .25)',
      boxShadow: 'none',
    });
  });
});
