import React from 'react'
import { ArrowLeft } from 'styled-cssgg'
import router from 'next/router'

type Props = {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <div className="w-full h-full">
    <div className="fixed flex w-full h-10 flex-start items-center px-4">
      <ArrowLeft
        onClick={() => {
          router.back()
        }}
        className="w-10 h-10 text-gray-500 hover:text-gray-700 cursor-pointer"
      />
    </div>
    {children}
  </div>
)

export default Layout
