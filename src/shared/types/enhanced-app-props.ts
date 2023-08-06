import { AppProps } from 'next/app';

import { EnhancedNextPage } from '@/shared/types/enhanced-next-page';
import { UniversalPageProps } from '@/shared/types/universal-page-props';

/**
 * Props that are provided to the render function of the application (in _app)
 * Those props can be consolidated by either getInitialProps, getServerProps or getStaticProps, depending on the page and its configuration
 */
export type EnhancedAppProps<PP extends UniversalPageProps = UniversalPageProps> = AppProps<PP> & {
  Component: EnhancedNextPage;
  err?: Error;
};
