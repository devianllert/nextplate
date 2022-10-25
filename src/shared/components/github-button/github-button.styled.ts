import styled from '@emotion/styled';
import { variants } from '@/shared/design/tokens/typography';
import { ButtonBase } from '../system/button-base';
import { createTransition, duration } from '@/shared/design/tokens/transitions';

export const GithubButtonRoot = styled(ButtonBase)((props) => ({
  ...variants.button1,
  background: props.theme.colors.radix.gray3,
  color: props.theme.colors.text.primary,
  padding: 6,
  borderRadius: 4,
  minHeight: 40,
  width: '100%',
  border: '2px solid',
  borderColor: props.theme.colors.radix.gray7,
  transition: createTransition('background', { duration: duration.shorter }),

  '&:hover': {
    background: props.theme.colors.radix.gray4,
  },
  '&:active': {
    background: props.theme.colors.radix.gray5,
  },
}));