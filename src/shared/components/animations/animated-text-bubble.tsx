import * as React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const AnimatedWrapper = styled.div`
  width: 100%;
  margin-left: 20px;
`;

const levitateKeyframes = keyframes`
  @keyframes levitate {
    0% {
      transform: translateY(0px);
    }
    15% {
      transform: translateY(-4px);
    }
    30% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const AnimatedCircle = styled.circle<{ delay: number }>`
  animation: ${levitateKeyframes} 1s ease-in-out infinite;

  animation-delay: ${({ delay }) => delay}ms;
`;

export interface AnimatedTextBubbleProps {
  /**
   * Color of the dots.
   *
   * @default
   */
  fill?: string;
}

export const AnimatedTextBubble = (props: AnimatedTextBubbleProps): JSX.Element => {
  return (
    <AnimatedWrapper>
      <svg
        viewBox="0 0 33 21"
        width="50px"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      >
        <path
          d="M.009 20.194h20.743c5.257 0 9.52-4.262 9.52-9.52 0-5.257-4.262-9.52-9.52-9.52H9.529c-5.257 0-9.52 4.262-9.52 9.52v9.52z"
          fill="#000"
        />
        <AnimatedCircle cx={21.498} cy={11.796} r={2.153} delay={200} />
        <AnimatedCircle cx={14.705} cy={11.796} r={2.153} delay={100} />
        <AnimatedCircle cx={7.911} cy={11.796} r={2.153} delay={0} />
      </svg>
    </AnimatedWrapper>
  );
};
