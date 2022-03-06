import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';

import * as S from './styled';

export type SwitchProps = SwitchPrimitive.SwitchProps & {
  /**
   * The size of the component
   */
  size?: 'small' | 'large';
};

/**
 * The `Switch` component is used to toggle the state of a single setting on or off.
 *
 * Switches are the preferred way to adjust settings on mobile.
 * The option that the switch controls, as well as the state it's in,
 * should be made clear from the corresponding inline label.
 */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>((props, ref): JSX.Element => (
  <S.SwitchRoot {...props} ref={ref}>
    <S.SwitchThumb size={props.size} />
  </S.SwitchRoot>
));
