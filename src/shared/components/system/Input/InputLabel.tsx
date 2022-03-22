import styled from '@emotion/styled';

import { createTransition, duration } from '@/shared/design/tokens/transitions';
import { fontWeight } from '@/shared/design/tokens/typography';

export const InputLabel = styled.label({
  fontWeight: fontWeight.medium,
  fontSize: '1.4rem',
  transition: createTransition('color', { duration: duration.short }),
  display: 'inline-block',
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal',
});
