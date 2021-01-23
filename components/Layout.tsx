import React, { useEffect } from 'react'
import { Home, Search } from 'styled-cssgg'
import { useRouter } from 'next/router'
import Head from 'next/head'
import zoom from 'medium-zoom'
import copy from 'copy-to-clipboard'

import pkg from 'package.json'
import Github from '../assets/github.svg'
import Twitter from '../assets/twitter.svg'
import { SideBar } from './SideBar'
import { useRematch } from '@use-rematch/core'
import { useSearchIssue } from '~/hooks/use-search-issue'
import { animated } from 'react-spring'

const G = Github as any
const T = Twitter as any

type Props = {
  children?: React.ReactNode
}

const unShipProps: any = {
  enterkeyhint: 'search',
}

const Layout = ({ children }: Props) => {
  const router = useRouter()
  useEffect(() => {
    zoom(Array.prototype.slice.call(document.images), { background: 'rgba(255, 255, 255, 0.6)' })
  }, [router.asPath])
  const { handleSearch } = useSearchIssue()
  const searchTerms = useRouter().query.q as string
  useEffect(() => {
    const handleCopyCode = (e: MouseEvent) => {
      const target = e.target as any
      const type = (target.nodeName as string).toLowerCase()
      if (type === 'pre' || type === 'code') {
        const code = target.textContent
        copy(code)
      }
    }
    document.body.addEventListener('click', handleCopyCode)
    return () => document.body.removeEventListener('click', handleCopyCode)
  }, [])
  const { state, dispatch } = useRematch({
    name: 'homepage',
    state: {
      keyword: searchTerms ?? '',
      status: 'init',
    } as {
      keyword: string
      status: 'loading' | 'loaded' | 'init'
    },
    reducers: {
      setKeyword(state, keyword: string) {
        return {
          ...state,
          keyword,
        }
      },
      setStatus(state, status: 'loading' | 'loaded' | 'init') {
        return {
          ...state,
          status,
        }
      },
    },
  })
  return (
    <div className="flex bg-gray-100 lg:h-full lg:w-full">
      <Head>
        <title>jiangweixian's cheatsheet</title>
      </Head>
      <SideBar className="flex-grow-0 hidden lg:flex" />
      <div className="flex-grow h-full bg-gray-100 flex flex-col" style={{ flexBasis: 0 }}>
        <header
          className="flex-grow-0 border-b-2 shadow-sm bg-white w-full relative justify-between items-center px-8 box-border z-10 hidden lg:flex"
          style={{ flexBasis: '5rem' }}
        >
          <div className="relative flex-grow-0" style={{ flexBasis: '3rem' }}>
            <animated.div className="w-full flex items-center justify-center">
              <Search
                className="text-gray-500"
                style={{ left: '1rem', top: 0, bottom: 0, position: 'absolute', margin: 'auto' }}
              />
              <input
                value={state.keyword}
                placeholder="label or keywords"
                {...unShipProps}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    // search issues
                    handleSearch((e.target as any).value)
                  }
                }}
                onChange={e => dispatch.setKeyword(e.target.value)}
                className="placeholder-gray-400 appearance-none focus:outline-none ml-10 w-64 flex-0 h-12 p-2 text-gray-500 rounded"
              />
            </animated.div>
          </div>
          <div className="flex items-center">
            <Home
              onClick={() => {
                router.push({
                  pathname: '/',
                })
              }}
              style={{ '--ggs': 1, marginTop: 4 } as any}
              className="mr-4 fill-current text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <G
              width={20}
              onClick={() => {
                window.open(`https://github.com/${pkg.author.name}/${pkg.name}`)
              }}
              className="mr-4 fill-current text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <T
              width={20}
              onClick={() => {
                window.open(`https://twitter.com/${pkg.author.name}`)
              }}
              className="fill-current text-gray-500 hover:text-gray-700 cursor-pointer"
            />
          </div>
        </header>
        <div className="lg:overflow-scroll flex-grow" style={{ flexBasis: 0 }}>
          {children}
        </div>
        <div
          id="SHEET-CONTAINER"
          className="flex justify-center items-center p-12 bg-gray-300 fixed"
          style={{ zIndex: -1 }}
        />
      </div>
    </div>
  )
}

export default Layout
