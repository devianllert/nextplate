import { GetStaticProps, GetStaticPropsResult } from 'next';

import { getTranslationsConfig } from '@/shared/lib/i18n/translations';
import { SSGPageProps } from '@/shared/types/ssg-page-props';

/**
 * Returns a "getStaticProps" function.
 *
 * Meant to be avoid duplication of the `serverSideTranslations` for static pages that need translations.
 *
 * @param namespaces
 */
export const getTranslationsStaticProps = (namespaces: string[] = []): GetStaticProps<SSGPageProps> => {
  const getStaticProps: GetStaticProps<SSGPageProps> = async (props) => {
    const i18n = await getTranslationsConfig(props, namespaces);

    return {
      props: {
        isStaticRendering: true,
        _nextI18Next: i18n._nextI18Next,
      },
    };
  };

  return getStaticProps;
};
