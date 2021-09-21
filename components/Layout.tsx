import React, { useEffect, useState } from 'react'
import { Home, Search, PushChevronLeft, PushChevronRight, MathPlus } from 'styled-cssgg'
import { useRouter } from 'next/router'
import Head from 'next/head'
import zoom from 'medium-zoom'
import copy from 'copy-to-clipboard'
import { Layout as Container, Avatar, Divider } from 'granen'
import { GranenThemeProvider } from 'granen/lib/theme/theme-context'
import { useTransition, animated } from '@react-spring/web'
import styled, { createGlobalStyle } from 'styled-components'

import pkg from 'package.json'
import Github from '../assets/github.svg'
import Twitter from '../assets/twitter.svg'
import { SideBar } from './SideBar'
import { useCreateIssue } from '~/hooks/use-create-issue'

const AnimatedPushChevronLeft = animated(PushChevronLeft)
const AnimatedPushChevronRight = animated(PushChevronRight)

export const GlobalStyle = createGlobalStyle`
  body {
    @apply m-0 p-0;
  }

  a {
    color: inherit;
    @apply underline-transparent;
  }
`

const NavBottom = styled.div`
  @apply flex flex-col items-center gap-4 opacity-75;
`

const Copyright = styled.footer`
  @apply flex items-center justify-end gap-4 p-4 pt-0 pr-8 pb-2;
`

const Main = styled(Container.Main)`
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%),
    radial-gradient(at top center, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0.4) 120%) #989898;
  background-blend-mode: multiply, multiply;
`

const G = Github as any
const T = Twitter as any

type Props = {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()
  useEffect(() => {
    zoom(Array.prototype.slice.call(document.images), { background: 'rgba(255, 255, 255, 0.6)' })
  }, [router.asPath])
  const { handleCreateIssue } = useCreateIssue()
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
  const [open, setOpen] = useState(true)
  const collapsedTransitions = useTransition(open, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  return (
    <GranenThemeProvider defaultThemeType="dark">
      <Container className="flex bg-gray-100 lg:h-full lg:w-full">
        <Head>
          <title>jiangweixian's cheatsheet</title>
        </Head>
        <GlobalStyle />
        <Container.Nav
          logo={<Avatar src={`https://github.com/${pkg.author.name}.png?size=40`} />}
          bottom={
            <NavBottom>
              <MathPlus onClick={handleCreateIssue} />
              <div
                onClick={() => setOpen(prev => !prev)}
                className="relative right-0 bottom-0 w-full h-6 flex justify-center items-center opacity-75 hover:opacity-100 text-white cursor-pointer"
              >
                {collapsedTransitions((props, item) => {
                  return item ? (
                    <AnimatedPushChevronRight style={props as any} />
                  ) : (
                    <AnimatedPushChevronLeft style={props as any} />
                  )
                })}
              </div>
            </NavBottom>
          }
        >
          <Container.NavItem itemKey="home">
            <Home
              onClick={() => {
                router.push({
                  pathname: '/',
                })
              }}
            />
          </Container.NavItem>
          <Container.NavItem itemKey="search">
            <Search />
          </Container.NavItem>
        </Container.Nav>
        <SideBar open={open} className="flex-grow-0 hidden lg:flex" />
        <Main>
          <div className="lg:overflow-scroll flex-grow" style={{ flexBasis: 0 }}>
            {children}
          </div>
          <div
            id="SHEET-CONTAINER"
            className="flex justify-center items-center p-12 bg-gray-300 fixed"
            style={{ zIndex: -1 }}
          />
          <Divider type="horizontal" />
          <Copyright>
            <G
              width={14}
              onClick={() => {
                window.open(`https://github.com/${pkg.author.name}/${pkg.name}`)
              }}
              className="fill-current text-gray-500 hover:text-gray-700 cursor-pointer"
            />
            <T
              width={14}
              onClick={() => {
                window.open(`https://twitter.com/${pkg.author.name}`)
              }}
              className="fill-current text-gray-500 hover:text-gray-700 cursor-pointer"
            />
          </Copyright>
        </Main>
      </Container>
    </GranenThemeProvider>
  )
}

export default Layout
