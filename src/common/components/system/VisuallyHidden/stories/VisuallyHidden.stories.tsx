import React from 'react';
import { Meta } from '@storybook/react';

import { VisuallyHidden } from '../VisuallyHidden';

export default {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
} as Meta;

export const Basic = (): JSX.Element => (
  <button type="button">
    <VisuallyHidden>Save</VisuallyHidden>
    <span aria-hidden>💾</span>
  </button>
);
