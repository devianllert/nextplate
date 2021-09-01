import styled from '@emotion/styled';

export const DividerRoot = styled.hr<{ space: number }>((props) => ({
  boxSizing: 'border-box',
  color: props.theme.colors.text.disabled,
  width: '100%',
  margin: `${props.space}px 0`,
  border: 0,
  borderBottom: '1px solid',
  borderColor: props.theme.colors.text.disabled,
}));
