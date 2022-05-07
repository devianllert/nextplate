import styled from '@emotion/styled';

const kbdSizes = {
  small: {
    borderRadius: 2,
    paddingLeft: 4,
    paddingRight: 4,
    height: 16,
    minWidth: 16,
    fontSize: 12,
    lineHeight: '16px',
  },
  medium: {
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    height: 24,
    minWidth: 24,
    fontSize: 14,
    lineHeight: '24px',
  },
};

export const KbdRoot = styled.kbd<{ size: 'small' | 'medium' }>((props) => ({
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: props.theme.colors.radix.lowContrast,
  flexShrink: 0,
  color: props.theme.colors.radix.highContrast,
  userSelect: 'none',
  cursor: 'default',
  whiteSpace: 'nowrap',
  textShadow: '0 0 1px rgba(255, 255, 255, 0.5)',
  fontFamily: 'inherit',
  fontWeight: 400,
  marginLeft: 2,
  marginRight: 2,
  boxShadow: `
    inset 0 0.5px rgba(255, 255, 255, 0.1),
    inset 0 1px 5px ${props.theme.colors.radix.gray2},
    0px 0px 0px 0.5px ${props.theme.colors.radix.gray8},
    0px 2px 1px -1px ${props.theme.colors.radix.gray8},
    0 1px ${props.theme.colors.radix.gray8}`,
  ...kbdSizes[props.size],
}));
