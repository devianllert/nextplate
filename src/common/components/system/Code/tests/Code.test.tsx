/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Code } from '../Code';

describe('<Code />', () => {
  const children = 'Code';

  it('should render a children', () => {
    render(<Code>{children}</Code>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
