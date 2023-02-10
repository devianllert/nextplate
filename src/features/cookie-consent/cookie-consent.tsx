import {
  DisplayOnBrowserMount,
  Box,
  Button,
  Link,
  Text,
} from '@effable/react';
import { useTranslation, Trans } from 'next-i18next';
import { useUnit } from 'effector-react/scope';

import { Portal } from '@/shared/components/system/portal';
import shape from '@/shared/design/tokens/shape';
import shadows from '@/shared/design/tokens/shadows';

import { $isCookieAllowed, cookieAllowed } from './cookie-consent.model';

export const CookieConsent = () => {
  const { t } = useTranslation('common');

  const [isAllowed, allowCookies] = useUnit([$isCookieAllowed, cookieAllowed]);

  if (isAllowed) return null;

  return (
    <DisplayOnBrowserMount>
      <Portal>
        <Box
          position="fixed"
          bottom={3}
          left={3}
        >
          <Box
            padding={3}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            borderRadius={shape.round}
            backgroundColor="background.secondary"
            maxWidth={320}
            boxShadow={shadows[4]}
          >
            <Text variant="s" sx={{ mb: 2 }}>
              <Trans t={t} i18nKey="COOKIE_CONSENT_TITLE" components={[<Link target="_blank" href="https://www.cookiesandyou.com" />]} />
            </Text>

            <Button variant="secondary" size="small" onClick={allowCookies}>{t('COOKIE_CONSENT_ACTION')}</Button>
          </Box>
        </Box>
      </Portal>
    </DisplayOnBrowserMount>
  );
};
