import { DefaultTheme } from 'styled-components';

export const text = {
  primary: '#ffffff',
  secondary: 'rgba(255, 255, 255, 0.54)',
  disabled: 'rgba(255, 255, 255, 0.38)',
};

export const background = {
  primary: '#333333',
  secondary: '#f2ecff',
};

export const status = {
  success: '#56c15a',
  info: '#90caf9',
  warning: '#ff9800',
  error: '#f94437',
};

export const greyscale = {
  dark: '#1c1c20',
  medium: '#c0c8da',
  light: '#d8deec',
  lighter: '#f2f2f2',
};

export const brand = {
  primary: '#845ec2',
  secondary: '#00c9a7',
  tea: '#c4fcef',
};

export const action = {
  active: 'rgba(0, 0, 0, 0.54)',
  hover: 'rgba(0, 0, 0, 0.04)',
  hoverOpacity: 0.04,
  selected: 'rgba(0, 0, 0, 0.08)',
  selectedOpacity: 0.08,
  disabled: 'rgba(0, 0, 0, 0.26)',
  disabledBackground: 'rgba(0, 0, 0, 0.12)',
  disabledOpacity: 0.38,
  focus: 'rgba(0, 0, 0, 0.12)',
  focusOpacity: 0.12,
  activatedOpacity: 0.12,
};

export const divider = {
  primary: 'rgba(0, 0, 0, 0.12)',
};

export default {
  text,
  background,
  status,
  greyscale,
  action,
  brand,
  divider,
} as DefaultTheme;
