import React from 'react'
import { ArrowLeft } from 'styled-cssgg'
import router from 'next/router'
import Head from 'next/head'

import pkg from 'package.json'
import Github from '../assets/github.svg'
import Twitter from '../assets/twitter.svg'

const G = Github as any
const T = Twitter as any

type Props = {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <div className="w-full h-full">
    <Head>
      <title>jiangweixian's cheatsheet</title>
    </Head>
    <div className="fixed flex w-full h-10 items-center px-4 justify-between">
      <ArrowLeft
        onClick={() => {
          router.back()
        }}
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
    </div>
    {children}
  </div>
)

export default Layout
