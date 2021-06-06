/**
 * @jest-environment jsdom
 */

import React, { ReactChild } from 'react';
import { render, screen } from '@testing-library/react';

import { Inline } from '../Inline';

describe('<Inline />', () => {
  const children: ReactChild = 'Inline';

  it('should render a children', () => {
    render(<Inline>{children}</Inline>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
