import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { getCssText } from 'mayumi/theme'
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Fira+Code&display=swap"
            rel="stylesheet"
          />
          <link
            rel="search"
            href="/open-search.xml"
            title="Search CheatSheets"
            type="application/opensearchdescription+xml"
          />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨🏿‍💻</text></svg>"
          />
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
        </Head>
        <body>
          <div id="SHEET-CONTAINER" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
