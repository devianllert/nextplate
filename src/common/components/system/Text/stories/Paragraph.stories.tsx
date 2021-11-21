import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Paragraph, ParagraphProps } from '../Paragraph';
import { Stack } from '../../Stack';

export default {
  title: 'Design System/Atoms/Text/Paragraph',
  component: Paragraph,
} as Meta;

const Template: Story<ParagraphProps> = (args) => <Paragraph {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Paragraph',
};

export const Variants = () => (
  <Stack direction="column" space={3}>
    <Paragraph variant="body1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi quas suscipit similique? Quibusdam cumque expedita necessitatibus ipsa sed consequuntur officia facere odit, aliquam iste voluptate ratione commodi quam assumenda fugiat.
    </Paragraph>
    <Paragraph variant="body2">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio ex id a sint illo ad. Aut incidunt tempore nemo officia totam a earum, doloribus itaque iure perferendis vero fuga libero!
    </Paragraph>
    <Paragraph variant="body3">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae libero adipisci at veritatis a atque iste molestias, cum animi, nisi nam aperiam provident sunt quas obcaecati, laudantium quo! Consequatur, libero.
    </Paragraph>
  </Stack>
);

export const Colors = () => (
  <Stack direction="column" space={3}>
    <Paragraph variant="body1" color="text.secondary">Paragraph 1</Paragraph>
    <Paragraph variant="body2" color="text.disabled">Paragraph 2</Paragraph>
    <Paragraph variant="body3" color="radix.green11">Paragraph 3</Paragraph>
  </Stack>
);
