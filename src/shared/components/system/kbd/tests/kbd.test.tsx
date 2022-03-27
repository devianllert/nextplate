/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/shared/lib/testing/renderWithProviders';

import { Kbd } from '../kbd';

describe('<Kbd />', () => {
  const children = 'Kbd';

  it('should render a children', () => {
    renderWithProviders(<Kbd>{children}</Kbd>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
