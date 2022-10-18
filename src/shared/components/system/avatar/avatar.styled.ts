import * as AvatarPrimitive from '@radix-ui/react-avatar';
import styled from '@emotion/styled';
import { Sizes } from '@/shared/design/tokens/size';

const avatarSizesMap: Record<Sizes, number> = {
  xsmall: 32,
  small: 32,
  medium: 48,
  large: 128,
};

const avatarFontSizesMap: Record<Sizes, number> = {
  xsmall: 14,
  small: 16,
  medium: 20,
  large: 48,
};

export const AvatarRoot = styled(AvatarPrimitive.Root)<{ size: Sizes }>((props) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: avatarSizesMap[props.size],
  height: avatarSizesMap[props.size],
  borderRadius: '100%',
  backgroundColor: props.theme.colors.radix.grayA3,
}));

export const AvatarImage = styled(AvatarPrimitive.Image)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

export const AvatarFallback = styled(AvatarPrimitive.Fallback)<{ size: Sizes }>((props) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: props.theme.colors.radix.primary11,
  fontSize: avatarFontSizesMap[props.size],
  lineHeight: 1,
}));
