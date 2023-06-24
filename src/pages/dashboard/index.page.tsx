import { Avatar, Box, Button, Container, Heading, Stack, Text } from '@effable/react';
import { format } from 'date-fns';
import { allSettled, serialize } from 'effector';
import { useUnit } from 'effector-react';
import { RiComputerLine, RiUserShared2Line } from 'react-icons/ri';

import { forceLogout } from '@/entities/auth';
import { sessionQuery } from '@/entities/session';
import { userQuery } from '@/entities/user';

import { EFFECTOR_STATE_KEY } from '@/shared/lib/effector';
import { getTranslationsConfig } from '@/shared/lib/i18n/translations';
import { normalizeSSRContext } from '@/shared/lib/next/context';
import { withAuthenticatedSSP } from '@/shared/lib/ssr';

import { dashboardPageStarted } from './model';

const DashboardPage = () => {
  const { user, update, loading, sessions, logout } = useUnit({
    user: userQuery.$data,
    update: userQuery.start,
    loading: userQuery.$pending,
    sessions: sessionQuery.$data,
    logout: forceLogout,
  });

  return (
    <Box>
      <Box>
        <Box height="240px" backgroundColor="accent.accent6" />

        <Box>
          <Container>
            <Box display="flex" paddingY={3}>
              <Box mt="-48px">
                <Avatar size="15x" alt="some alt" fallback={user?.username.charAt(0)} />
              </Box>

              <Box ml={4}>
                <Heading variant="h6">{user?.username}</Heading>
                <Text variant="m" color="text.secondary">
                  {user?.email}
                </Text>
              </Box>

              <Box ml="auto">
                <Stack space="3x" direction="row">
                  <Button startIcon={<RiUserShared2Line />}>Share</Button>
                  <Button>View profile</Button>
                  <Button color="error" onClick={logout}>
                    logout
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      <Box>
        <Container>
          <Box>
            <Heading variant="h6">Where you are logged in</Heading>
            <Text variant="xs" color="text.secondary">
              We’ll alert you via {user?.email} if there is any unusual activity on your account.
            </Text>

            <Box mt={4}>
              <Stack space="2x" direction="column">
                {sessions?.map((session) => (
                  <Box key={session.id} display="flex" pt={2} pb={3} borderBottom="1px solid">
                    <Box mr={2}>
                      <RiComputerLine size={28} />
                    </Box>
                    <Box display="flex" flexDirection="column">
                      <Text variant="s">
                        {session.os} {session.browser}
                      </Text>
                      <Text variant="xs" color="text.secondary">
                        {session.ip} • {format(new Date(session.updatedAt), "M MMM 'at' HH:mm")}
                      </Text>
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

export const getServerSideProps = withAuthenticatedSSP(async (context, scope) => {
  await allSettled(dashboardPageStarted, { scope, params: normalizeSSRContext(context) });

  return {
    props: {
      [EFFECTOR_STATE_KEY]: serialize(scope),
      ...(await getTranslationsConfig(context)),
    },
  };
});

export default DashboardPage;
