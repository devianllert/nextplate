/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoadingOverlay } from '../loading-overlay';

describe('<LoadingOverlay />', () => {
  const children = 'LoadingOverlay';

  it('should render a children', () => {
    render(<LoadingOverlay loader={children} />);

    expect(screen.getByText(children)).toBeDefined();
  });
});
