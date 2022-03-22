/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Inset } from '../Inset';

describe('<Inset />', () => {
  const children = 'Inset';

  it('should render a children', () => {
    render(<Inset>{children}</Inset>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
