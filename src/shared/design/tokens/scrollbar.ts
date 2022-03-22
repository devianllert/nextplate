import { css, SerializedStyles } from '@emotion/react';

interface ScrollbarOptions {
  /**
   * The track width.
   */
  width?: number;
  /**
   * The border of the thumb.
   */
  border?: number;
  /**
   * If true, show scroll bar only on hover.
   */
  hideOnBlur?: boolean;
  /**
   * The track color.
   */
  trackColor?: string;
  /**
   * The thumb color.
   */
  thumbColor?: string;
}

/**
 * Create styles for custom native scrollbar.
 *
 * @returns css object for scrollbar.
 */
export const createScrollbarStyles = (options: ScrollbarOptions = {}): SerializedStyles => {
  const {
    width = 8,
    border = 0,
    hideOnBlur = false,
    trackColor = '#e4e4e4',
    thumbColor = '#8070d4',
  } = options;

  return css({
    '&::-webkit-scrollbar': {
      width,
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor: trackColor,
      borderRadius: 8,
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      border: `${border}px solid transparent`,
      backgroundClip: 'content-box',
      backgroundColor: thumbColor,

      ...(hideOnBlur && {
        visibility: 'hidden',
      }),
    },

    ...(hideOnBlur && {
      '&:hover &::-webkit-scrollbar-thumb': {
        visibility: 'visible',
      },
    }),
  });
};
