import React from 'react'
import { Home } from 'styled-cssgg'
import router from 'next/router'
import Head from 'next/head'

import pkg from 'package.json'
import Github from '../assets/github.svg'
import Twitter from '../assets/twitter.svg'
import { SideBar } from './SideBar'

const G = Github as any
const T = Twitter as any

type Props = {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex w-full bg-gray-100 h-full">
      <Head>
        <title>jiangweixian's cheatsheet</title>
      </Head>
      <SideBar className="w-3/12" />
      <div className="w-9/12 h-full bg-gray-100 flex flex-col overflow-scroll pt-10">
        <header className="w-9/12 fixed top-0 flex justify-between items-center h-16 px-12 py-4 box-border bg-gray-100 z-50">
          <Home
            onClick={() => {
              router.push({
                pathname: '/',
              })
            }}
            style={{ '--ggs': 0.95 } as any}
            className="w-10 h-10 text-gray-500 hover:text-gray-700 cursor-pointer"
          />
          <div className="flex items-center">
            <G
              width={20}
              onClick={() => {
                window.open(`https://github.com/${pkg.author.name}`)
              }}
              className="mr-8 fill-current text-gray-500 hover:text-gray-700 cursor-pointer"
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
        {children}
      </div>
    </div>
  )
}

export default Layout
