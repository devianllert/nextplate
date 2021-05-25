
import React, { ReactChild } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MainHeader from '../MainHeader';

describe('<MainHeader />', () => {
  const children: ReactChild = 'MainHeader';

  it('should render a children', () => {
    render(<MainHeader>{children}</MainHeader>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
