/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';

import { Skeleton } from '../Skeleton';
import { ThemeProvider } from 'styled-components';

import dark from '@/common/design/tokens/palette.dark';
import light from '@/common/design/tokens/palette.light';

const renderWithProvider = (ui: React.ReactNode, theme: 'light' | 'dark' = 'light') => render(
  <ThemeProvider theme={theme === 'light' ? light : dark}>
    {ui}
  </ThemeProvider>
)

describe('<Skeleton />', () => {
  it('should change the component tag', () => {
    const { container } = renderWithProvider(<Skeleton component="span" />);

    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('should get fitContent class when passed children and no width', () => {
    const { container: containerWithoutWidth } = renderWithProvider(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(containerWithoutWidth.firstChild).toHaveStyleRule('max-width', 'fit-content');

    const { container: containerWithWidth } = renderWithProvider(
      <Skeleton width="100">
        <span />
      </Skeleton>,
    );

    expect(containerWithWidth.firstChild).not.toHaveStyleRule('max-width');
  });

  it('should get heightAuto class when passed children and no height', () => {
    const { container: containerWithoutHeight } = renderWithProvider(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(containerWithoutHeight.firstChild).toHaveStyleRule('height', 'auto');

    const { container: containerWithHeight } = renderWithProvider(
      <Skeleton height="100">
        <span />
      </Skeleton>,
    );

    expect(containerWithHeight.firstChild).not.toHaveStyleRule('height');
  });
});
