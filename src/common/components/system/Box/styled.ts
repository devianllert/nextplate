import styled from '@emotion/styled';

import { margin, padding, SpaceProps } from '@/modules/core/css-in-js/space';

export const BoxRoot = styled.div<SpaceProps>((props) => ({
  width: '100%',

  ...(margin(props)),
  ...(padding(props)),
}));
