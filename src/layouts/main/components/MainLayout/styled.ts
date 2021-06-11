import styled from '@emotion/styled';

export const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  minHeight: '100vh',
});

export const OfflineStatusBar = styled.div((props) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  minHeight: 32,
  background: props.theme.colors.status.warning,
  padding: 8,
}));
