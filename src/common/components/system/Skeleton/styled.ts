import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

interface SkeletonRootProps {
  animation?: 'pulse' | 'wave' | false;
  variant?: 'text' | 'rectangular' | 'circular';
  height?: number | string;
  width?: number | string;
  hasChildren?: boolean;
}

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

export const SkeletonRoot = styled.span<SkeletonRootProps>`
  display: block;

  height: 18px;

  background-color: ${({ theme }) => theme.colors.radix.contrast7};

  ${({ variant = 'text' }) => ({
    text: `
      margin-top: 0;
      margin-bottom: 0;
      height: auto;
      transform-origin: 0 55%;
      transform: scale(1, 0.60);
      border-radius: 4px;
      &:empty:before {
        content: "\\00a0";
      }
    `,
    rectangular: '',
    circular: `
      border-radius: 50%;
    `,
  })[variant]}

  ${({ hasChildren }) => hasChildren && `
    & > * {
      visibility: hidden;
    }
  `}

  ${({ hasChildren, width }) => hasChildren && !width && `
    max-width: fit-content;
  `}

  ${({ hasChildren, height }) => hasChildren && !height && `
    height: auto;
  `}

  ${({ animation = 'pulse' }) => {
    if (!animation) return '';

    return ({
      pulse: css`
        animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
      `,
      wave: css`
        position: relative;
        overflow: hidden;

        /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
        -webkit-mask-image: -webkit-radial-gradient(white, black);

        &::after {
          content: "";
          /* Avoid flash during server-side hydration */
          transform: translateX(-100%);
          animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          z-index: 1;
        }
      `,
    })[animation];
  }}
`;
