import styled from '@emotion/styled';

export const CheckboxRoot = styled.label<{ disabled?: boolean }>((props) => ({
  cursor: props.disabled ? 'default' : 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  verticalAlign: 'top',
  position: 'relative',
  userSelect: 'none',
}));

export const CheckboxComponent = styled.input({
  border: '0px',
  clip: 'rect(0px, 0px, 0px, 0px)',
  height: '1px',
  width: '1px',
  margin: '-1px',
  padding: '0px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  position: 'absolute',
  appearance: 'none',
});

export const CheckboxMark = styled.svg();

export const CheckboxVisual = styled.span<{ checked?: boolean; disabled?: boolean }>((props) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 16,
  height: 16,
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid',
  borderColor: props.theme.colors.radix[`${props.color}10`],
  borderRadius: 2,
  marginLeft: -24,
  marginTop: 4,

  [`${CheckboxComponent}:checked + &`]: {
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

  [`${CheckboxComponent}:not(:checked) + & ${CheckboxMark}`]: {
    visibility: 'hidden',
  },
}));
