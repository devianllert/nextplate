import * as React from 'react';

import { createContext } from '@/modules/core/react/createContext';

const MODAL_NAME = 'Modal';

interface ModalContextValue {
  /**
   * If `true`, the component is shown.
   */
  open: boolean;

  /**
   * When `true`, focus cannot escape the `Content` via keyboard,
   * pointer, or a programmatic focus.
   *
   * @default true
   */
  trapFocus: boolean;

  /**
   * If `true`, disable modal animations
   */
  shouldReduceMotion: boolean;

  /**
   * If `true`, the modal will close when the something outside of modal is clicked
   *
   * @default true
   */
  closeOnOutsideClick: boolean;

  /**
  * If `true`, the modal will close when the `Esc` key is pressed
  *
  * @default true
  */
  closeOnEsc: boolean;

  contentRef: React.Ref<HTMLDivElement>;

  /**
  * Callback fired when the click happens outside of modal.
  */
  onOutsideClick?: () => void;

  /**
   * Callback fired when the escape key is pressed and focus is within modal
   */
  onEsc?: () => void;

  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: () => void;

  /**
   * If `true`, scrolling will be disabled on the `body` when the modal opens.
   *
   *  @default true
   */
  blockScrollOnMount?: boolean;

  /**
      * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
      *
      * @default false
      */
  allowPinchZoom?: boolean;

  /**
      * If `true`, a `padding-right` will be applied to the body element
      * that's equal to the width of the scrollbar.
      *
      * This can help prevent some unpleasant flickering effect
      * and content adjustment when the modal opens
      *
      * @default false
      */
  preserveScrollBarGap?: boolean;
}

export const [ModalProvider, useModalContext] = createContext<ModalContextValue>(MODAL_NAME);
