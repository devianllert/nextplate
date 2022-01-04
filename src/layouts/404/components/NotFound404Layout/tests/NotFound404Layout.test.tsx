/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { screen } from '@testing-library/react';

import { NotFound404Layout } from '../NotFound404Layout';

import { renderWithProviders } from '@/modules/core/testing/renderWithProviders';

describe('<NotFound404Layout />', () => {
  const children: ReactChild = 'NotFound404Layout';

  it('should render a children', () => {
    renderWithProviders(<NotFound404Layout>{children}</NotFound404Layout>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
