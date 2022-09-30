import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from 'next/document';

import { getCommonMetaTags } from '@/shared/lib/meta';
import { staticPath } from '@/shared/lib/$path';

/**
 * Note: Is only rendered on the server side and not on the client side
 *
 * Used to inject <html lang=""> tag
 *
 * See https://github.com/vercel/next.js/#custom-document
 */
class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang={this.props.locale}>
        <Head>
          {getCommonMetaTags()}
        </Head>
        <body>
          {/* this script should be synchronous */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            id="theme-mode"
            src={staticPath.static.scripts.initialize_color_mode_js}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;