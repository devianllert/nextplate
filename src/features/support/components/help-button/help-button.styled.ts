import styled from '@emotion/styled';

import { ButtonBase } from '@/shared/components/system/button-base';
import shadows from '@/shared/design/tokens/shadows';
import { zIndex } from '@/shared/design/tokens/z-index';
import { createTransition, duration } from '@/shared/design/tokens/transitions';

export const HelpButtonRoot = styled(ButtonBase)((props) => ({
  position: 'fixed',
  bottom: 16,
  right: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  fontSize: 20,
  borderRadius: '50%',
  boxShadow: shadows[2],
  color: props.theme.colors.text.primary,
  backgroundColor: props.theme.colors.background.primary,
  border: '1px solid',
  borderColor: props.theme.colors.radix.gray7,
  zIndex: zIndex.tooltip,
  transition: createTransition('background', { duration: duration.short }),

  '&:hover': {
    background: props.theme.colors.radix.gray3,
  },

  '&:active': {
    background: props.theme.colors.radix.gray4,
  },
}));
