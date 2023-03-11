import * as React from 'react';

import styled from '@emotion/styled';

import { PolymorphicComponent } from '@/shared/types/polymorphic';

export const inputAdornmentTypography = {
  small: 16,
  medium: 20,
  large: 24,
};

export const InputAdornmentRoot = styled.div<InputAdornmentProps>((props) => ({
  fontSize: inputAdornmentTypography[props.size ?? 'medium'],
  display: 'flex',
  maxHeight: '2em',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  marginRight: props.position === 'start' ? props.theme.space['1x'] : props.theme.space['2x'],
  marginLeft: props.position === 'start' ? props.theme.space['2x'] : props.theme.space['1x'],

  color: props.theme.colors.text.secondary,

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

  /**
   * The size of the component.
   *
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}

export const InputAdornment: PolymorphicComponent<InputAdornmentProps, 'div'> = React.forwardRef((props, ref) => {
  const {
    children, className, component, disablePointerEvents = false, position, size, ...other
  } = props;

  return (
    <InputAdornmentRoot
      position={position}
      disablePointerEvents={disablePointerEvents}
      className={className}
      as={component}
      ref={ref}
      size={size}
      {...other}
    >
      {children}
    </InputAdornmentRoot>
  );
});
