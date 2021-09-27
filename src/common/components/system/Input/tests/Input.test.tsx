/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/modules/core/testing/renderWithProviders';

import { Input } from '../Input';

describe('<Input />', () => {
  const children = 'Input';

  it('should render a children', () => {
    renderWithProviders(<Input label={children} />);

    expect(screen.getByText(children)).toBeDefined();
  });
});
