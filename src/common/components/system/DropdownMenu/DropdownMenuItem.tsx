import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import styled from '@emotion/styled';
import { CSSObject, Theme } from '@emotion/react';
import { RiCheckLine, RiCheckboxBlankCircleFill, RiArrowRightSLine } from 'react-icons/ri';

import { Box } from '@/common/components/layout/Box';
import { Flex } from '@/common/components/layout/Flex';
import { paragraphs } from '@/common/design/tokens/typography';

const menuItemCss = (props: { theme: Theme }): CSSObject => ({
  ...paragraphs.body3,
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: '1',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  height: 32,
  borderRadius: 4,
  paddingLeft: 4,
  paddingRight: 4,
  position: 'relative',
  cursor: 'pointer',
  color: props.theme.colors.radix.highContrast,

  '&:focus': {
    outline: 'none',
    backgroundColor: props.theme.colors.radix.gray4,
  },

  '&[data-disabled]': {
    cursor: 'default',
    color: props.theme.colors.radix.gray9,
  },
});

export const DropdownMenuItem = styled(DropdownMenuPrimitive.Item)(menuItemCss);

const StyledDropdownMenuTriggerItem = styled(DropdownMenuPrimitive.TriggerItem)(menuItemCss);
const StyledDropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem)(menuItemCss, {
  paddingLeft: 24,
});
const StyledDropdownMenuCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)(menuItemCss, {
  paddingLeft: 24,
});

export const DropdownMenuItemRightAdornment = styled.div((props) => ({
  marginLeft: 'auto',
  paddingLeft: 16,
  color: props.theme.colors.radix.gray11,
  '*:focus > &': { color: 'white' },
  '[data-disabled] &': { color: props.theme.colors.radix.gray8 },
}));

export const DropdownMenuItemLeftAdornment = styled.div((props) => ({
  paddingRight: 8,
  color: props.theme.colors.radix.gray11,
  '*:focus > &': { color: 'white' },
  '[data-disabled] &': { color: props.theme.colors.radix.gray8 },
}));

export const DropdownMenuRadioItem = React.forwardRef((
  { children, ...props }: DropdownMenuPrimitive.DropdownMenuRadioItemProps,
  ref: React.ForwardedRef<React.ElementRef<typeof StyledDropdownMenuRadioItem>>,
) => (
  <StyledDropdownMenuRadioItem {...props} ref={ref}>
    <Box component="span" position="absolute" left={1}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Flex alignItems="center" justifyContent="center" width={12} height={12}>
          <RiCheckboxBlankCircleFill size={8} />
        </Flex>
      </DropdownMenuPrimitive.ItemIndicator>
    </Box>
    {children}
  </StyledDropdownMenuRadioItem>
));

export const DropdownMenuCheckboxItem = React.forwardRef((
  { children, ...props }: DropdownMenuPrimitive.DropdownMenuCheckboxItemProps,
  ref: React.ForwardedRef<React.ElementRef<typeof StyledDropdownMenuCheckboxItem>>,
) => (
  <StyledDropdownMenuCheckboxItem {...props} ref={ref}>
    <Box component="span" position="absolute" left={1}>
      <DropdownMenuPrimitive.ItemIndicator>
        <Flex alignItems="center" justifyContent="center" width={12} height={12}>
          <RiCheckLine />
        </Flex>
      </DropdownMenuPrimitive.ItemIndicator>
    </Box>
    {children}
  </StyledDropdownMenuCheckboxItem>
));

export const DropdownMenuTriggerItem = React.forwardRef((
  { children, ...props }: DropdownMenuPrimitive.DropdownMenuTriggerItemProps,
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
  DropdownMenuTriggerItem as TriggerItem,
  DropdownMenuItemLeftAdornment as LeftAdornment,
  DropdownMenuItemRightAdornment as RightAdornment,
};
