import App from 'next/app'
import React from 'react'
import { RematchStore } from '@rematch2/core'
import '~/style/tailwind.css'
import '~/style/markdown.css'

import { withRematch } from '~/utils/rematch'
import { Provider } from 'react-redux'

class CustomApp extends App<{ reduxStore: RematchStore<any, any> }> {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRematch(CustomApp)
