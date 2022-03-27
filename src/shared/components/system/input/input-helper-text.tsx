import styled from '@emotion/styled';

import { createTransition, duration } from '@/shared/design/tokens/transitions';
import { fontWeight } from '@/shared/design/tokens/typography';

export const InputHelperText = styled.p({
  fontWeight: fontWeight.normal,
  fontSize: '1.2rem',
  transition: createTransition('color', { duration: duration.short }),
  lineHeight: 1.66,
  textAlign: 'left',
  margin: '4px 8px 0',
});
