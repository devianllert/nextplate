import styled, { CSSProperties } from 'styled-components';

export interface InlineRootProps {
  marginLeft: number;
  marginTop: number;
  alignY: CSSProperties['alignItems'];
}

export const InlineRoot = styled.div<InlineRootProps>((props) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: props.alignY,

  marginLeft: -props.marginLeft,

  '& > *': {
    marginTop: props.marginTop,
    marginLeft: props.marginLeft,
  },
}));

export interface InlineRootAlignerProps {
  space: number;
}

export const InlineRootAligner = styled.div<InlineRootAlignerProps>((props) => ({
  padding: 0,
  paddingTop: 1,
  margin: 0,
  border: 0,
  boxSizing: 'border-box',
  verticalAlign: 'baseline',
  '-webkit-tap-highlight-color': 'transparent',

  '&:before': {
    content: '""',
    display: 'block',
    marginTop: -props.space - 1,
  },
}));
