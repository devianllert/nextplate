/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WeatherLayout } from '../WeatherLayout';

describe('<WeatherLayout />', () => {
  const children = 'WeatherLayout';

  it('should render a children', () => {
    render(<WeatherLayout>{children}</WeatherLayout>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
