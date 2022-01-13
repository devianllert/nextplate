import * as React from 'react';
import styled from '@emotion/styled';

import { PolymorphicComponent } from '@/modules/core/react/types/Polymorphic';
import { spacings } from '@/common/design/tokens/spacings';

export const InputAdornmentRoot = styled.div<InputAdornmentProps>((props) => ({
  display: 'flex',
  maxHeight: '2em',
  alignItems: 'center',
  whiteSpace: 'nowrap',

  ...(props.position === 'start' && {
    marginRight: spacings[2],
  }),

  ...(props.position === 'end' && {
    marginLeft: spacings[2],
  }),

  ...(props.disablePointerEvents === true && {
    pointerEvents: 'none',
  }),
}));

interface InputAdornmentProps {
  /**
   * The content of the component, normally an `IconButton` or string.
   */
  children: React.ReactNode;

  /**
   * Disable pointer events on the root.
   * This allows for the content of the adornment to focus the input on click.
   */
  disablePointerEvents?: boolean;

  /**
   * The position this adornment should appear relative to the `Input`.
   */
  position?: 'start' | 'end';
}

export const InputAdornment: PolymorphicComponent<InputAdornmentProps, 'div'> = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    component,
    disablePointerEvents = false,
    position,
    ...other
  } = props;

  return (
    <InputAdornmentRoot
      position={position}
      disablePointerEvents={disablePointerEvents}
      className={className}
      as={component}
      ref={ref}
      {...other}
    >
      {children}
    </InputAdornmentRoot>
  );
});
