import { createSystem } from '../system';

describe('system', () => {
  it('', () => {
    const parser = createSystem({
      color: true,
      backgroundColor: {
        properties: ['backgroundColor'],
        scale: 'colors',
      },
      mx: {
        scale: 'space',
        properties: ['marginLeft', 'marginRight'],
      },
    });

    expect(typeof parser).toBe('function');

    const styles = parser({
      theme: {
        space: [0, 4, 8, 16, 32],
        colors: {
          primary: 'rebeccapurple',
        },
      },
      color: 'tomato',
      backgroundColor: 'primary',
      mx: [2, 3, 4],
    });

    expect(styles).toEqual({
      color: 'tomato',
      backgroundColor: 'rebeccapurple',
      marginLeft: 8,
      marginRight: 8,
      '@media screen and (min-width: 600px)': {
        marginLeft: 16,
        marginRight: 16,
      },
      '@media screen and (min-width: 960px)': {
        marginLeft: 32,
        marginRight: 32,
      },
    });
  });

  it('merges multiple responsive styles', () => {
    const parser = createSystem({
      margin: true,
      padding: true,
      width: true,
    });

    const styles = parser({
      margin: [0, 4, 8],
      padding: [16, 32, 64],
      width: ['100%', '50%'],
    });

    expect(styles).toEqual({
      margin: 0,
      padding: 16,
      width: '100%',
      '@media screen and (min-width: 600px)': {
        margin: 4,
        padding: 32,
        width: '50%',
      },
      '@media screen and (min-width: 960px)': {
        margin: 8,
        padding: 64,
      },
    });
  });

  it('merges multiple responsive object styles', () => {
    const parser = createSystem({
      margin: true,
      padding: true,
      width: true,
    });

    const styles = parser({
      margin: { _: 0, mobile: 4, tablet: 8 },
      padding: { _: 16, mobile: 32, tablet: 64 },
      width: { _: '100%', mobile: '50%' },
    });

    expect(styles).toEqual({
      margin: 0,
      padding: 16,
      width: '100%',
      '@media screen and (min-width: 600px)': {
        margin: 4,
        padding: 32,
        width: '50%',
      },
      '@media screen and (min-width: 960px)': {
        margin: 8,
        padding: 64,
      },
    });
  });

  it('gets values from theme', () => {
    const parser = createSystem({
      mx: {
        properties: ['marginLeft', 'marginRight'],
        scale: 'space',
      },
      color: {
        properties: ['color'],
        scale: 'colors',
      },
    });

    const style = parser({
      theme: {
        colors: {
          primary: 'tomato',
        },
        space: [0, 6, 12, 24, 48, 96],
      },
      mx: [0, 1, 2, 3],
      color: ['primary', 'black'],
    });

    expect(style).toEqual({
      color: 'tomato',
      marginLeft: 0,
      marginRight: 0,
      '@media screen and (min-width: 600px)': {
        color: 'black',
        marginLeft: 6,
        marginRight: 6,
      },
      '@media screen and (min-width: 960px)': {
        marginLeft: 12,
        marginRight: 12,
      },
      '@media screen and (min-width: 1440px)': {
        marginLeft: 24,
        marginRight: 24,
      },
    });
  });

  it('gets 0 index values from theme', () => {
    const parser = createSystem({
      width: {
        properties: ['width'],
        scale: 'sizes',
      },
    });

    const style = parser({
      theme: {
        sizes: [24, 48],
      },
      width: 0,
    });

    expect(style).toEqual({ width: 24 });
  });

  it('ignores null values', () => {
    const parser = createSystem({
      color: true,
    });

    const style = parser({ color: null });
    expect(style).toEqual({});
  });

  it('skips null values in arrays', () => {
    const parser = createSystem({
      fontSize: true,
    });

    const style = parser({
      fontSize: [16, null, null, 18],
    });

    expect(style).toEqual({
      fontSize: 16,
      '@media screen and (min-width: 600px)': {},
      '@media screen and (min-width: 960px)': {},
      '@media screen and (min-width: 1440px)': {
        fontSize: 18,
      },
    });
  });
});
