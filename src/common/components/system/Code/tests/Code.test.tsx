/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/modules/core/testing/renderWithProviders';

import { Code } from '../Code';

describe('<Code />', () => {
  const children = 'Code';

  it('should render a children', () => {
    renderWithProviders(<Code>{children}</Code>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
