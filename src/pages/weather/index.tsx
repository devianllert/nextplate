import React from 'react';
import { useRouter } from 'next/router';
import { RiMapPinLine, RiSearchLine } from 'react-icons/ri';

import { createLogger } from '@/shared/lib/logging/logger';
import * as Text from '@/shared/components/system/text';
import { Box } from '@/shared/components/layout/box';
import { Input, InputAdornment } from '@/shared/components/system/input';
import { IconButton } from '@/shared/components/system/icon-button';
import { PageSEO } from '@/shared/lib/meta/page-seo';
import { WeatherLayout } from '@/layouts/weather';
import { getTranslationsStaticProps } from '@/layouts/core/ssg';
import { EnhancedNextPage } from '@/layouts/core/types/enhanced-next-page';
import { SSRPageProps } from '@/layouts/core/types/ssr-page-props';
import { SSGPageProps } from '@/layouts/core/types/ssg-page-props';
import { OnlyBrowserPageProps } from '@/layouts/core/types/only-browser-page-props';

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
