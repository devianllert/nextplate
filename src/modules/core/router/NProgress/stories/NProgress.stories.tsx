import * as React from 'react';
import NProgress from 'nprogress';
import { Story, Meta } from '@storybook/react';

import { NProgressRoot, NProgressRootProps } from '../NProgress';

export default {
  title: 'Components/Nprogress',
  component: NProgressRoot,
} as Meta;

const Template: Story<NProgressRootProps> = (args) => {
  NProgress.start();

  return <NProgressRoot {...args} />;
};

export const Basic = Template.bind({});
