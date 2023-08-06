import * as React from 'react';
import { Box, Container, DisplayOnBrowserMount, Text } from '@effable/react';
import { useTranslation } from 'next-i18next';
import Timeago from 'timeago-react';
import { register } from 'timeago.js';
import ru from 'timeago.js/lib/lang/ru';

register('ru', ru);

export const MainFooter = () => {
  const { t, i18n } = useTranslation('common');

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
      borderTop="1px solid"
      borderColor="accent.accent5"
      marginTop="auto"
    >
      <Container>
        <Box
          display="flex"
          flexDirection={{ base: 'column', tablet: 'row' }}
          paddingY="32px"
          justifyContent="space-between"
          alignItems={{ base: 'flex-start', tablet: 'center' }}
          width="100%"
          gridGap="4x"
        >
          <Text variant="s" color="text.secondary">
            Copyright © {new Date().getFullYear()} devianllert
          </Text>

          <DisplayOnBrowserMount>
            <Text variant="s" color="text.secondary">
              v{process.env.NEXT_PUBLIC_APP_VERSION}
              {' • '}
              {t('LAST_UPDATE')} <Timeago datetime={process.env.NEXT_PUBLIC_BUILD_TIME} locale={i18n.language} />
            </Text>
          </DisplayOnBrowserMount>
        </Box>
      </Container>
    </Box>
  );
};
