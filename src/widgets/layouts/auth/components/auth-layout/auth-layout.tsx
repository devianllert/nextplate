import * as React from 'react';
import Image from 'next/image';
import { Box } from '@effable/react';
import { motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';

import { AuthContent } from '../auth-content';
import { AuthHeader } from '../auth-header';

interface AuthLayoutProps {
  /**
   * The content
   */
  children?: React.ReactNode;
}

export const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props;

  const shouldReduceMotion = useReducedMotion() ?? false;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, (value) => value / 100);
  const rotateY = useTransform(x, (value) => value / 100);

  const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    x.set(rect.width / 2 - event.clientX);
    y.set(rect.height / 2 - event.clientY);
  };

  return (
    <Box
      component={motion.div}
      display="grid"
      gridTemplateColumns="repeat(12, minmax(0, 1fr))"
      minHeight="100vh"
      onMouseMove={handleMouse}
    >
      <Box display="flex" flexDirection="column" gridColumn={['span 12', null, 'span 5']}>
        <AuthHeader />

        <AuthContent>{children}</AuthContent>
      </Box>

      <Box gridColumn="span 7" display={['none', null, 'flex']} overflow="hidden">
        <Box
          width="100%"
          component={motion.div}
          position="relative"
          style={{
            y: shouldReduceMotion ? 0 : rotateX,
            x: shouldReduceMotion ? 0 : rotateY,
            scale: shouldReduceMotion ? 1 : 1.05,
          }}
        >
          <Box
            component={Image}
            src="https://images.unsplash.com/photo-1604604994333-f1b0e9471186"
            priority
            fill
            alt="123"
            style={{
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
