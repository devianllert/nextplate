import * as React from 'react';
import { Meta, Story } from '@storybook/react';

import { ActiveLink, ActiveLinkProps } from '../active-link';

export default {
  title: 'Design System/Components/ActiveLink',
  component: ActiveLink,
} as Meta;

const StyledLink = ({ active }: { active?: boolean }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a>{active ? 'active link' : 'link'}</a>
);

const Template: Story<ActiveLinkProps> = (args) => <ActiveLink {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: <StyledLink />,
  href: '/',
};
