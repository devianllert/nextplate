import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document';
import { InitializeColorMode } from 'theme-ui';

import { mediaStyles } from '@/modules/core/css-in-js/responsive';
import { getCommonMetaTags } from '@/modules/core/meta/meta';

/**
 * XXX Is only rendered on the server side and not on the client side
 *
 * Used to inject <html lang=""> tag
 *
 * See https://github.com/vercel/next.js/#custom-document
 */
class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang={this.props.locale}>
        <Head>
          {getCommonMetaTags()}

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />

          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
