/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { RunOptions } from 'axe-core';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

type UI = Parameters<typeof render>[0];

type TestA11YOptions = RenderOptions & { axeOptions?: RunOptions };

export const testA11y = async (
  ui: UI | HTMLElement,
  { axeOptions, ...options }: TestA11YOptions = {},
): Promise<void> => {
  const container = React.isValidElement(ui) ? render(ui, options).container : ui;

  // @ts-ignore
  const results = await axe(container as Element, axeOptions);

  expect(results).toHaveNoViolations();
};
