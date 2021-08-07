import { margin, padding } from '../space';

describe('space', () => {
  it('returns style objects', () => {
    const styles = margin({
      m: '4px',
    });

    expect(styles).toEqual({ margin: '4px' });
  });

  it('returns 0 values', () => {
    const styles = margin({ m: 0 });

    expect(styles).toEqual({ margin: 0 });
  });

  it('returns negative pixel values', () => {
    const styles = margin({ m: -2 });

    expect(styles).toEqual({ margin: -8 });
  });

  it('returns negative em values', () => {
    const styles = margin({ m: '-16em' });

    expect(styles).toEqual({ margin: '-16em' });
  });

  it('returns negative theme values', () => {
    const styles = margin({
      theme: {
        space: [0, 4, 8],
      },
      m: -2,
    });

    expect(styles).toEqual({ margin: -8 });
  });

  it('returns positive theme values', () => {
    const styles = margin({
      theme: {
        space: [0, '1em', '2em'],
      },
      m: 2,
    });

    expect(styles).toEqual({ margin: '2em' });
  });

  it('returns responsive values', () => {
    const styles = margin({
      m: [0, 2, 3],
    });

    expect(styles).toEqual({
      margin: 0,
      '@media screen and (min-width: 600px)': { margin: 8 },
      '@media screen and (min-width: 960px)': { margin: 16 },
    });
  });

  it('returns aliased values', () => {
    const styles = padding({
      px: 2,
    });
    expect(styles).toEqual({ paddingLeft: 8, paddingRight: 8 });
  });

  it('returns string values from theme', () => {
    const styles = padding({
      theme: {
        space: [0, '1em'],
      },
      padding: 1,
    });

    expect(styles).toEqual({ padding: '1em' });
  });

  it('returns negative string values from theme', () => {
    const styles = margin({
      theme: {
        space: [0, '1em'],
      },
      margin: -1,
    });

    expect(styles).toEqual({ margin: '-1em' });
  });

  it('returns values from theme object', () => {
    const styles = margin({
      theme: {
        space: { sm: 1 },
      },
      margin: 'sm',
    });

    expect(styles).toEqual({ margin: 1 });
  });

  it('pl prop sets paddingLeft', () => {
    const styles = padding({ pl: 2 });

    expect(styles).toEqual({ paddingLeft: 8 });
  });

  it('pl prop sets paddingLeft 0', () => {
    const styles = padding({ pl: 0 });

    expect(styles).toEqual({ paddingLeft: 0 });
  });

  it('px prop overrides pl prop', () => {
    const styles = padding({
      pl: 1,
      px: 2,
    });

    expect(styles).toEqual({ paddingLeft: 8, paddingRight: 8 });
  });

  it('py prop overrides pb prop', () => {
    const styles = padding({
      pb: 1,
      py: 2,
    });

    expect(styles).toEqual({ paddingTop: 8, paddingBottom: 8 });
  });

  it('mx prop overrides mr prop', () => {
    const styles = margin({
      mr: 1,
      mx: 2,
    });

    expect(styles).toEqual({ marginLeft: 8, marginRight: 8 });
  });

  it('my prop overrides mt prop', () => {
    const styles = margin({
      mt: 1,
      my: 2,
    });

    expect(styles).toEqual({ marginTop: 8, marginBottom: 8 });
  });

  it('margin overrides m prop', () => {
    const styles = margin({
      m: 1,
      margin: 2,
    });

    expect(styles).toEqual({ margin: 8 });
  });

  it('handles margin with no theme', () => {
    const styles = margin({
      mt: 16,
    });
    expect(styles).toEqual({
      marginTop: 16,
    });
  });

  it('handles overriding margin/padding shortcut props', () => {
    const marginStyles = margin({
      m: 4,
      mx: 3,
      mr: 2,
    });

    const paddingStyles = padding({
      p: 4,
      py: 3,
      pt: 2,
    });

    expect(marginStyles).toEqual({
      margin: 24,
      marginLeft: 16,
      marginRight: 8,
    });

    expect(paddingStyles).toEqual({
      padding: 24,
      paddingBottom: 16,
      paddingTop: 8,
    });
  });

  it('single directions override axes', () => {
    const marginStyles = margin({
      mx: 3,
      ml: 1,
      mr: 2,
    });

    const paddingStyles = padding({
      px: 3,
      pl: 1,
      pr: 2,
    });

    expect(marginStyles).toEqual({
      marginLeft: 4,
      marginRight: 8,
    });

    expect(paddingStyles).toEqual({
      paddingLeft: 4,
      paddingRight: 8,
    });
  });
});
