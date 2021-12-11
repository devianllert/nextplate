import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import styled from '@emotion/styled';

import { scaleIn, scaleOut } from '@/modules/core/css-in-js/animations';
import { duration, easing } from '@/common/design/tokens/transitions';

export type RadioGroupItemProps = RadioGroupPrimitive.RadioGroupItemProps;

const StyledRadio = styled(RadioGroupPrimitive.Item)((props) => ({
  all: 'unset',
  width: 20,
  height: 20,
  borderRadius: '100%',
  boxShadow: `0 0 0 2px ${props.theme.colors.radix.grayA7}`,
  cursor: 'pointer',
  '&:hover': { backgroundColor: props.theme.colors.radix.primary3 },
  '&:focus': {
    boxShadow: `
      inset 0 0 0 1px ${props.theme.colors.radix.primary9},
      0 0 0 1px ${props.theme.colors.radix.primary9}
    `,
  },
}));

const StyledIndicator = styled(RadioGroupPrimitive.Indicator)((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',

  '&::after': {
    content: '""',
    display: 'block',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: props.theme.colors.radix.primary11,
  },

  '&[data-state="checked"]': {
    animation: `${scaleIn} ${duration.shortest}ms ${easing.easeOut}`,
  },
  '&[data-state="unchecked"]': {
    animation: `${scaleOut} ${duration.shortest}ms ${easing.easeOut}`,
  },
}));

export const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioGroupItemProps>((props, ref) => (
  <StyledRadio {...props} ref={ref}>
    <StyledIndicator />
  </StyledRadio>
));

export {
  RadioGroupItem as Item,
};
