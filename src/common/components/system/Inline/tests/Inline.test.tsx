/**
 * @jest-environment jsdom
 */

import React from 'react';

import { renderWithProviders } from '@/modules/core/testing/renderWithProviders';

import { Typography } from '../../Typography';

import { Inline } from '..';

describe('<Inline />', () => {
  it('should not render a list by default', () => {
    const { queryAllByRole } = renderWithProviders(
        <Inline space={8}>
          <Typography>1</Typography>
          <Typography>2</Typography>
          <Typography>3</Typography>
        </Inline>
    );

    expect(queryAllByRole('list').length).toBe(0);
    expect(queryAllByRole('listItem').length).toBe(0);
  });

  it('should render a valid unordered list when "component" is "ul"', () => {
    const { getByRole } = renderWithProviders(
      <Inline component="ul" space={8}>
        <Typography>1</Typography>
        <Typography>2</Typography>
        <Typography>3</Typography>
      </Inline>
    );

    const list = getByRole('list');
    expect(list.nodeName).toBe('UL');

    expect(
      Array.from(list.childNodes).map((childNode) => childNode.nodeName),
    ).toEqual(['LI', 'LI', 'LI']);
  });

  it('should render a valid ordered list when "component" is "ol"', () => {
    const { getByRole } = renderWithProviders(
      <Inline component="ol" space={8}>
        <Typography>1</Typography>
        <Typography>2</Typography>
        <Typography>3</Typography>
      </Inline>
    );

    const list = getByRole('list');
    expect(list.nodeName).toBe('OL');

    expect(
      Array.from(list.childNodes).map((childNode) => childNode.nodeName),
    ).toEqual(['LI', 'LI', 'LI']);
  });
});
