import { groupBy } from '../groupBy';

describe('groupBy', () => {
  it('groups by given value', () => {
    const users = [
      {
        name: 'Matt',
        salary: 3000,
      },
      {
        name: 'John',
        salary: 3000,
      },
      {
        name: 'Dan',
        salary: 7000,
      },
      {
        name: 'Joe',
        salary: 7000,
      },
    ];

    const groupedBySalary = groupBy(users, 'salary');

    expect(groupedBySalary).toEqual({
      3000: [
        {
          name: 'Matt',
          salary: 3000,
        },
        {
          name: 'John',
          salary: 3000,
        },
      ],
      7000: [
        {
          name: 'Dan',
          salary: 7000,
        },
        {
          name: 'Joe',
          salary: 7000,
        },
      ],
    });
  });
});
