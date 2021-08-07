import { layout } from '../layout';

describe('layout', () => {
  it('returns layout styles', () => {
    const style = layout({
      width: [1, 1 / 2, 1 / 4],
      minHeight: 32,
      maxWidth: 768,
    });
    
    expect(style).toEqual({
      width: '100%',
      maxWidth: 768,
      minHeight: 32,
      '@media screen and (min-width: 600px)': {
        width: '50%',
      },
      '@media screen and (min-width: 960px)': {
        width: '25%',
      },
    });
  });

  it('returns 0 from theme.sizes', () => {
    const style = layout({
      theme: {
        sizes: [24, 48, 96],
      },
      width: 0,
      height: 0,
    });

    expect(style).toEqual({
      width: 24,
      height: 24,
    });
  });
});
