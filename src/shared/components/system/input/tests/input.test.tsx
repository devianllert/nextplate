/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/shared/lib/testing/render-with-providers';

import { Input } from '../input';

describe('<Input />', () => {
  const children = 'Input';

  it('should render a children', () => {
    renderWithProviders(<Input label={children} />);

    expect(screen.getByText(children)).toBeDefined();
  });
});
