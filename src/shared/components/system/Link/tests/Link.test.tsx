/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Link } from '../Link';

describe('<Link />', () => {
  const children = 'Link';

  it('should render a children', () => {
    render(<Link>{children}</Link>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
