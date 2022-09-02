import { createEffect } from 'effector';
import { api } from '@/shared/api';
import { LoginDto } from './login.dto';
import { $token, requestInternalFx } from '@/shared/api/request/request';
import { wait } from '@/shared/lib/wait';

export const loginFx = createEffect(async (values: LoginDto) => {
  const tokens = await requestInternalFx({
    method: 'POST',
    url: 'api/v1/auth/login',
    data: values,
  });

  return tokens;
});

export const refreshFx = createEffect(async () => {
  const tokens = await api<{ access: string }>({
    url: '/auth/refresh',
  });

  return tokens;
});

export const logoutFx = createEffect(async () => {
  await api({
    method: 'POST',
    url: '/auth/logout',
  });
});

// $token
//   .on(loginFx.doneData, (_, { data }) => data.access)
//   .on(refreshFx.doneData, (_, { data }) => data.access);

// getUserByCookieFx.use(async (req) => {
//   // const { data: user, token, error } = await supabase.auth.api.getUserByCookie(req);

//   // if (token) supabase.auth.setAuth(token);
//   // if (error) throwError(error.message);
//   return user;
// });

// export const $isLoggedIn = $user.map(user => user !== null)
