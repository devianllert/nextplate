import * as React from 'react';
import { Meta } from '@storybook/react';

import { Portal } from '../Portal';

export default {
  title: 'Design System/Atoms/Portal',
  component: Portal,
} as Meta;

export const Basic = (): JSX.Element => {
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        {show ? 'Unmount children' : 'Mount children'}
      </button>

      <div>
        It looks like I will render here.
        {show && (
          <Portal container={container.current}>
            <span>But I actually render here!</span>
          </Portal>
        )}
      </div>

      <div ref={container} />
    </div>
  );
};
