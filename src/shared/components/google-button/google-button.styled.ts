import { ButtonBase, createTransition } from '@effable/react';
import styled from '@emotion/styled';

import { duration } from '@/shared/design/tokens/transitions';
import { variants } from '@/shared/design/tokens/typography';

export const GoogleButtonRoot = styled(ButtonBase)((props) => ({
  ...variants.button1,
  background: props.theme.colors.neutral.neutral3,
  color: props.theme.colors.text.primary,
  padding: 6,
  borderRadius: 4,
  minHeight: 40,
  width: '100%',
  border: '2px solid',
  borderColor: props.theme.colors.neutral.neutral7,
  transition: createTransition('background', { duration: duration.shorter }),

  '&:hover': {
    background: props.theme.colors.neutral.neutral4,
  },
  '&:active': {
    background: props.theme.colors.neutral.neutral5,
  },
}));
