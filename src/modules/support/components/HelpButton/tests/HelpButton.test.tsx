/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/lib/testing/renderWithProviders';

import { HelpButton } from '../HelpButton';

describe('<HelpButton />', () => {
  const children = 'HelpButton';

  it('should render a children', () => {
    renderWithProviders(<HelpButton />);

    expect(screen.getByText('?')).toBeDefined();
  });
});
