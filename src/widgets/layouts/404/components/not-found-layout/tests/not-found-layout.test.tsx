/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/shared/lib/testing/render-with-providers';

import { NotFoundLayout } from '../not-found-layout';

describe('<NotFoundLayout />', () => {
  const children: ReactChild = 'NotFound404Layout';

  it('should render a children', () => {
    renderWithProviders(<NotFoundLayout>{children}</NotFoundLayout>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
