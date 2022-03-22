import { compareCombine, compareField, compareNumber, compareReverse } from '../sort';

describe('sort', () => {
  it('sort array of numbers', () => {
    const arr = [1, 3, 0, 4];

    const sortedArr = arr.sort(compareNumber);

    expect(sortedArr).toEqual([0, 1, 3, 4]);
  });

  it('sort array of numbers in reverse', () => {
    const arr = [1, 3, 0, 4];

    const sortedArr = arr.sort(compareReverse(compareNumber));

    expect(sortedArr).toEqual([4, 3, 1, 0]);
  });

  it('sort array of objects by field', () => {
    const arr = [
      {
        id: 2,
        info: {
          rank: 9,
        },
      },
      {
        id: 0,
        info: {
          rank: 5,
        },
      },
      {
        id: 1,
        info: {
          rank: 3,
        },
      },
    ];

    const sortedArr = arr.sort(compareField('id', compareNumber));

    expect(sortedArr).toEqual([
      {
        id: 0,
        info: {
          rank: 5,
        },
      },
      {
        id: 1,
        info: {
          rank: 3,
        },
      },
      {
        id: 2,
        info: {
          rank: 9,
        },
      },
    ]);
  });

  it('sort array of objects by deep field', () => {
    const arr = [
      {
        id: 2,
        info: {
          rank: 9,
        },
      },
      {
        id: 0,
        info: {
          rank: 5,
        },
      },
      {
        id: 1,
        info: {
          rank: 3,
        },
      },
    ];

    const sortedArr = arr.sort(compareField('info', compareField('rank', compareNumber)));

    expect(sortedArr).toEqual([
      {
        id: 1,
        info: {
          rank: 3,
        },
      },
      {
        id: 0,
        info: {
          rank: 5,
        },
      },
      {
        id: 2,
        info: {
          rank: 9,
        },
      },
    ]);
  });
});
