/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/modules/core/testing/renderWithProviders';

import { Checkbox } from '../Checkbox';

describe('<Checkbox />', () => {
  const label = 'Checkbox';

  it('should render a label', () => {
    renderWithProviders(<Checkbox label={label} />);

    expect(screen.getByText(label)).toBeDefined();
  });
});
