/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IconButton from '../IconButton';

describe('<IconButton />', () => {
  const children: ReactChild = 'IconButton';

  it('should render a children', () => {
    render(<IconButton>{children}</IconButton>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
