import { allSettled, fork } from 'effector';

import { registerFx } from '@/entities/auth';

import { registerForm } from '../register.model';

describe('Register Model', () => {
  test('should send request after submit if form is valid', async () => {
    const registerFxMock = jest.fn();
    const scope = fork({
      values: new Map()
        .set(registerForm.fields.email.$value, 'test@gmail.com')
        .set(registerForm.fields.username.$value, 'test')
        .set(registerForm.fields.password.$value, '123456'),
      handlers: new Map().set(registerFx, async (params) => {
        await registerFxMock(params);
        return {};
      }),
    });

    allSettled(registerForm.submit, { scope });
    allSettled(registerForm.submit, { scope });

    expect(registerFxMock).toHaveBeenCalledTimes(1);
    expect(registerFxMock).toHaveBeenCalledWith({ email: 'test@gmail.com', username: 'test', password: '123456' });
  });

  test('should not send request after submit if form is invalid', async () => {
    const registerFxMock = jest.fn();

    const scope = fork({
      values: new Map()
        .set(registerForm.fields.email.$value, 'test@gmail.com')
        .set(registerForm.fields.username.$value, '')
        .set(registerForm.fields.password.$value, '123456'),
      handlers: new Map().set(registerFx, registerFxMock),
    });

    await allSettled(registerForm.submit, { scope });

    expect(registerFxMock).toHaveBeenCalledTimes(0);
  });

  test('should set common error after submit if server validation is invalid', async () => {
    const registerFxMock = jest.fn();

    const scope = fork({
      values: new Map()
        .set(registerForm.fields.email.$value, 'test@gmail.com')
        .set(registerForm.fields.username.$value, 'test')
        .set(registerForm.fields.password.$value, '123456'),
      handlers: new Map().set(registerFx, async (params) => {
        await registerFxMock(params);

        throw { code: 'CODE' };
      }),
    });

    await allSettled(registerForm.submit, { scope });

    expect(registerFxMock).toHaveBeenCalledTimes(1);
    expect(scope.getState(registerForm.$formErrors)).toEqual([
      {
        code: 'custom',
        message: 'CODE',
        path: [],
      },
    ]);
  });

  test('should set fields error after submit if server validation is invalid', async () => {
    const registerFxMock = jest.fn();

    const scope = fork({
      values: new Map()
        .set(registerForm.fields.email.$value, 'test@gmail.com')
        .set(registerForm.fields.username.$value, 'test')
        .set(registerForm.fields.password.$value, '123456'),
      handlers: new Map().set(registerFx, async (params) => {
        await registerFxMock(params);

        throw {
          errors: {
            email: ['INVALID_EMAIL'],
            password: ['INVALID_PASSWORD'],
          },
        };
      }),
    });

    await allSettled(registerForm.submit, { scope });

    expect(registerFxMock).toHaveBeenCalledTimes(1);
    expect(scope.getState(registerForm.fields.email.$errors)).toEqual([
      {
        code: 'custom',
        message: 'INVALID_EMAIL',
        path: [],
      },
    ]);
    expect(scope.getState(registerForm.fields.password.$errors)).toEqual([
      {
        code: 'custom',
        message: 'INVALID_PASSWORD',
        path: [],
      },
    ]);
  });
});
