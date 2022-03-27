import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

export type RadioGroupProps = RadioGroupPrimitive.RadioGroupProps;

export const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.RadioGroup>, RadioGroupProps>((props, ref) => {
  const {
    children,
    ...other
  } = props;

  return (
    <RadioGroupPrimitive.RadioGroup {...other} ref={ref}>{children}</RadioGroupPrimitive.RadioGroup>
  );
});

export {
  RadioGroup as Root,
};
