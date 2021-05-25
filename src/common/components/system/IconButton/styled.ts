import styled from 'styled-components';

import { ButtonBase } from '@/components/system/ButtonBase';

export const IconButtonRoot = styled(ButtonBase)`
  flex: 0 0 auto;

  padding: 12px;

  font-size: 24px;
  text-align: center;

  border-radius: 50%;

  overflow: visible;

  color: ${({ theme }) => theme.palette.brand.primary};
`;

export const IconButtonLabel = styled.span`
  display: flex;
  align-items: inherit;
  justify-content: inherit;

  width: 100%;
`;
