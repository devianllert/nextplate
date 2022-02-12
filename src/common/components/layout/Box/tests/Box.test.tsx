/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Box } from '../Box';

describe('<Box />', () => {
  const children = 'Box';

  it('should render a children', () => {
    render(<Box>{children}</Box>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
