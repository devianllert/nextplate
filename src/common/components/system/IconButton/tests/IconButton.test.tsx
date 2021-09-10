/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/modules/core/testing/renderWithProviders';

import { IconButton } from '../IconButton';

describe('<IconButton />', () => {
  const children: ReactChild = 'IconButton';

  it('should render a children', () => {
    renderWithProviders(<IconButton label={children}><svg /></IconButton>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
