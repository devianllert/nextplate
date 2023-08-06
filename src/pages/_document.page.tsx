import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { InitializeColorMode } from '@effable/react';

import { CommonMetaTags } from '@/shared/lib/meta';

/**
 * Note: Is only rendered on the server side and not on the client side
 *
 * Used to inject <html lang=""> tag and default meta tags
 *
 * See https://github.com/vercel/next.js/#custom-document
 */
class NextplateDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang={this.props.locale}>
        <Head>
          <CommonMetaTags />
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

export default NextplateDocument;
