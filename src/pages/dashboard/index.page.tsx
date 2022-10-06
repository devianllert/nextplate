import { GetServerSideProps } from 'next';
import { allSettled, fork, serialize } from 'effector';
import { useUnit } from 'effector-react/scope';
import decode from 'jwt-decode';
import { RiComputerLine, RiUserShared2Line } from 'react-icons/ri';
import { format } from 'date-fns';

import { Box } from '@/shared/components/system/box';
import { Text } from '@/shared/components/system/text';
import { Button } from '@/shared/components/system/button';
import { Container } from '@/shared/components/system/container';
import { Stack } from '@/shared/components/system/stack';

import { $token, setCookiesForRequest } from '@/shared/api/request/request';
import { EFFECTOR_STATE_KEY } from '@/shared/lib/effector/scope';
import { userQuery } from '@/entities/user';
import { sessionQuery } from '@/entities/session';
import { refreshFx, forceLogout, TokenPayload } from '@/entities/auth';
import { normalizeSSRContext } from '@/shared/lib/next/context';

import { dashboardPageStarted } from './model';
import { getTranslationsConfig } from '@/shared/lib/i18n/translations';

const DashboardPage = () => {
  const {
    user,
    update,
    loading,
    sessions,
    logout,
  } = useUnit({
    user: userQuery.$data,
    update: userQuery.start,
    loading: userQuery.$pending,
    sessions: sessionQuery.$data,
    logout: forceLogout,
  });

  return (
    <Box>
      <Box>
        <Box height="240px" backgroundColor="radix.primaryA6" />

        <Box>
          <Container>
            <Box display="flex" paddingY={3}>
              <Box
                width="128px"
                height="128px"
                mt="-48px"
                borderRadius="50%"
                background="white"
              />

              <Box ml={4}>
                <Text.Heading variant="h6">
                  {user?.username}
                </Text.Heading>
                <Text.Paragraph variant="body3" color="text.secondary">
                  {user?.email}
                </Text.Paragraph>
              </Box>

              <Box ml="auto">
                <Stack space={3} direction="row">
                  <Button startIcon={<RiUserShared2Line />}>Share</Button>
                  <Button variant="contained">View profile</Button>
                  <Button variant="contained" onClick={update} loading={loading}>Update profile</Button>
                  <Button color="red" onClick={logout}>logout</Button>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Box>
        <Container>
          <Box>
            <Text.Heading variant="h6">Where you are logged in</Text.Heading>
            <Text.Paragraph variant="body3" color="text.secondary">We’ll alert you via {user?.email} if there is any unusual activity on your account.</Text.Paragraph>

            <Box mt={4}>
              <Stack space={2}>
                {sessions?.map((session) => (
                  <Box key={session.id} display="flex" pt={2} pb={3} borderBottom="1px solid">
                    <Box mr={2}>
                      <RiComputerLine size={28} />
                    </Box>
                    <Box>
                      <Text.Paragraph variant="body2">{session.os} {session.browser}</Text.Paragraph>
                      <Text.Paragraph variant="body3" color="text.secondary">{session.ip} • {format(new Date(session.updatedAt), "M MMM 'at' HH:mm")}</Text.Paragraph>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authToken = context.req.cookies.access_token;

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

  await allSettled(dashboardPageStarted, { scope, params: normalizeSSRContext(context) });

  return {
    props: {
      [EFFECTOR_STATE_KEY]: serialize(scope),
      ...(await getTranslationsConfig(context)),
    },
  };
};

export default DashboardPage;
