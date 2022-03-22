/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Breadcrumbs } from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
  const children: ReactChild = 'Breadcrumbs';

  it('should render a children', () => {
    render(<Breadcrumbs>{children}</Breadcrumbs>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
