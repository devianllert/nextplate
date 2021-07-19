import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { NProgressRoot, NProgressRootProps } from '../NProgress';

export default {
  title: 'Components/Nprogress',
  component: NProgressRoot,
} as Meta;

const Template: Story<NProgressRootProps> = (args) => <NProgressRoot {...args} />;
