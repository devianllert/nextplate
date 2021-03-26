
import React, { ReactChild } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ButtonBase from '../ButtonBase';

describe('<BaseButton />', () => {
  const children: ReactChild = 'BaseButton';

  it('should render a children', () => {
    render(<ButtonBase>{children}</ButtonBase>);

    expect(screen.getByText(children)).toBeDefined();
  });
});
