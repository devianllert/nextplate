import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Caption, CaptionProps } from '../Caption';
import { Stack } from '../../../layout/Stack';

export default {
  title: 'Design System/Atoms/Text/Caption',
  component: Caption,
} as Meta;

const Template: Story<CaptionProps> = (args) => <Caption {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Caption',
};

export const Variants = () => (
  <Stack direction="column" space={3}>
    <Caption variant="caption1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quas suscipit similique? Quibusdam cumque expedita necessitatibus ipsa sed consequuntur officia facere odit, aliquam iste voluptate ratione commodi quam assumenda fugiat.
    </Caption>
    <Caption variant="caption2">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio ex id a sint illo ad. Aut incidunt tempore nemo officia totam a earum, doloribus itaque iure perferendis vero fuga libero!
    </Caption>
  </Stack>
);

export const Colors = () => (
  <Stack direction="column" space={3}>
    <Caption variant="caption1" color="text.secondary">Caption 1</Caption>
    <Caption variant="caption2" color="text.disabled">Caption 2</Caption>
  </Stack>
);
