/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/shared/lib/testing/render-with-providers';

import { Checkbox } from '../checkbox';

describe('<Checkbox />', () => {
  const label = 'Checkbox';

  it('should render a label', () => {
    renderWithProviders(<Checkbox label={label} />);

    expect(screen.getByText(label)).toBeDefined();
  });
});
