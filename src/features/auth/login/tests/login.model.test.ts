import { allSettled, fork } from 'effector';

import { loginFx } from '@/entities/auth';

import { loginForm } from '../login.model';

describe('Login Model', () => {
  test('should send request after submit if form is valid', async () => {
    const loginMock = jest.fn();
    const scope = fork({
      values: new Map()
        .set(loginForm.fields.email.$value, 'test@gmail.com')
        .set(loginForm.fields.password.$value, '123456'),
      handlers: new Map().set(loginFx, async (params) => {
        await loginMock(params);
        return { data: { access: 'access', refresh: 'refresh' } };
      }),
    });

    allSettled(loginForm.submit, { scope });
    allSettled(loginForm.submit, { scope });

    expect(loginMock).toHaveBeenCalledTimes(1);
    expect(loginMock).toHaveBeenCalledWith({ email: 'test@gmail.com', password: '123456' });
  });

  test('should not send request after submit if form is invalid', async () => {
    const loginMock = jest.fn();

    const scope = fork({
      values: new Map().set(loginForm.fields.email.$value, 'test').set(loginForm.fields.password.$value, '123456'),
      handlers: new Map().set(loginFx, async (params) => {
        await loginMock(params);
        return { data: { access: 'access', refresh: 'refresh' } };
      }),
    });

    await allSettled(loginForm.submit, { scope });

    expect(loginMock).toHaveBeenCalledTimes(0);
  });

  test('should set common error after submit if server validation is invalid', async () => {
    const loginMock = jest.fn();

    const scope = fork({
      values: new Map()
        .set(loginForm.fields.email.$value, 'test@gmail.com')
        .set(loginForm.fields.password.$value, '123456'),
      handlers: new Map().set(loginFx, async (params) => {
        await loginMock(params);

        throw { code: 'CODE' };
      }),
    });

    await allSettled(loginForm.submit, { scope });

    expect(loginMock).toHaveBeenCalledTimes(1);
    expect(scope.getState(loginForm.$formErrors)).toEqual([
      {
        code: 'custom',
        message: 'CODE',
        path: [],
      },
    ]);
  });

  test('should set fields error after submit if server validation is invalid', async () => {
    const loginMock = jest.fn();

    const scope = fork({
      values: new Map()
        .set(loginForm.fields.email.$value, 'test@gmail.com')
        .set(loginForm.fields.password.$value, '123456'),
      handlers: new Map().set(loginFx, async (params) => {
        await loginMock(params);

        throw {
          errors: {
            email: ['INVALID_EMAIL'],
            password: ['INVALID_PASSWORD'],
          },
        };
      }),
    });

    await allSettled(loginForm.submit, { scope });

    expect(loginMock).toHaveBeenCalledTimes(1);
    expect(scope.getState(loginForm.fields.email.$errors)).toEqual([
      {
        code: 'custom',
        message: 'INVALID_EMAIL',
        path: [],
      },
    ]);
    expect(scope.getState(loginForm.fields.password.$errors)).toEqual([
      {
        code: 'custom',
        message: 'INVALID_PASSWORD',
        path: [],
      },
    ]);
  });
});
