import { shouldForwardProp, propsNames } from '../shouldForwardProp';

describe('shouldForwardProp', () => {
  test('returns true for valid HTML attributes', () => {
    const should = shouldForwardProp('href')
    expect(should).toBe(true)
  })

  propsNames.forEach((prop) => {
    test(`returns false for ${prop} prop`, () => {
      const should = shouldForwardProp(prop)
      expect(should).toBe(false)
    })
  })
});
