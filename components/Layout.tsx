import React, { useEffect, useState } from 'react'
import { Home, Search, PushChevronLeft, PushChevronRight, MathPlus } from 'styled-cssgg'
import { useRouter } from 'next/router'
import Head from 'next/head'
import zoom from 'medium-zoom'
import copy from 'copy-to-clipboard'
import { Layout as GranenLayout, Avatar, Divider, Notification } from 'granen'
import { GranenThemeProvider } from 'granen/lib/theme/theme-context'
import { useTransition, animated } from '@react-spring/web'
import styled, { createGlobalStyle } from 'styled-components'

import pkg from 'package.json'
import Github from '../assets/github.svg'
import Twitter from '../assets/twitter.svg'
import { SideBar } from './SideBar'
import { Icon } from '~/components/Icon'
import { useCreateIssue } from '~/hooks/use-create-issue'

const Chevron = styled.div`
  @apply relative right-0 bottom-0 w-full h-6 flex justify-center items-center opacity-75 hover:opacity-100 text-white cursor-pointer;
`

const AnimatedPushChevronLeft = styled(animated(PushChevronLeft))`
  @apply left-0;
`
const AnimatedPushChevronRight = styled(animated(PushChevronRight))`
  @apply right-0;
`

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
  @apply flex flex-col items-center gap-8 opacity-75;
`

const Copyright = styled.footer`
  @apply flex items-center justify-end gap-4 p-4 pt-0 pr-8 pb-2;

  .copyright-item {
    @apply fill-current text-gray-500 cursor-pointer;
  }
`

const Container = styled(GranenLayout)`
  @apply flex bg-gray-100 lg:h-full lg:w-full;

  [id='SHEET-CONTAINER'] {
    z-index: -1;

    @apply flex justify-center items-center p-12 bg-gray-300 fixed;
  }

  .inner {
    flex-basis: 0;

    @apply lg:overflow-scroll flex-grow;
  }
`

const Main = styled(GranenLayout.Main)`
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
      <Container>
        <Head>
          <title>jiangweixian's cheatsheet</title>
        </Head>
        <GlobalStyle />
        <GranenLayout.Nav
          logo={<Avatar src={`https://github.com/${pkg.author.name}.png?size=40`} />}
          bottom={
            <NavBottom>
              <MathPlus onClick={handleCreateIssue} />
              <Chevron onClick={() => setOpen(prev => !prev)}>
                {collapsedTransitions((props, item) => {
                  return item ? (
                    <AnimatedPushChevronLeft style={props as any} />
                  ) : (
                    <AnimatedPushChevronRight style={props as any} />
                  )
                })}
              </Chevron>
            </NavBottom>
          }
        >
          <GranenLayout.NavItem itemKey="home">
            <Home
              onClick={() => {
                router.push({
                  pathname: '/',
                })
              }}
            />
          </GranenLayout.NavItem>
          <GranenLayout.NavItem itemKey="search">
            <Search />
          </GranenLayout.NavItem>
        </GranenLayout.Nav>
        <SideBar open={open} />
        <Main>
          <div className="inner">{children}</div>
          {/* for share cheatsheet image */}
          <div id="SHEET-CONTAINER" />
          <Divider type="horizontal" />
          <Copyright>
            <Icon>
              <G
                width={14}
                onClick={() => {
                  window.open(`https://github.com/${pkg.author.name}/${pkg.name}`)
                }}
                className="copyright-item"
              />
            </Icon>
            <Icon>
              <T
                width={14}
                onClick={() => {
                  window.open(`https://twitter.com/${pkg.author.name}`)
                }}
                className="copyright-item"
              />
            </Icon>
          </Copyright>
        </Main>
        <Notification />
      </Container>
    </GranenThemeProvider>
  )
}

export default Layout
