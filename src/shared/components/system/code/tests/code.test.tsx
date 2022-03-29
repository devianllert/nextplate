/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/shared/lib/testing/render-with-providers';

import { Code } from '../code';

describe('<Code />', () => {
  const children = 'Code';

  it('should render a children', () => {
    renderWithProviders(<Code>{children}</Code>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
