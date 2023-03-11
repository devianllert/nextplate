import styled from '@emotion/styled';

interface StatusStyledProps {
  size?: 'medium' | 'small';
  color: string;
}

export const StatusRoot = styled.div<StatusStyledProps>((props) => ({
  borderRadius: '50%',
  flexShrink: 0,

  width: 10,
  height: 10,

  ...(props.size === 'small' && {
    width: 6,
    height: 6,
  }),

  backgroundColor: props.theme.colors[props.color][`${props.color}9`],
}));
