import styled from '@emotion/styled';
import { blackA } from '@radix-ui/colors';

import { zIndex } from '@/common/design/tokens/zIndex';

export const ModalRoot = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  width: '100%',
  height: '100%',
  zIndex: zIndex.modal,
});

export const ModalContent = styled.div({
  margin: 'auto',
  zIndex: 1,
});

export const ModalOverlay = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  width: '100%',
  height: '100%',
  background: blackA.blackA9,
});
