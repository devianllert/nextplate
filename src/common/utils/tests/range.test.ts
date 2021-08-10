import { range } from '../range';

describe('range', () => {
  it('generate an array of numbers when given 1 argument', () => {
    const array = range(10);

    expect(array).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('generate an array of numbers when given 2 argument', () => {
    const array = range(0, 10);

    expect(array).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('generate an array of numbers when given all arguments', () => {
    const array = range(0, 10, 1);

    expect(array).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
