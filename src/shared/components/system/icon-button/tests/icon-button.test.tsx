/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/shared/lib/testing/renderWithProviders';

import { IconButton } from '../icon-button';

describe('<IconButton />', () => {
  const children: ReactChild = 'IconButton';

  it('should render a children', () => {
    renderWithProviders(<IconButton label={children}><svg /></IconButton>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
