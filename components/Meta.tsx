/**
 * dynamic meta info
 */

import React from 'react'
import Head from 'next/head'

export type MetaProps = {
  title?: string
  description?: string
}

export const Meta = ({
  title = `Jiangweixian's Cheatsheets`,
  description = 'less to more',
}: MetaProps) => {
  return (
    <Head>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@jiangweixian" />
      <meta name="twitter:creator" content="@jiangweixian" />
      <meta name="twitter:url" content="https://jiangweixian-cheatsheets.vercel.app" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://i.loli.net/2020/04/24/skJDnlE4rUPKhFg.png" />
      <meta property="og:url" content="https://jiangweixian-cheatsheets.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content="https://i.loli.net/2020/04/24/skJDnlE4rUPKhFg.png" />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Jiangweixian's Cheatsheets" />
    </Head>
  )
}
