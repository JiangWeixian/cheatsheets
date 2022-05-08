import App from 'next/app'
import React from 'react'
import Progress from 'nprogress'
import Router from 'next/router'
import { cheatSheetGlobalStyles } from '~/style/global'
import { ThemeProvider } from 'mayumi/theme'

import '~/style/nprogress.css'
import '~/style/github.css'
import '~/style/one-dark.css'
import '~/style/icons.css'

Router.events.on('routeChangeStart', () => Progress.start())
Router.events.on('routeChangeComplete', () => Progress.done())
Router.events.on('routeChangeError', () => Progress.done())

class CustomApp extends App {
  render() {
    cheatSheetGlobalStyles()
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

export default CustomApp
