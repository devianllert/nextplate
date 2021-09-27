/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { InputBase } from '../InputBase';
import { renderWithProviders } from '@/modules/core/testing/renderWithProviders';

describe('<BaseInput />', () => {
  it('should render an <input /> inside the div', () => {
    const { container } = renderWithProviders(<InputBase />);
    const input = container.querySelector('input');

    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toHaveAttribute('required');
  });

  it('should render a disabled <input />', () => {
    const { container } = renderWithProviders(<InputBase disabled />);
    const input = container.querySelector('input');

    expect(input).toHaveAttribute('disabled');
  });

  it('should accept any html component', () => {
    renderWithProviders(
      <InputBase inputComponent="span" data-testid="input-component"/>,
    );

    expect(screen.getByTestId('input-component')).toHaveProperty('nodeName', 'SPAN');
  });

  it('should be able to access the native input', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const { container } = renderWithProviders(<InputBase inputRef={inputRef} />);

    expect(inputRef.current).toEqual(container.querySelector('input'));
  });

  it('should render prefix before input', () => {
    renderWithProviders(
      <InputBase
        prefix={
          <span data-testid="prefix">
            $
          </span>
        }
      />,
    );

    expect(screen.getByTestId('prefix')).not.toEqual(null);
  });

  it('should render suffix after input', () => {
    renderWithProviders(
      <InputBase
        suffix={
          <span data-testid="suffix">
            $
          </span>
        }
      />,
    );

    expect(screen.getByTestId('suffix')).not.toEqual(null);
  });
});
