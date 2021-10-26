/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// XXX All expect.extend() utilities loaded here will be available for all tests, they also might need to be declared in jest.d.ts
import { toMatchOneOf, toMatchShapeOf } from 'jest-to-match-shape-of'; // See https://www.npmjs.com/package/jest-to-match-shape-of
import { matchers } from '@emotion/jest';
import '@testing-library/jest-dom/extend-expect';

// Extend Jest "expect" function
expect.extend({
  toMatchOneOf,
  toMatchShapeOf,
  ...matchers,
});
