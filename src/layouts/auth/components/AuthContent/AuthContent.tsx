import * as React from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Box } from '@/common/components/system/Box';
import { Container } from '@/common/components/system/Container';

import { duration } from '@/common/design/tokens/transitions';

import * as S from './styled';

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

export const AuthContent = (props: AuthContentProps): JSX.Element => {
  const {
    children,
  } = props;

  const router = useRouter();

  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <S.Content>
      <Container>
        <AnimatePresence exitBeforeEnter initial={false}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            component={motion.div}
            key={router.route}
            variants={variants}
            initial={shouldReduceMotion ? 'enter' : 'hidden'}
            animate={shouldReduceMotion ? 'enter' : 'enter'}
            exit={shouldReduceMotion ? 'enter' : 'exit'}
            transition={shouldReduceMotion ? { duration: 0 } : variants.transition}
          >
            {children}
          </Box>
        </AnimatePresence>
      </Container>
    </S.Content>
  );
};
