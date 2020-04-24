import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Fira+Code&display=swap"
            rel="stylesheet"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@jiangweixian" />
          <meta name="twitter:creator" content="@jiangweixian" />
          <meta name="twitter:url" content="https://jiangweixian-cheatsheets.now.sh" />
          <meta name="twitter:title" content="Jiangweixian's Cheatsheets" />
          <meta name="twitter:description" content="less to more" />
          <meta name="twitter:image" content="https://i.loli.net/2020/04/24/skJDnlE4rUPKhFg.png" />
          <meta property="og:url" content="https://jiangweixian-cheatsheets.now.sh" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Jiangweixian's Cheatsheets" />
          <meta property="og:image" content="https://jiangweixian-cheatsheets.now.sh" />
          <meta property="og:description" content="less to more" />
          <meta property="og:site_name" content="Jiangweixian's Cheatsheets" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
