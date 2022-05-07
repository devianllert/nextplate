import styled from '@emotion/styled';

export const CodeRoot = styled.code((props) => ({
  fontFamily: 'Söhne Mono, menlo, monospace',
  fontSize: 'max(12px, 85%)',
  whiteSpace: 'nowrap',
  padding: '0 3px 2px 3px',
  backgroundColor: props.theme.colors.radix[`${props.color}3`],
  color: props.theme.colors.radix[`${props.color}11`],
}));
