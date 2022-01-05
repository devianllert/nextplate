import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document';
import { InitializeColorMode } from 'theme-ui';

import darkColors from '@/common/design/themes/dark/colors';
import lightColors from '@/common/design/themes/light/colors';
import { mediaStyles } from '@/modules/core/css-in-js/responsive';

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
          <meta name="author" content="devianllert@gmail.com" />
          <meta name="description" content="Next boilerplate" />

          <meta property="og:title" content="Next boilerplate title" />
          <meta property="og:description" content="Next boilerplate description" />
          <meta property="og:image" content="/images/static/logo-og.png" />
          <meta property="og:url" content="/" />
          <meta property="og:site_name" content="devianllert" />

          <meta name="twitter:card" content="/images/static/logo-og.png" />
          <meta name="twitter:image:alt" content="Image description" />

          <meta name="theme-color" content={lightColors.radix.primary9} media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content={darkColors.radix.primary9} media="(prefers-color-scheme: dark)" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />

          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />

          <link rel="icon" href="/favicon.ico" />
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
