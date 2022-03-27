import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import styled from '@emotion/styled';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;

export const DropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator)((props) => ({
  height: 1,
  marginTop: 4,
  marginBottom: 4,
  backgroundColor: props.theme.colors.radix.grayA6,
}));

export const DropdownMenuArrow = styled(DropdownMenuPrimitive.Arrow)({
  fill: 'white',
});

export {
  DropdownMenu as Root,
  DropdownMenuTrigger as Trigger,
  DropdownMenuRadioGroup as RadioGroup,
  DropdownMenuGroup as Group,
  DropdownMenuSeparator as Separator,
  DropdownMenuArrow as Arrow,
};
