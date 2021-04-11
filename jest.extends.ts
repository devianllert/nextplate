/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// XXX All expect.extend() utilities loaded here will be available for all tests, they also might need to be declared in jest.d.ts
import { toMatchOneOf, toMatchShapeOf } from 'jest-to-match-shape-of'; // See https://www.npmjs.com/package/jest-to-match-shape-of
// Import utilities that extend Jest "expect" function by themselves
import '@/modules/core/testing/toContainObject';
// Extends native "expect" abilities to test styled components - See https://github.com/styled-components/jest-styled-components
import 'jest-styled-components';
import '@testing-library/jest-dom';

// Extend Jest "expect" function
expect.extend({
  toMatchOneOf,
  toMatchShapeOf,
});
