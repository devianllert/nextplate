/**
 * @jest-environment jsdom
 */

import React from 'react';

import { renderWithProviders } from '@/modules/core/testing/renderWithProviders';

import * as Text from '../../Text';

import { Stack } from '..';

describe('<Stack />', () => {
  it('should not render a list by default', () => {
    const { queryAllByRole } = renderWithProviders(
        <Stack space={8}>
          <Text.Paragraph>1</Text.Paragraph>
          <Text.Paragraph>2</Text.Paragraph>
          <Text.Paragraph>3</Text.Paragraph>
        </Stack>
    );

    expect(queryAllByRole('list').length).toBe(0);
    expect(queryAllByRole('listItem').length).toBe(0);
  });

  it('should render a valid unordered list when "component" is "ul"', () => {
    const { getByRole } = renderWithProviders(
      <Stack component="ul" space={8}>
        <Text.Paragraph>1</Text.Paragraph>
        <Text.Paragraph>2</Text.Paragraph>
        <Text.Paragraph>3</Text.Paragraph>
      </Stack>
    );

    const list = getByRole('list');
    expect(list.nodeName).toBe('UL');

    expect(
      Array.from(list.childNodes).map((childNode) => childNode.nodeName),
    ).toEqual(['LI', 'LI', 'LI']);
  });

  it('should render a valid ordered list when "component" is "ol"', () => {
    const { getByRole } = renderWithProviders(
      <Stack component="ol" space={8}>
        <Text.Paragraph>1</Text.Paragraph>
        <Text.Paragraph>2</Text.Paragraph>
        <Text.Paragraph>3</Text.Paragraph>
      </Stack>
    );

    const list = getByRole('list');
    expect(list.nodeName).toBe('OL');

    expect(
      Array.from(list.childNodes).map((childNode) => childNode.nodeName),
    ).toEqual(['LI', 'LI', 'LI']);
  });
});
