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
  flexShrink: 0,
  color: props.theme.colors.text.disabled,
  marginTop: getSpace(spacings, props.space),
  marginBottom: getSpace(spacings, props.space),
  border: 0,
  borderStyle: 'solid',
  borderBottomWidth: 'thin',
  borderColor: props.theme.colors.text.disabled,

  ...(props.orientation === 'vertical' && {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: getSpace(spacings, props.space),
    marginRight: getSpace(spacings, props.space),
    borderBottomWidth: 0,
    borderRightWidth: 'thin',
  }),

  ...(props.flexItem && {
    alignSelf: 'stretch',
    height: 'auto',
  }),
}));
