import styled from '@emotion/styled';

export const AspectRatioRoot = styled.div<{ ratio: number }>((props) => ({
  position: 'relative',
  width: '100%',
  paddingBottom: `${100 / props.ratio}%`,
}));

export const AspectRatioChild = styled.div({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});
