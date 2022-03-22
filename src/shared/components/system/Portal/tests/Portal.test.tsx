/**
 * @jest-environment jsdom
 */

import * as React from 'react';

import { render, screen } from '@testing-library/react';

import { Portal } from '../Portal';

describe('<Portal />', (): void => {
  it('should render in a different node', () => {
    const { container } = render(
      <div id="test1">
        <h1 className="woofPortal1">woofPortal1</h1>
        <Portal>
          <h1 className="woofPortal2">woofPortal2</h1>
        </Portal>
      </div>,
    );

    expect(container.contains(screen.getByText('woofPortal1'))).toBeTruthy();
    expect(container.contains(screen.getByText('woofPortal2'))).toBeFalsy();
  });

  it('should unmount when parent unmounts', async () => {
    function Parent(props: { show?: boolean }): JSX.Element {
      const { show = true } = props;
      return <div>{show ? <Child /> : null}</div>;
    }

    function Child(): JSX.Element  {
      const containerRef = React.useRef<HTMLDivElement>(null);
      return (
        <div>
          <div ref={containerRef} />
          <Portal container={(): HTMLDivElement | null => containerRef.current}>
            <div>portal</div>
          </Portal>
        </div>
      );
    }

    const { rerender } = render(<Parent />);

    expect(screen.queryAllByText('portal')).toHaveLength(1);
    rerender(<Parent show={false} />);
    expect(screen.queryAllByText('portal')).toHaveLength(0);
  });

  it('should render overlay into container (document)', () => {
    render(
      <Portal>
        <div>portal</div>
      </Portal>,
    );

    expect(screen.queryAllByText('portal')).toHaveLength(1);
  });

  it('should change container on prop change', () => {
    const ContainerTest = (props: { containerElement?: boolean }): JSX.Element  => {
      const {
        containerElement,
      } = props;

      const containerRef = React.useRef<HTMLElement>(null);
      const container = React.useCallback(
        () => (containerElement ? containerRef.current : null),
        [containerElement],
      );

      return (
        <span>
          <strong ref={containerRef} />
          <Portal container={container}>
            <div>portal</div>
          </Portal>
        </span>
      );
    };

    const { rerender } = render(<ContainerTest />);
    expect(screen.getByText('portal').parentNode?.nodeName).toEqual('BODY');

    rerender(<ContainerTest containerElement />);
    expect(screen.getByText('portal').parentNode?.nodeName).toEqual('STRONG');
  });
});
