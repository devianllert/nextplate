import * as React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import * as S from './styled';

interface AuthContentProps {
  /**
   * The content
   */
  children: React.ReactNode;
}

const AnimContainer = styled.div({
  zIndex: 0,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 420,
  width: '100%',
  height: 320,
});

const blob = keyframes({
  '0%': {
    transform: 'translate(0, 0) scale(1)',
  },
  '33%': {
    transform: 'translate(30px, -50px) scale(1.1)',
  },
  '66%': {
    transform: 'translate(-30px, 50px) scale(0.9)',
  },
  '100%': {
    transform: 'translate(0, 0) scale(1)',
  },
});

interface ShapeProps {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  color?: string;
  delay?: string;
}

const Shape = styled.div<ShapeProps>((props) => ({
  position: 'absolute',
  top: props.top,
  left: props.left,
  right: props.right,
  bottom: props.bottom,
  width: 240,
  height: 240,
  background: props.color,
  opacity: 0.5,
  borderRadius: '50%',
  mixBlendMode: 'multiply',
  filter: 'blur(24px)',
  animation: `${blob} 7s infinite`,
  animationDelay: props.delay,
}));

export const AuthContent = (props: AuthContentProps): JSX.Element => {
  const {
    children,
  } = props;

  return (
    <S.Content>
      <AnimContainer>
        <Shape top={0} left={0} color="purple" />
        <Shape top={0} right={-24} color="yellow" delay="2s" />
        <Shape bottom={24} left={128} color="red" delay="4s" />
      </AnimContainer>

      {children}
    </S.Content>
  );
};
