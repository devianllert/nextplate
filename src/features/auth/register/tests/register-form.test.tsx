/**
 * @jest-environment jsdom
 */

import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fork, Scope } from 'effector';

import { registerFx } from '@/entities/auth';

import { renderWithProviders } from '@/shared/lib/testing/render-with-providers';

import { RegisterForm } from '../register-form';

describe('Register Form', () => {
  test('should send request after submit', async () => {
    const registerFxMock = jest.fn();

    const scope = fork({
      handlers: new Map().set(registerFx, registerFxMock),
    });

    renderWithProviders(<RegisterForm />, scope);

    const emailField = screen.getByPlaceholderText('EMAIL_PLACEHOLDER');
    const usernameField = screen.getByPlaceholderText('USERNAME_PLACEHOLDER');
    const passwordField = screen.getByPlaceholderText('PASSWORD_PLACEHOLDER');
    const loginButton = screen.getByRole('button', { name: 'SIGNUP' });

    await act(async () => {
      await userEvent.type(emailField, 'test@gmail.com');
      await userEvent.type(usernameField, 'test');
      await userEvent.type(passwordField, '123456');
    });

    expect(emailField).toHaveValue('test@gmail.com');
    expect(usernameField).toHaveValue('test');
    expect(passwordField).toHaveValue('123456');

    await act(async () => {
      await userEvent.click(loginButton);
    });

    expect(registerFxMock).toHaveBeenCalledTimes(1);
    expect(registerFxMock).toHaveBeenCalledWith({ email: 'test@gmail.com', username: 'test', password: '123456' });
  });
});
