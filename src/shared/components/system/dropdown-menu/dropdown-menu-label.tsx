import styled from '@emotion/styled';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownMenuLabel = styled(DropdownMenuPrimitive.Label)((props) => ({
  fontSize: 12,
  color: props.theme.colors.neutral.neutral11,
  lineHeight: '24px',
  paddingLeft: 4,
  paddingRight: 4,
}));

export { DropdownMenuLabel as Label };
