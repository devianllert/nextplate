import styled from '@emotion/styled';

import { Breakpoint, breakpoints, media } from '@/common/design/media';
import { spacings } from '@/common/design/tokens/spacings';

export interface ContainerRootProps {
  /**
   * The content
   */
  children: React.ReactNode;
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   *
   * @default 'desktop'
   */
  maxWidth?: Breakpoint | false;
  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   *
   * @default false
   */
  fixed?: boolean;
  /**
   * If `true`, the left and right padding is removed.
   *
   * @default false
   */
  disableGutters?: boolean;
}

export const ContainerRoot = styled.div<ContainerRootProps>((props) => ({
  width: '100%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',

  ...(!props.disableGutters && {
    paddingLeft: spacings[3],
    paddingRight: spacings[3],

    [media.tablet.up]: {
      paddingLeft: spacings[4],
      paddingRight: spacings[4],
    },
  }),

  ...(props.fixed && Object.keys(breakpoints).reduce((acc, breakpoint) => {
    const value = breakpoints[breakpoint as Breakpoint];

    if (value !== 0) {
      acc[media[breakpoint as Breakpoint].up] = {
        maxWidth: `${value}px`,
      };
    }
    return acc;
  }, {})),

  ...(props.maxWidth === 'mobile' && {
    [media.mobile.up]: {
      maxWidth: Math.max(breakpoints.mobile, 444),
    },
  }),

  ...(props.maxWidth && props.maxWidth !== 'mobile' && {
    [media[props.maxWidth].up]: {
      maxWidth: `${breakpoints[props.maxWidth]}px`,
    },
  }),
}));
