import * as React from 'react';
import { useRouter } from 'next/router';
import { Box, Container } from '@effable/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { duration } from '@/shared/design/tokens/transitions';

import * as S from './auth-content.styled';

interface AuthContentProps {
  /**
   * The content
   */
  children: React.ReactNode;
}

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { type: 'spring', bounce: 0, duration: duration.short / 1000 },
};

export const AuthContent = (props: AuthContentProps) => {
  const { children } = props;

  const router = useRouter();

  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <S.Content>
      <Container>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.route}
            variants={variants}
            initial={shouldReduceMotion ? 'enter' : 'hidden'}
            animate="enter"
            exit={shouldReduceMotion ? 'enter' : 'exit'}
            transition={shouldReduceMotion ? { duration: 0 } : variants.transition}
          >
            <Box display="flex" flexDirection="column" alignItems="center" width="100%">
              {children}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Container>
    </S.Content>
  );
};
