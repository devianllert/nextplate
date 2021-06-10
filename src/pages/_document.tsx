import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { InitializeColorMode } from 'theme-ui';

/**
 * XXX Is only rendered on the server side and not on the client side
 *
 * Used to inject <html lang=""> tag
 *
 * See https://github.com/vercel/next.js/#custom-document
 */
class AppDocument extends Document {
  static async getInitialProps(ctx) {
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
          <meta property="og:image" content="/images/logo-og.png" />
          <meta property="og:url" content="/" />
          <meta property="og:site_name" content="devianllert" />

          <meta name="twitter:card" content="/images/logo-og.png" />
          <meta name="twitter:image:alt" content="Image description" />

          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
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
