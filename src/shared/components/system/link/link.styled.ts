import styled from '@emotion/styled';

export const LinkRoot = styled.a({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  lineHeight: 'inherit',
  textDecorationLine: 'none',
  cursor: 'pointer',

  '&:hover': {
    textDecorationLine: 'underline',
  },

  '&:focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
    outlineColor: 'currentColor',
    textDecorationLine: 'none',
  },
});
