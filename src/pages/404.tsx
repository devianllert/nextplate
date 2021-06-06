import { getNoneStaticProps } from '@/layouts/core/SSG';
import { GetStaticProps, NextPage } from 'next';
import { SoftPageProps } from '@/layouts/core/types/SoftPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps> = getNoneStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {} & SoftPageProps;

/**
 * "404 not found" page, doesn't support i18n
 *
 * Doesn't use "getStaticPaths" because it's not supported by Next.js "getStaticPaths can only be used with dynamic pages, not '/404'."
 *
 * XXX The "locale" cannot be resolved properly using SSG on 404 pages, because this file doesn't belong to the "/[locale]" folder and thus doesn't benefit from url rewriting
 *  Therefore, the page will be displayed based on the DEFAULT_LOCALE value and not on the actual end-user locale
 *
 * @param props
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#404-page
 */
const NotFound404Page: NextPage<Props> = (props): JSX.Element => {
  return <div>404 not found...</div>;
};

export default NotFound404Page;
