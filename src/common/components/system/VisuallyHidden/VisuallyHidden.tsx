/* eslint-disable prefer-arrow-callback */
import * as React from 'react';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';

/**
 * The `VisuallyHidden` component is used to provide text for screen readers that is visually hidden.
 * It is the logical opposite of the `aria-hidden` attribute.
 *
 * @see https://snook.ca/archives/html_and_css/hiding-content-for-accessibility
 */
export const VisuallyHidden: PolymorphicComponent<unknown, 'span'> = React.forwardRef(function VisuallyHidden(props, ref): JSX.Element {
  const {
    children,
    component: Component = 'span',
    style,
    ...other
  } = props;

  return (
    <Component
      ref={ref}
      style={{
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        width: '1px',

        // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        ...style,
      }}
      {...other}
    >
      {children}
    </Component>
  );
});
