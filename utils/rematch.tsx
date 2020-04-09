import React from 'react'
import { RematchStore } from '@rematch2/core'

import { checkServer } from './server'
import { initializeStore } from '~/store'

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(): RematchStore<any, any> {
  // Always make a new store if server, otherwise state is shared between requests
  if (checkServer()) {
    return initializeStore()
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore()
  }
  return window[__NEXT_REDUX_STORE__]
}

export const withRematch = (App: any) => {
  return class AppWithRematch extends React.Component<any> {
    reduxStore = getOrCreateStore()
    static async getInitialProps(appContext: any) {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore()

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      }
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />
    }
  }
}
