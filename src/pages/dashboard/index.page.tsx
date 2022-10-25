import { allSettled, serialize } from 'effector';
import { useUnit } from 'effector-react/scope';
import { RiComputerLine, RiUserShared2Line } from 'react-icons/ri';
import { format } from 'date-fns';

import { Box } from '@/shared/components/system/box';
import { Text } from '@/shared/components/system/text';
import { Button } from '@/shared/components/system/button';
import { Container } from '@/shared/components/system/container';
import { Stack } from '@/shared/components/system/stack';

import { EFFECTOR_STATE_KEY } from '@/shared/lib/effector/scope';
import { userQuery } from '@/entities/user';
import { sessionQuery } from '@/entities/session';
import { forceLogout } from '@/entities/auth';
import { normalizeSSRContext } from '@/shared/lib/next/context';

import { dashboardPageStarted } from './model';
import { getTranslationsConfig } from '@/shared/lib/i18n/translations';
import { withAuthenticatedSSP } from '@/shared/lib/ssr';
import { Avatar } from '@/shared/components/system/avatar';

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
                mt="-48px"
              >
                <Avatar
                  size="large"
                  alt="some alt"
                  fallback="D"
                />
              </Box>

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
