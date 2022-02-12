/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import { Breakpoint } from '@/common/design/media';
import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

import * as S from './styled';

export interface ContainerProps {
  /**
   * The content
   */
  children: React.ReactNode;

  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   *
   * @default 'desktop'
   */
  maxWidth?: Breakpoint | false;

  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   *
   * @default false
   */
  fixed?: boolean;

  /**
   * If `true`, the left and right padding is removed.
   *
   * @default false
   */
  disableGutters?: boolean;
}

/**
 * The container centers your content horizontally. It's the most basic layout element.
 */
export const Container: PolymorphicComponent<ContainerProps, 'div'> = React.forwardRef(function Container(props, ref) {
  const {
    children,
    maxWidth = 'desktop',
    fixed = false,
    disableGutters = false,
    component = 'div',
    ...other
  } = props;

  return (
    <S.ContainerRoot
      as={component}
      ref={ref}
      maxWidth={maxWidth}
      fixed={fixed}
      disableGutters={disableGutters}
      {...other}
    >
      {children}
    </S.ContainerRoot>
  );
});
