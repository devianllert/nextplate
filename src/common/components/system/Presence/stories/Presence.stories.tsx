/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Meta } from '@storybook/react';

import { Presence } from '../Presence';

export default {
  title: 'Design System/Atoms/Presence',
  component: Presence,
} as Meta;

export const Basic = (): JSX.Element => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <button type="button" onClick={() => setOpen((prevOpen) => !prevOpen)}>toggle</button>

      <Presence present={open}>
        <div>Content</div>
      </Presence>
    </>
  );
};

function Toggles({ open, onOpenChange, nodeRef }: any) {
  function handleToggleVisibility() {
    const node = nodeRef.current;
    if (node) {
      if (node.style.display === 'none') {
        node.style.display = 'block';
      } else {
        node.style.display = 'none';
      }
    }
  }

  return (
    <form style={{ display: 'flex', marginBottom: 30 }}>
      <fieldset>
        <legend>Mount</legend>
        <button type="button" onClick={() => onOpenChange(!open)}>
          toggle
        </button>
      </fieldset>
      <fieldset>
        <legend>Visibility (triggers cancel event)</legend>
        <button type="button" onClick={handleToggleVisibility}>
          toggle
        </button>
      </fieldset>
    </form>
  );
}

const AnimatedContent = styled.div<{ styles?: any }>(({ styles }) => styles);

function Animation(props: React.ComponentProps<'div'> & { styles?: any }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Toggles nodeRef={ref} open={open} onOpenChange={setOpen} />
      <Presence present={open}>
        <AnimatedContent {...props} data-state={open ? 'open' : 'closed'} ref={ref}>
          Content
        </AnimatedContent>
      </Presence>
    </>
  );
}

export const WithMountAnimation = (): JSX.Element => <Animation styles={mountAnimationClass} />;

export const WithUnmountAnimation = (): JSX.Element => <Animation styles={unmountAnimationClass} />;

export const WithMultipleMountAnimations = (): JSX.Element => <Animation styles={multipleMountAnimationsClass} />;

export const WithOpenAndCloseAnimation = (): JSX.Element => <Animation styles={openAndCloseAnimationClass} />;

export const WithMultipleOpenAndCloseAnimations = (): JSX.Element => <Animation styles={multipleOpenAndCloseAnimationsClass} />;

export const WithDeferredMountAnimation = (): JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef(0);
  const [open, setOpen] = React.useState(false);
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      timerRef.current = window.setTimeout(() => setAnimate(true), 150);
    } else {
      setAnimate(false);
      window.clearTimeout(timerRef.current);
    }
  }, [open]);

  return (
    <>
      <p>
        Deferred animation should unmount correctly when toggled. Content will flash briefly while
        we wait for animation to be applied.
      </p>
      <Toggles nodeRef={ref} open={open} onOpenChange={setOpen} />
      <Presence present={open}>
        <AnimatedContent styles={animate ? mountAnimationClass : undefined} ref={ref}>
          Content
        </AnimatedContent>
      </Presence>
    </>
  );
};

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

const slideUp = keyframes({
  from: { transform: 'translateY(30px)' },
  to: { transform: 'translateY(0)' },
});

const slideDown = keyframes({
  from: { transform: 'translateY(0)' },
  to: { transform: 'translateY(30px)' },
});

const mountAnimationClass = css({
  animation: `${fadeIn} 3s ease-out`,
});

const unmountAnimationClass = css({
  '&[data-state="closed"]': {
    animation: `${fadeOut} 3s ease-in`,
  },
});

const multipleMountAnimationsClass = css({
  animation: `${fadeIn} 6s cubic-bezier(0.22, 1, 0.36, 1), ${slideUp} 6s cubic-bezier(0.22, 1, 0.36, 1)`,
});

const openAndCloseAnimationClass = css({
  '&[data-state="open"]': {
    animation: `${fadeIn} 3s ease-out`,
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 3s ease-in`,
  },
});

const multipleOpenAndCloseAnimationsClass = css({
  '&[data-state="open"]': {
    animation: `${fadeIn} 3s cubic-bezier(0.22, 1, 0.36, 1), ${slideUp} 1s cubic-bezier(0.22, 1, 0.36, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 3s cubic-bezier(0.22, 1, 0.36, 1), ${slideDown} 1s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
  },
});
