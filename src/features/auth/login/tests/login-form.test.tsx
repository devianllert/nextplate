/**
 * @jest-environment jsdom
 */

import { fork, Scope } from 'effector';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '@/shared/lib/testing/render-with-providers';
import { loginFx } from '@/entities/auth';

import { LoginForm } from '../login-form';

describe('Login Form', () => {
  test('should send request after submit', async () => {
    const loginMock = jest.fn();

    const scope = fork({
      handlers: new Map().set(loginFx, (params) => {
        loginMock(params);
        return { data: { access: 'access', refresh: 'refresh' } };
      }),
    });

    renderWithProviders(<LoginForm />, scope);

    const emailField = screen.getByPlaceholderText('form.email.placeholder');
    const passwordField = screen.getByPlaceholderText('form.password.placeholder');
    const loginButton = screen.getByRole('button', { name: 'login' });

    await act(async () => {
      await userEvent.type(emailField, 'test@gmail.com');
      await userEvent.type(passwordField, '123456');
    });

    expect(emailField).toHaveValue('test@gmail.com');
    expect(passwordField).toHaveValue('123456');

    await act(async () => {
      await userEvent.click(loginButton);
    });

    expect(loginMock).toHaveBeenCalledTimes(1);
    expect(loginMock).toHaveBeenCalledWith({ email: 'test@gmail.com', password: '123456' });
  });
});
