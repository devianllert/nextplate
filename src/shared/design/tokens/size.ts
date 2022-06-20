export type Sizes = 'xsmall' | 'small' | 'medium' | 'large';

export interface SizeProps {
  /**
   * The size of the component|element.
   */
  size: Sizes;
}

export const sizes = ['xsmall', 'small', 'medium', 'large'] as const;

export const getPreviousSize = (size: Sizes): Sizes => {
  let sizeIdx = sizes.indexOf(size) - 1;

  if (sizeIdx < 0) {
    sizeIdx = 0;
  }

  return sizes[sizeIdx];
};
