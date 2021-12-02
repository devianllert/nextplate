import * as React from 'react';
import { Meta } from '@storybook/react';
import { RiArrowRightSLine } from 'react-icons/ri';

import * as Breadcrumbs from '../Breadcrumbs';

export default {
  title: 'Design System/Atoms/Breadcrumbs',
  component: Breadcrumbs.Root,
} as Meta;

export const Basic = (): JSX.Element => (
  <Breadcrumbs.Root>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="/123">
        Home
      </Breadcrumbs.Link>
    </Breadcrumbs.Item>

    <Breadcrumbs.Separator>/</Breadcrumbs.Separator>

    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="/123">
        Shop
      </Breadcrumbs.Link>
    </Breadcrumbs.Item>

    <Breadcrumbs.Separator>/</Breadcrumbs.Separator>

    <Breadcrumbs.Item>Product</Breadcrumbs.Item>
  </Breadcrumbs.Root>
);

export const CustomSeparators = (): JSX.Element => (
  <Breadcrumbs.Root>
    <Breadcrumbs.Item>Home</Breadcrumbs.Item>

    <Breadcrumbs.Separator>
      <RiArrowRightSLine size={16} />
    </Breadcrumbs.Separator>

    <Breadcrumbs.Item>Shop</Breadcrumbs.Item>

    <Breadcrumbs.Separator>
      <RiArrowRightSLine size={16} />
    </Breadcrumbs.Separator>

    <Breadcrumbs.Item>Product</Breadcrumbs.Item>
  </Breadcrumbs.Root>
);
