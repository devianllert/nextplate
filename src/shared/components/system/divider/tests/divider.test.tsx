/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/lib/testing/render-with-providers';

import { Divider } from '../divider';

describe('<Divider />', () => {
  it('should render a children', () => {
    renderWithProviders(<Divider />);

    expect(screen.getByRole('separator')).toBeDefined();
  });
});
