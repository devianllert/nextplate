import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { RiExternalLinkLine } from 'react-icons/ri';

import { Link, LinkProps } from '../Link';
import * as Text from '../../Text';

export default {
  title: 'Design System/Atoms/Link',
  component: Link,
} as Meta;

const Template: Story<LinkProps> = (args) => <Link {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Link',
};

export const LinkInlineWithText = () => (
  <Text.Paragraph variant="body2">
    Did you know that links <Link href="123">can live inline with text</Link>
  </Text.Paragraph>
);

export const ExternalLink = () => (
  <Link href="123">
    google site <RiExternalLinkLine />
  </Link>
);
