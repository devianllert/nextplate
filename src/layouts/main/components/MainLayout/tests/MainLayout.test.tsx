
import React, { ReactChild } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MainLayout from '../MainLayout';

describe('<MainLayout />', () => {
  const children: ReactChild = 'MainLayout';

  it('should render a children', () => {
    render(<MainLayout>{children}</MainLayout>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
