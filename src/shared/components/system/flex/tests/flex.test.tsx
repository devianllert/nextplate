/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Flex } from '../flex';

describe('<Flex />', () => {
  const children = 'Flex';

  it('should render a children', () => {
    render(<Flex>{children}</Flex>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
