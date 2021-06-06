/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/modules/tests/renderWithProviders';

import { MainLayout } from '../MainLayout';

describe('<MainLayout />', () => {
  const children: ReactChild = 'MainLayout';

  it('should render a children', () => {
    renderWithProviders(<MainLayout>{children}</MainLayout>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
