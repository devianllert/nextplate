import * as React from 'react';
import { ActionButton, Input, InputProps, useBoolean } from '@effable/react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

export type InputPasswordProps = Omit<InputProps, 'type'> & {
  passwordIconLabel: string;
};

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>((props, ref) => {
  const { passwordIconLabel, ...other } = props;

  const [show, toggleShow] = useBoolean(false);

  return (
    <Input
      ref={ref}
      type={show ? 'text' : 'password'}
      suffix={
        <ActionButton onClick={() => toggleShow()} size="small" label={passwordIconLabel ?? ''}>
          {show ? <RiEyeLine /> : <RiEyeOffLine />}
        </ActionButton>
      }
      {...other}
    />
  );
});
