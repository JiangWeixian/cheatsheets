import React from 'react'
import { ArrowLeft } from 'styled-cssgg'

type Props = {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <div className="w-full h-full">
    <div className="fixed flex w-full h-10 flex-start items-center px-4">
      <ArrowLeft className="w-10 h-10 text-gray-500 hover:text-gray-700 cursor-pointer" />
    </div>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)

export default Layout
