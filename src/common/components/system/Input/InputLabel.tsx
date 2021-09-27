import styled from '@emotion/styled';

import { createTransition, duration } from '@/common/design/tokens/transitions';
import { fontWeight } from '@/common/design/tokens/typography';

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
