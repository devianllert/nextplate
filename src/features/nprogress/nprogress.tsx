import * as React from 'react';
import Router from 'next/router';
import { EffableTheme } from '@effable/react';
import { css, Global, useTheme } from '@emotion/react';
import NProgress from 'nprogress';

export interface NProgressRootProps {
  /**
   * Refers to a color found in the theme eg. 'primary', 'secondary',
   * or any valid css color eg. "#fff"
   */
  color?: string;
  /** Number of miliseconds to wait before showing loading bar */
  showAfterMs?: number;
  /** nprogress [configuration object](https://github.com/rstacruz/nprogress#configuration) */
  options?: NProgress.NProgressOptions;
}

export const NProgressRoot = (props: NProgressRootProps) => {
  const { color = 'accent', showAfterMs = 0, options } = props;

  const theme = useTheme() as unknown as EffableTheme;

  const timer = React.useRef<number>();

  const routeChangeStart = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => NProgress.start(), showAfterMs);
  };

  const routeChangeEnd = () => {
    window.clearTimeout(timer.current);
    NProgress.done();
  };

  React.useEffect(() => {
    if (options) {
      NProgress.configure(options);
    }

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      clearTimeout(timer.current);
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return (
    <Global
      styles={css`
        #nprogress {
          pointer-events: none;
        }

        #nprogress .bar {
          background: ${theme.colors.accent.accent9};
          position: fixed;
          z-index: 1031;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
        }

        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${theme.colors.accent.accent9}, 0 0 5px ${theme.colors.accent.accent9};
          opacity: 1;
          transform: rotate(3deg) translate(0px, -4px);
        }

        #nprogress .spinner {
          display: none;
          position: fixed;
          z-index: 1031;
          top: 15px;
          right: 15px;
        }

        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;

          border: solid 2px transparent;
          border-top-color: ${theme.colors.accent.accent9};
          border-left-color: ${theme.colors.accent.accent9};
          border-radius: 50%;

          animation: nprogress-spinner 400ms linear infinite;
        }

        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }

        .nprogress-custom-parent #nprogress .spinner {
          position: absolute;
        }

        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }

        @keyframes nprogress-spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}
    />
  );
};
