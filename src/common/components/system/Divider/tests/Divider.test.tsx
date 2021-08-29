/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/modules/core/testing/renderWithProviders';

import { Divider } from '../Divider';

describe('<Divider />', () => {
  it('should render a children', () => {
    renderWithProviders(<Divider />);

    expect(screen.getByRole('separator')).toBeDefined();
  });
});
