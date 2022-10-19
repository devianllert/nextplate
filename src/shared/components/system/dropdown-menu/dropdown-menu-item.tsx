import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import styled from '@emotion/styled';
import { CSSObject, Theme } from '@emotion/react';
import { RiCheckLine, RiArrowRightSLine } from 'react-icons/ri';

import { Box } from '@/shared/components/system/box';
import { Flex } from '@/shared/components/system/flex';
import { Switch } from '@/shared/components/system/switch';
import { paragraphs } from '@/shared/design/tokens/typography';

const menuItemCss = (props: { theme: Theme }): CSSObject => ({
  ...paragraphs.body3,
  fontWeight: 400,
  display: 'flex',
  alignItems: 'center',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '1',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  height: 32,
  borderRadius: 4,
  paddingLeft: 8,
  paddingRight: 8,
  position: 'relative',
  cursor: 'pointer',
  color: props.theme.colors.text.primary,

  '&:focus': {
    outline: 'none',
    backgroundColor: props.theme.colors.radix.gray4,
  },

  '&[data-disabled]': {
    cursor: 'default',
    color: props.theme.colors.text.disabled,
  },
});

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item)(menuItemCss);

const StyledDropdownMenuTriggerItem = styled(DropdownMenuPrimitive.SubTrigger)(menuItemCss);
const StyledDropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem)(menuItemCss, {
  paddingRight: 24,
});
const StyledDropdownMenuCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)(menuItemCss, {
  paddingRight: 48,
});

export const DropdownMenuItemRightAdornment = styled.div((props) => ({
  marginLeft: 'auto',
  paddingLeft: 16,
  color: props.theme.colors.radix.gray11,
  // '*:focus > &': { color: 'white' },
  '[data-disabled] &': { color: props.theme.colors.radix.gray8 },
}));

export const DropdownMenuItemLeftAdornment = styled.div((props) => ({
  paddingRight: 8,
  color: props.theme.colors.radix.gray11,
  // '*:focus > &': { color: 'white' },
  '[data-disabled] &': { color: props.theme.colors.radix.gray8 },
}));

export const DropdownMenuRadioItem = React.forwardRef((
  { children, ...props }: DropdownMenuPrimitive.DropdownMenuRadioItemProps,
  ref: React.ForwardedRef<React.ElementRef<typeof StyledDropdownMenuRadioItem>>,
) => (
  <StyledDropdownMenuRadioItem {...props} ref={ref}>
    {children}

    <Box component="span" position="absolute" right={1}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Flex alignItems="center" justifyContent="center" width={16} height={16}>
          <RiCheckLine size={16} />
        </Flex>
      </DropdownMenuPrimitive.ItemIndicator>
    </Box>
  </StyledDropdownMenuRadioItem>
));

export const DropdownMenuCheckboxItem = React.forwardRef((
  { children, ...props }: DropdownMenuPrimitive.DropdownMenuCheckboxItemProps,
  ref: React.ForwardedRef<React.ElementRef<typeof StyledDropdownMenuCheckboxItem>>,
) => (
  <StyledDropdownMenuCheckboxItem
    {...props}
    ref={ref}
    onSelect={(event) => {
      event.preventDefault();
      props.onSelect?.(event);
    }}
  >
    {children}

    <Box component="span" position="absolute" right={1}>
      <Switch size="small" disabled={props.disabled} checked={!!props.checked} />
    </Box>
  </StyledDropdownMenuCheckboxItem>
));

export const DropdownMenuSubTriggerItem = React.forwardRef((
  { children, ...props }: DropdownMenuPrimitive.DropdownMenuSubTriggerProps,
  ref: React.ForwardedRef<React.ElementRef<typeof StyledDropdownMenuCheckboxItem>>,
) => (
  <StyledDropdownMenuTriggerItem {...props} ref={ref}>
    <Box component="span" position="absolute" right={1}>
      <Flex alignItems="center" justifyContent="center" width={16} height={16}>
        <RiArrowRightSLine />
      </Flex>
    </Box>

    {children}
  </StyledDropdownMenuTriggerItem>
));

export {
  DropdownMenuCheckboxItem as CheckboxItem,
  DropdownMenuItem as Item,
  DropdownMenuRadioItem as RadioItem,
  DropdownMenuSubTriggerItem as SubTriggerItem,
  DropdownMenuItemLeftAdornment as LeftAdornment,
  DropdownMenuItemRightAdornment as RightAdornment,
};
