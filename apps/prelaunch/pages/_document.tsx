import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html className="bg-secondary">
        <Head>
          <link
            rel="preload"
            href="/fonts/Aeonik-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body style={{ fontFamily: 'Aeonik' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
