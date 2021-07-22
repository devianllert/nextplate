import * as React from 'react';
import { Meta } from '@storybook/react';

import { Breadcrumbs } from '../Breadcrumbs';

export default {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
} as Meta;

export const Basic = (): JSX.Element => <Breadcrumbs>Basic</Breadcrumbs>;
