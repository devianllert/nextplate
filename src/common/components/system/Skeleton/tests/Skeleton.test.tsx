/**
 * @jest-environment jsdom
 */

import * as React from 'react';

import { renderWithProviders } from '@/modules/core/testing/renderWithProviders';
``
import { Skeleton } from '../Skeleton';

describe('<Skeleton />', () => {
  it('should change the component tag', () => {
    const { container } = renderWithProviders(<Skeleton component="span" />);

    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('should get fitContent class when passed children and no width', () => {
    const { container: containerWithoutWidth } = renderWithProviders(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(containerWithoutWidth.firstChild).toHaveStyleRule('max-width', 'fit-content');

    const { container: containerWithWidth } = renderWithProviders(
      <Skeleton width="100">
        <span />
      </Skeleton>,
    );

    expect(containerWithWidth.firstChild).not.toHaveStyleRule('max-width', '');
  });

  it('should get heightAuto class when passed children and no height', () => {
    const { container: containerWithoutHeight } = renderWithProviders(
      <Skeleton>
        <span />
      </Skeleton>,
    );

    expect(containerWithoutHeight.firstChild).toHaveStyleRule('height', 'auto');

    const { container: containerWithHeight } = renderWithProviders(
      <Skeleton height="100">
        <span />
      </Skeleton>,
    );

    expect(containerWithHeight.firstChild).not.toHaveStyleRule('height', '');
  });
});
