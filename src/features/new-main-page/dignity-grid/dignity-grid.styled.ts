import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const float = keyframes`
  0% {
    transform: translateY(0)
  }

  30% {
    transform: translateY(-4px)
  }

  50% {
    transform: translateY(4px)
  }

  70% {
    transform: translateY(-4px)
  }

  100% {
    transform: translateY(0)
  }
`;

export const AnimatedBubble = styled.div<{ delay?: string; duration: string; mode?: string }>((props) => ({
  animation: `${props.duration} ${props.delay ?? '0s'} infinite ${props.mode ?? 'normal'} none running ${float}`,
}));
