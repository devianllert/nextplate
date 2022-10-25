import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { GithubButton, GithubButtonProps } from '../github-button';

export default {
  title: 'GithubButton',
  component: GithubButton,
} as Meta;

const Template: Story<GithubButtonProps> = (args) => <GithubButton {...args} />;

export const Basic = Template.bind({});
