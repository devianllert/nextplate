import styled from '@emotion/styled';
import { ButtonBase } from '@effable/react';

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
  color: props.theme.colors.text.primary,
  backgroundColor: props.theme.colors.background.primary,
  border: '1px solid',
  borderColor: props.theme.colors.radix.gray7,

  '&:hover': {
    background: props.theme.colors.radix.gray3,
  },

  '&:active': {
    background: props.theme.colors.radix.gray4,
  },
}));
