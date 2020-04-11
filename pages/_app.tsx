import App from 'next/app'
import React from 'react'
import '~/style/tailwind.css'

import { withRematch } from '~/utils/rematch'

class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Component {...pageProps} />
    )
  }
}

export default withRematch(CustomApp)
