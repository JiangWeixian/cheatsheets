import type { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import Progress from 'nprogress'
import Router, { useRouter } from 'next/router'
import { cheatSheetGlobalStyles } from '~/style/global'
import { ThemeProvider } from 'mayumi/theme'
import { pageview } from '~/utils/gtag'

import '~/style/nprogress.css'
import '~/style/github.css'
import '~/style/one-dark.css'
import '~/style/icons.css'

Router.events.on('routeChangeStart', () => Progress.start())
Router.events.on('routeChangeComplete', () => Progress.done())
Router.events.on('routeChangeError', () => Progress.done())

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  })
  cheatSheetGlobalStyles()
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default CustomApp
