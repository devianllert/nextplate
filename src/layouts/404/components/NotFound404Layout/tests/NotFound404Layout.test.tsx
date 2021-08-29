/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NotFound404Layout } from '../NotFound404Layout';

describe('<NotFound404Layout />', () => {
  const children: ReactChild = 'NotFound404Layout';

  it('should render a children', () => {
    render(<NotFound404Layout>{children}</NotFound404Layout>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
