import styled from '@emotion/styled';
import { blackA } from '@radix-ui/colors';

import { Input } from '@/shared/components/system/input';
import { InputAdornmentRoot, inputAdornmentTypography } from '@/shared/components/system/input/input-adornment';
import { Sizes } from '@/shared/design/tokens/size';
import { textOverflowStyles } from '@/shared/design/lib/text-overflow';

export const NativeSelectComponent = styled.select((props) => ({
  ...textOverflowStyles,
  height: '100%',
  paddingRight: `${inputAdornmentTypography[props.size as unknown as Exclude<Sizes, 'xsmall'>] + 12}px !important`,

  '& > option': {
    color: blackA.blackA11,
  },
}));

export const NativeSelectRoot = styled(Input)(() => ({
  [`${InputAdornmentRoot}`]: {
    position: 'absolute',
    right: 0,
    pointerEvents: 'none',
  },
}));
