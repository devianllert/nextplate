import styled from '@emotion/styled';

export const LayoutRoot = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
  backgroundImage: `
    radial-gradient(circle 500px at 40% 300px, ${props.theme.colors.radix.primary3}, #16161800),
    radial-gradient(circle 500px at 60% 400px, ${props.theme.colors.radix.secondary4}, #16161800),
    radial-gradient(circle 700px at 20% calc(40% - 100px), ${props.theme.colors.radix.secondary2}, ${props.theme.colors.radix.secondary1}, #16161800),
    radial-gradient(circle 700px at 80% calc(40% - 100px), ${props.theme.colors.radix.primary2}, ${props.theme.colors.radix.primary1}, #16161800)
  `,
}));
