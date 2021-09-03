import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Skeleton, SkeletonProps } from '../Skeleton';

export default {
  title: 'Design System/Atoms/Skeleton',
  component: Skeleton,
} as Meta;

const Template: Story<SkeletonProps> = (args) => <Skeleton {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  width: 120,
  height: 18,
};

export const Card = (): JSX.Element => (
  <div>
    <Skeleton />
    <Skeleton variant="rectangular" width={240} height={60} />
    <Skeleton width="60%" />
    <Skeleton width="80%" />
    <Skeleton width="40%" />
  </div>
);
