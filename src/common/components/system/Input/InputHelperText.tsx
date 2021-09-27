import styled from '@emotion/styled';

import { createTransition, duration } from '@/common/design/tokens/transitions';
import { fontWeight } from '@/common/design/tokens/typography';

export const InputHelperText = styled.p({
  fontWeight: fontWeight.normal,
  fontSize: '1.2rem',
  transition: createTransition('color', { duration: duration.short }),
  lineHeight: 1.66,
  textAlign: 'left',
  margin: '4px 8px 0',
});
