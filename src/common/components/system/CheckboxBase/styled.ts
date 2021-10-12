import styled from '@emotion/styled';

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

export const CheckboxVisual = styled.span<{ checked?: boolean; disabled?: boolean }>((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 20,
  height: 20,
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
