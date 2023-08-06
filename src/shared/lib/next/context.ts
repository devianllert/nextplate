import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { NextRouter } from 'next/router';

import { PageContext, PageContextBase, StaticPageContext } from './types';

function normalizeQuery(query: ParsedUrlQuery, route: string) {
  const onlyQuery: ParsedUrlQuery = {};
  const onlyParams: ParsedUrlQuery = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [name, value] of Object.entries(query)) {
    // eslint-disable-next-line no-continue
    if (!value) continue;

    // handle catch and optional catch
    if (Array.isArray(value) && route.includes(`[...${name}]`)) {
      onlyParams[name] = value;
      // eslint-disable-next-line no-continue
      continue;
    }

    if (route.includes(`[${name}]`)) {
      onlyParams[name] = value;
      // eslint-disable-next-line no-continue
      continue;
    }

    onlyQuery[name] = value;
  }

  return {
    params: onlyParams,
    query: onlyQuery,
  };
}

function removeParamsFromQuery(query: ParsedUrlQuery, params: ParsedUrlQuery) {
  const filteredEntries = Object.entries(query).filter(([key]) => {
    const hasProperty = Object.prototype.hasOwnProperty.call(params, key);
    return !hasProperty;
  });

  return Object.fromEntries(filteredEntries);
}

function buildPathname({ req, resolvedUrl }: GetServerSidePropsContext) {
  const domain = req.headers.host;
  const protocol = req.headers.referer?.split('://')?.[0] ?? 'https';
  return `${protocol}://${domain}${resolvedUrl}`;
}

export const normalizeSSRContext = (context: GetServerSidePropsContext): PageContext => {
  const base: PageContextBase = {
    defaultLocale: context.defaultLocale,
    locale: context.locale,
    locales: context.locales,
    params: context.params ?? {},
    query: removeParamsFromQuery(context.query, context.params ?? {}),
    pathname: buildPathname(context),
  };

  return Object.defineProperties(base, {
    env: {
      value: 'server',
      enumerable: true,
    },
    req: {
      value: context.req,
      enumerable: false,
    },
    res: {
      value: context.res,
      enumerable: false,
    },
  }) as PageContext;
};

export const normalizeRouter = (router: NextRouter): PageContext => ({
  env: 'client',
  pathname: router.pathname,
  asPath: router.asPath,
  defaultLocale: router.defaultLocale,
  locale: router.locale,
  locales: router.locales,
  route: router.route,
  ...normalizeQuery(router.query, router.route),
});

export const normalizeSSGContext = (context: GetStaticPropsContext): StaticPageContext => ({
  defaultLocale: context.defaultLocale,
  locale: context.locale,
  locales: context.locales,
  params: context.params,
  preview: context.preview,
  previewData: context.previewData,
});
