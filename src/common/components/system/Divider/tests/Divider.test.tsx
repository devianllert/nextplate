import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Divider } from '../Divider';

describe('<Divider />', () => {
  const children = 'Divider';

  it('should render a children', () => {
    render(<Divider />);

    expect(screen.getByText(children)).toBeDefined();
  });
});
