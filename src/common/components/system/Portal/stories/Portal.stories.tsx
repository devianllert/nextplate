import React, { ReactElement } from 'react';

import { Portal } from '../Portal';

export default {
  title: 'Components/Portal',
  component: Portal,
};

export const Basic = (): ReactElement => {
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
