import * as React from 'react';

import { ActionButton } from '@effable/react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

import { useBoolean } from '@/shared/hooks/use-boolean';

import { Input, InputProps } from './input';

export type InputPasswordProps = Omit<InputProps, 'type'>;

export const InputPassword = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [show, toggleShow] = useBoolean(false);

  return (
    <Input
      ref={ref}
      type={show ? 'text' : 'password'}
      suffix={(
        <ActionButton onClick={() => toggleShow()} size="small">
          {show ? <RiEyeLine /> : <RiEyeOffLine />}
        </ActionButton>
      )}
      {...props}
    />
  );
});
