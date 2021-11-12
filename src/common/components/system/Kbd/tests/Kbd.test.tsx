/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Kbd } from '../Kbd';

describe('<Kbd />', () => {
  const children = 'Kbd';

  it('should render a children', () => {
    render(<Kbd>{children}</Kbd>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
