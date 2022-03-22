import { flattenObject } from '../flattenObject';

describe('flattenObject', () => {
  it('should flatten a deep object', () => {
    const a = flattenObject({
      colors: {
        red: {
          red100: 1,
          red200: 1,
          red300: 1,
        },
        green: {
          green100: 1,
          green200: 1,
          green300: 1,
        }
      },
      foo: 0,
    });

    expect(a).toStrictEqual({
      'colors.red.red100': 1,
      'colors.red.red200': 1,
      'colors.red.red300': 1,
      'colors.green.green100': 1,
      'colors.green.green200': 1,
      'colors.green.green300': 1,
      foo: 0,
    });
  });

  it('should flatten objects with arrays', () => {
    const a = flattenObject({
      colors: {
        red: [
          1,
          1,
          1
        ],
        green: [
          1,
          1,
          1
        ]
      },
      foo: 0,
    });

    expect(a).toStrictEqual({
      'colors.red.0': 1,
      'colors.red.1': 1,
      'colors.red.2': 1,
      'colors.green.0': 1,
      'colors.green.1': 1,
      'colors.green.2': 1,
      foo: 0,
    });
  });
});
