import { Box, Button, Link, Portal, Text } from '@effable/react';
import { useUnit } from 'effector-react';
import { Trans, useTranslation } from 'next-i18next';

import { $isCookieAllowed, cookieAllowed } from './cookie-consent.model';

export const CookieConsent = () => {
  const { t } = useTranslation('common');

  const [isAllowed, allowCookies] = useUnit([$isCookieAllowed, cookieAllowed]);

  if (isAllowed) return null;

  return (
    <Portal>
      <Box position="fixed" bottom="3x" left="3x">
        <Box
          padding="3x"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          borderRadius="2x"
          backgroundColor="background.secondary"
          maxWidth={320}
          boxShadow="4x"
        >
          <Text variant="s" sx={{ mb: '2x' }}>
            <Trans
              t={t}
              i18nKey="COOKIE_CONSENT_TITLE"
              components={[<Link key="cookie" target="_blank" href="https://www.cookiesandyou.com" />]}
            />
          </Text>

          <Button variant="text" size="small" onClick={allowCookies}>
            {t('COOKIE_CONSENT_ACTION')}
          </Button>
        </Box>
      </Box>
    </Portal>
  );
};
