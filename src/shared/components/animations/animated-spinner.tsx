import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { IconBaseProps } from 'react-icons';
import { RiLoader4Line } from 'react-icons/ri';

export type AnimatedSpinnerProps = IconBaseProps;

const spinKeyframe = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },

  '100%': {
    transform: 'rotate(360deg)',
  },
});

const AnimatedIcon = styled(RiLoader4Line)({
  animationName: `${spinKeyframe}`,
  animationDuration: '500ms',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
});

export const AnimatedSpinner = (props: AnimatedSpinnerProps) => {
  return (
    <AnimatedIcon fontSize={32} {...props} />
  );
};
