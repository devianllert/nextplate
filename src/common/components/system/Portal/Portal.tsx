/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children?: React.ReactNode;

  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: Element | (() => Element | null) | null;
}

function getContainer(container?: Element | (() => Element | null) | null) {
  return typeof container === 'function' ? container() : container;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * React doesn't support the createPortal() API on the server. You have to wait for the client-side hydration to see the children.
 */
export const Portal = (props: PortalProps): JSX.Element => {
  const { children, container } = props;

  const [mountNode, setMountNode] = React.useState<Element | null>(null);

  React.useLayoutEffect(() => {
    setMountNode(getContainer(container) || document.body);
  }, [container]);

  return mountNode ? createPortal(children, mountNode) : <span />;
};
