import App from 'next/app'
import React from 'react'
import Progress from 'nprogress'
import Router from 'next/router'
import { GlobalStyle } from '~/style/global'

import '~/style/nprogress.css'

Router.events.on('routeChangeStart', () => Progress.start())
Router.events.on('routeChangeComplete', () => Progress.done())
Router.events.on('routeChangeError', () => Progress.done())

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    )
  }
}

export default CustomApp
