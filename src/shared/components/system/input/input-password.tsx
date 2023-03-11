import * as React from 'react';

import { ActionButton, useBoolean } from '@effable/react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

import { Input, InputProps } from './input';

export type InputPasswordProps = Omit<InputProps, 'type'>;

export const InputPassword = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, ...other } = props;

  const [show, toggleShow] = useBoolean(false);

  return (
    <Input
      ref={ref}
      type={show ? 'text' : 'password'}
      suffix={(
        <ActionButton onClick={() => toggleShow()} size="small" label={label ?? ''}>
          {show ? <RiEyeLine /> : <RiEyeOffLine />}
        </ActionButton>
      )}
      {...other}
    />
  );
});
