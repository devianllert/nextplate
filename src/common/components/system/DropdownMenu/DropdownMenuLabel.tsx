import styled from '@emotion/styled';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { captions } from '@/common/design/tokens/typography';

export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label)((props) => ({
  ...captions.caption1,
  color: props.theme.colors.radix.gray11,
  lineHeight: '24px',
  paddingLeft: 4,
  paddingRight: 4,
}));

export {
  DropdownMenuLabel as Label,
};
