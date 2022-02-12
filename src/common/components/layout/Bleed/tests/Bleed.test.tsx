/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Bleed } from '../Bleed';

describe('<Bleed />', () => {
  const children = 'Bleed';

  it('should render a children', () => {
    render(<Bleed>{children}</Bleed>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
