import { CSSProperties } from 'react';
import { ResponsiveValue, system } from 'styled-system';

export interface TransformProps {
  transform?: ResponsiveValue<CSSProperties['transform']>,
}

const config = {
  transform: true,
};

export const transform = system(config);
