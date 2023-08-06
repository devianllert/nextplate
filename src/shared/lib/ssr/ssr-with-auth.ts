import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next';
import { allSettled, fork, Scope } from 'effector';
import decode from 'jwt-decode';

import { accessToken } from '@/root/mocks/auth-mock';

// FIXME: Violates FSD boundaries
import { refreshFx } from '@/entities/auth';

import { $token, setCookiesForRequest, setToken } from '@/shared/api/request';

import { TokenPayload } from '../../api/api.generated';

export type GetServerSidePropsWithScope<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData,
> = (context: GetServerSidePropsContext<Q, D>, scope: Scope) => Promise<GetServerSidePropsResult<P>>;

export const withAuthenticatedSSP =
  (getServerSidePropsFn: GetServerSidePropsWithScope) => async (context: GetServerSidePropsContext) => {
    const authToken =
      process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' ? accessToken : context.req.cookies.access_token;

    if (!authToken) {
      return {
        redirect: {
          statusCode: 301,
          destination: '/auth/login',
        },
      };
    }

    const scope = fork({
      values: [[$token, authToken]],
    });

    await allSettled(setToken, { scope, params: authToken });
    await allSettled(setCookiesForRequest, { scope, params: context.req.headers.cookie });

    const decodedToken = decode<TokenPayload>(authToken);

    const isExpired = new Date(decodedToken.exp * 1000) < new Date();

    if (isExpired) {
      const refreshOp = await allSettled(refreshFx, { scope });

      if (refreshOp.status === 'done') {
        context.res.setHeader('Set-Cookie', [...(refreshOp.value.headers['set-cookie'] ?? [])]);
      } else {
        context.res.setHeader('Set-Cookie', [
          'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
          'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
        ]);

        return {
          redirect: {
            statusCode: 301,
            destination: '/auth/login',
          },
        };
      }
    }

    return getServerSidePropsFn(context, scope);
  };
