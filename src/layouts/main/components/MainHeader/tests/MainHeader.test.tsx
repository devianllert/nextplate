/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/modules/tests/renderWithProviders';

import { MainHeader } from '../MainHeader';

describe('<MainHeader />', () => {
  const children: ReactChild = 'MainHeader';

  it('should render a children', () => {
    renderWithProviders(<MainHeader />);

    expect(screen.getByText(children)).toBeDefined();
  });
});
