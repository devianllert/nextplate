import styled from '@emotion/styled';

import { spacings } from '@/common/design/tokens/spacings';
import { getSpace } from '@/modules/core/css-in-js/getters';

export interface DividerRootProps {
  orientation: 'vertical' | 'horizontal';
  decorative?: boolean;
  space: number;
  flexItem?: boolean;
}

export const DividerRoot = styled.hr<DividerRootProps>((props) => ({
  boxSizing: 'border-box',
  color: props.theme.colors.radix.grayA6,
  border: 0,
  marginTop: getSpace(spacings, props.space),
  marginBottom: getSpace(spacings, props.space),
  backgroundColor: props.theme.colors.radix.grayA6,
  width: '100%',
  height: '1px',

  ...(props.orientation === 'vertical' && {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: getSpace(spacings, props.space),
    marginRight: getSpace(spacings, props.space),
    height: '100%',
    width: '1px',

    ...(props.flexItem && {
      alignSelf: 'stretch',
      height: 'auto',
    }),
  }),
}));
