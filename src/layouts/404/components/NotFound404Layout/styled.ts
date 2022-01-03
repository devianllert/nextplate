import styled from '@emotion/styled';

export const LayoutRoot = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundImage: `
    radial-gradient(circle at 45% 60%, ${props.theme.colors.radix.primaryA4}, rgba(255, 255, 255, 0) 35%),
    radial-gradient(circle at 55% 40%, ${props.theme.colors.radix.secondaryA4}, rgba(255, 255, 255, 0) 35%)
  `,
}));
