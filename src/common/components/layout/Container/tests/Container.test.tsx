/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Container } from '../Container';

describe('<Container />', () => {
  const children = 'Container';

  it('should render a children', () => {
    render(<Container>{children}</Container>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
