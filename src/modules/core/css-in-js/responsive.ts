/**
 * At the end of the day, you should do everything you can to limit layout differences between mobile and desktop.
 * Use responsive props from styled-system. Play around with flexbox and flex-direction,
 * start learning about CSS grid, and use CSS @media queries when you can.
 * If you absolutely must render different views on different breakpoints,
 * render all the UI and hide what's not needed for that breakpoint.
 * You want your users to see the right content as quickly as possible.
 * Send them HTML and CSS from your server that their client can use.
 *
 * @see https://artsy.github.io/blog/2019/05/24/server-rendering-responsively/
 */

import { createMedia } from '@artsy/fresnel';

import { breakpoints } from '@/common/design/media';

const AppMedia = createMedia({
  breakpoints,
});

// Make styles for injection into the header of the page
export const mediaStyles = AppMedia.createMediaStyle();

export const { Media, MediaContextProvider } = AppMedia;
