import styled from '@emotion/styled';
import { Sizes } from '@/shared/design/tokens/size';
import { getCheckboxSize } from './checkbox-base.tokens';

export const CheckboxBaseRoot = styled.div({
  position: 'relative',
});

export const CheckboxComponent = styled.input({
  border: '0px',
  cursor: 'inherit',
  position: 'absolute',
  zIndex: 1,
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  opacity: 0,
});

export const CheckboxVisual = styled.span<{ checked?: boolean; disabled?: boolean, size?: Sizes }>((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: getCheckboxSize(props.size),
  height: getCheckboxSize(props.size),
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid',
  borderColor: props.theme.colors.radix[`${props.color}10`],
  borderRadius: 2,

  [`${CheckboxComponent}:checked + &, ${CheckboxComponent}[data-indeterminate="true"] + &`]: {
    backgroundColor: props.theme.colors.radix[`${props.color}10`],
  },

  [`${CheckboxComponent}:disabled + &`]: {
    color: props.theme.colors.radix.gray11,
    borderColor: props.theme.colors.radix.gray8,
    backgroundColor: props.theme.colors.radix.gray5,
  },

  [`${CheckboxComponent}:focus + &`]: {
    boxShadow: `0 0 0 2px ${props.theme.colors.radix.gray8}`,
  },
}));
