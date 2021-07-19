import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NProgressRoot } from '../NProgress';

describe('<NProgressRoot />', () => {
  const children = 'NProgressRoot';

  it('should render a children', () => {
    render(<NProgressRoot />);

    expect(screen.getByText(children)).toBeDefined();
  });
});
