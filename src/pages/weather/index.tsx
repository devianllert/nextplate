import React from 'react';
import { useRouter } from 'next/router';
import { RiMapPinLine, RiSearchLine } from 'react-icons/ri';

import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import { createLogger } from '@/modules/core/logging/logger';
import { EnhancedNextPage } from '@/layouts/core/types/EnhancedNextPage';
import { getTranslationsStaticProps } from '@/layouts/core/SSG';
import * as Text from '@/common/components/system/Text';
import { Box } from '@/common/components/layout/Box';
import { Input } from '@/common/components/system/Input';
import { WeatherLayout } from '@/layouts/weather/components/WeatherLayout';
import { InputAdornment } from '@/common/components/system/Input/InputAdornment';
import { IconButton } from '@/common/components/system/IconButton';
import { PageSEO } from '@/modules/core/meta/page-seo';

const logger = createLogger('Weather');

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps = getTranslationsStaticProps();

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const WeatherSearchPage: EnhancedNextPage<Props> = (): JSX.Element => {
  const router = useRouter();

  const [text, setText] = React.useState('');

  const onSearch = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!text.trim()) return;

    router.push(`/weather/${text}`) as unknown as void;
  };

  return (
    <>
      <PageSEO
        title="Weather"
        description="The right way to check the weather! This is a demo app intended to demonstrate the capabilities of this boilerplate"
        image="/static/images/apps/weather.png"
      />

      <Box
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="text.primary"
        background="linear-gradient(180deg, rgba(13,28,139,1) 0%, rgba(83,36,224,1) 65%)"
        px={2}
      >
        <Text.Heading variant="h1">Weather</Text.Heading>

        <Box
          component="form"
          maxWidth="440px"
          width="100%"
          mt={8}
          onSubmit={onSearch}
        >
          <Input
            prefix={(
              <InputAdornment position="start" disablePointerEvents>
                <RiMapPinLine />
              </InputAdornment>
            )}
            suffix={(
              <InputAdornment position="end">
                <IconButton onClick={onSearch} size="small" edge="end">
                  <RiSearchLine />
                </IconButton>
              </InputAdornment>
            )}
            color="black"
            fullWidth
            value={text}
            onChange={(event) => setText(event.currentTarget.value)}
            placeholder="City, Country"
          />
        </Box>
      </Box>
    </>
  );
};

WeatherSearchPage.Layout = WeatherLayout;

export default WeatherSearchPage;
