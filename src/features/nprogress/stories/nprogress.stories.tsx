import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import NProgress from 'nprogress';

import { NProgressRoot, NProgressRootProps } from '../nprogress';

export default {
  title: 'Components/Nprogress',
  component: NProgressRoot,
} as Meta;

const Template: Story<NProgressRootProps> = (args) => {
  NProgress.start();

  return <NProgressRoot {...args} />;
};

export const Basic = Template.bind({});
