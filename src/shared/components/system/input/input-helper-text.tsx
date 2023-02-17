import styled from '@emotion/styled';

import { createTransition, duration } from '@/shared/design/tokens/transitions';
import { fontWeight } from '@/shared/design/tokens/typography';

export const InputHelperText = styled.p((props) => ({
  fontWeight: fontWeight.normal,
  fontSize: props.theme.fontSizes.xs,
  transition: createTransition('color', { duration: duration.short }),
  lineHeight: 1.66,
  textAlign: 'left',
  margin: '4px 8px 0',
}));
