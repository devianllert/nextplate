import { GetServerSideProps } from 'next';
import { allSettled, fork, serialize } from 'effector';
import { useUnit } from 'effector-react/scope';
import decode from 'jwt-decode';

import { Box } from '@/shared/components/system/box';
import { $token, setCookiesForRequest, setToken } from '@/shared/api/request/request';
import { EFFECTOR_STATE_KEY } from '@/shared/lib/effector/scope';
import { $user, fetchUserFx, userUpdated } from '@/entities/user/user.model';
import { logoutFx, refreshFx } from '@/entities/auth/auth.model';
import { Button } from '@/shared/components/system/button';
import { TokenPayload } from '@/entities/auth/types';

const DashboardPage = () => {
  const {
    user,
    updateUser,
  } = useUnit({
    user: $user,
    updateUser: userUpdated,
  });

  return (
    <Box>
      {JSON.stringify(user)}

      <Button onClick={() => updateUser()}>fetch user</Button>
      <Button onClick={() => refreshFx()}>refresh token</Button>
      <Button onClick={() => logoutFx()}>logout</Button>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = context.req.cookies.token;

  if (!authToken) {
    return {
      redirect: {
        statusCode: 301,
        destination: '/auth/login',
      },
    };
  }

  const scope = fork({
    values: [
      [$token, authToken],
    ],
  });

  await allSettled(setCookiesForRequest, { scope, params: context.req.headers.cookie });

  const decodedToken = decode<TokenPayload>(authToken);

  const isExpired = new Date(decodedToken.exp * 1000) < new Date();

  if (isExpired) {
    const refreshOp = await allSettled(refreshFx, { scope });

    if (refreshOp.status === 'done') {
      context.res.setHeader('Set-Cookie', [`token=${refreshOp.value.data.access}; path=/;`, ...(refreshOp.value.headers['set-cookie'] ?? [])]);
    } else {
      context.res.setHeader('Set-Cookie', ['token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT', 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT']);

      return {
        redirect: {
          statusCode: 301,
          destination: '/auth/login',
        },
      };
    }
  }

  await allSettled(fetchUserFx, { scope });

  return {
    props: {
      [EFFECTOR_STATE_KEY]: serialize(scope),
    },
  };
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const authToken = context.req.cookies.token;

//   if (!authToken) {
//     return {
//       redirect: {
//         statusCode: 301,
//         destination: '/auth/login',
//       },
//     };
//   }

//   const scope = fork({
//     values: [
//       [$token, authToken],
//     ],
//   });

//   const decodedToken = decode(authToken);

//   const isExpired = new Date(decodedToken.exp * 1000) < new Date();

//   if (isExpired) {
//     context.res.setHeader('Set-Cookie', 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');

//     return {
//       redirect: {
//         statusCode: 301,
//         destination: '/auth/login',
//       },
//     };
//   }

//   await allSettled(fetchUserFx, { scope });

//   return {
//     props: {
//       [EFFECTOR_STATE_KEY]: serialize(scope),
//     },
//   };
// };

export default DashboardPage;
