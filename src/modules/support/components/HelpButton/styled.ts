import styled from '@emotion/styled';

import { ButtonBase } from '@/common/components/system/ButtonBase';
import shadows from '@/common/design/tokens/shadows';
import { zIndex } from '@/common/design/tokens/zIndex';
import { createTransition, duration } from '@/common/design/tokens/transitions';

export const HelpButtonRoot = styled(ButtonBase)((props) => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  fontSize: 20,
  borderRadius: '50%',
  boxShadow: shadows[2],
  color: props.theme.colors.text.primary,
  background: props.theme.colors.radix.gray4,
  zIndex: zIndex.tooltip,
  transition: createTransition('background', { duration: duration.short }),

  '&:hover': {
    background: props.theme.colors.radix.gray6,
  },
}));
