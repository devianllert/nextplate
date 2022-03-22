export type Breakpoint = 'desktop' | 'tablet' | 'mobile';

interface MediaQueryType {
  up: string;
  down: string;
}

export const createMediaQuery = (maxWidth: number): MediaQueryType => ({
  up: `@media screen and (min-width: ${maxWidth}px)`,
  down: `@media screen and (max-width: ${maxWidth - 1}px)`,
});

export const breakpoints: Record<Breakpoint, number> = {
  mobile: 600,
  tablet: 960,
  desktop: 1440,
};

export const media = {
  mobile: createMediaQuery(breakpoints.mobile),
  tablet: createMediaQuery(breakpoints.tablet),
  desktop: createMediaQuery(breakpoints.desktop),
};

export const customMedia = createMediaQuery;

/**
 * By default, returns true if screen width is the same or greater than the given breakpoint.
 */
export const isWidthUp = (breakpoint: Breakpoint, width: Breakpoint, inclusive = true): boolean => {
  const keys = Object.keys(breakpoints);

  if (inclusive) {
    return keys.indexOf(breakpoint) <= keys.indexOf(width);
  }

  return keys.indexOf(breakpoint) < keys.indexOf(width);
};

/**
 * By default, returns true if screen width is the same or less than the given breakpoint.
 */
export const isWidthDown = (breakpoint: Breakpoint, width: Breakpoint, inclusive = true): boolean => {
  const keys = Object.keys(breakpoints);

  if (inclusive) {
    return keys.indexOf(width) <= keys.indexOf(breakpoint);
  }

  return keys.indexOf(width) < keys.indexOf(breakpoint);
};
