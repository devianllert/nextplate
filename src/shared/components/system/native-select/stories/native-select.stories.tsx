import * as React from 'react';

import { Box } from '@effable/react';
import { Meta, Story } from '@storybook/react';

import { NativeSelect, NativeSelectProps } from '../native-select';

export default {
  title: 'Design System/Components/NativeSelect',
  component: NativeSelect,
} as Meta;

const Template: Story<NativeSelectProps> = (args) => <NativeSelect {...args} />;

export const Example = () => {
  const [state, setState] = React.useState('angular');

  return (
    <>
      <Box mb={3}>Favorite framework: {state}</Box>
      <Box width={90}>
        <NativeSelect value={state} onChange={(event) => setState(event.target.value)} defaultValue="angular" fullWidth>
          <option value="react">React</option>
          <option value="solid">Solid</option>
          <option value="vue">Vue</option>
          <option value="angular">Angular</option>
          <option value="svelte">Svelte</option>
        </NativeSelect>
      </Box>
    </>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  children: (
    <>
      <option>React</option>
      <option>Solid</option>
      <option>Vue</option>
      <option>Angular</option>
      <option>Svelte</option>
    </>
  ),
};
