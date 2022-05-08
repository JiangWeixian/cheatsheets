import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import zoom from 'medium-zoom'
import copy from 'copy-to-clipboard'
import { Layout as MayumiLayout } from 'mayumi/layout'
import { Notification } from 'mayumi/notification'
import { useTransition, animated } from '@react-spring/web'
import { styled } from 'mayumi/theme'
import { Icon } from 'mayumi/icons'

import Github from '../assets/github.svg'
import Home from '../assets/home.svg'
import MathPlus from '../assets/match-plus.svg'
import ChevronLeft from '../assets/chevron-left.svg'
import ChevronRight from '../assets/chevron-right.svg'
import Twitter from '../assets/twitter.svg'
import { SideBar } from './SideBar'
import { useCreateIssue } from '~/hooks/use-create-issue'

const Container = styled(MayumiLayout, {
  display: 'flex',
  '.inner': {
    flexBasis: '$0',
    flexGrow: '1',
  },
  '.omcs-navi-group': {
    flexBox: 'center',
    flexDirection: 'column',
    gap: '$8',
    opacity: 0.75,
    w: '$6',
    color: '$white',
    '& i': {
      cursor: 'pointer',
    },
    '&.sm': {
      gap: '$4',
    },
  },
  '.omcs-chevron-group': {
    position: 'relative',
    w: '$full',
    h: '$6',
    flexBox: 'center',
    color: '$white',
    cursor: 'pointer',
    '& .chevron-left': {
      position: 'relative',
      right: '$1',
      bottom: '$0',
    },
    '& .chevron-right': {
      position: 'relative',
      right: '$1',
      bottom: '$0',
    },
  },
  '.mayumi-icon': {
    cursor: 'pointer',
    fill: '$textColor',
    '&:hover': {
      opacity: 0.8,
    },
  },
  '.mayumi-layout-navigate': {
    w: '$12',
    pt: '$6',
    pb: '$4',
  },
  '.mayumi-layout-main': {
    p: '$0',
    backgroundColor: '$black',
  },
  '.omcs-layout-content': {
    overflowY: 'auto',
    h: '$full',
  },
})

const G = Github as any
const T = Twitter as any
const H = Home as any
const CL = ChevronLeft as any
const CR = ChevronRight as any
const MP = MathPlus as any

type Props = {
  children?: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const router = useRouter()
  useEffect(() => {
    zoom(Array.prototype.slice.call(document.images), {
      background: 'rgba(0, 0, 0, 0.65)',
    })
  }, [router.asPath])
  const { handleCreateIssue } = useCreateIssue()
  useEffect(() => {
    const handleCopyCode = (e: MouseEvent) => {
      const target = e.target as any
      const type = (target.nodeName as string).toLowerCase()
      if (type === 'pre' || type === 'code') {
        const code = target.textContent
        copy(code)
        Notification.info({
          title: 'Copied success!',
          description: 'Share your code',
        })
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
    <Container size="screen">
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_REPO_OWNER}'s cheatsheet`}</title>
      </Head>
      <MayumiLayout.Navigate
        bottom={
          <div className="omcs-navi-group">
            <Icon>
              <G
                width={14}
                onClick={() => {
                  window.open(
                    `https://github.com/${process.env.NEXT_PUBLIC_REPO_OWNER}/cheatsheets`,
                  )
                }}
              />
            </Icon>
            <Icon>
              <T
                width={14}
                onClick={() => {
                  window.open(`https://twitter.com/${process.env.NEXT_PUBLIC_REPO_OWNER}`)
                }}
              />
            </Icon>
          </div>
        }
        top={
          <div className="omcs-navi-group sm">
            {/* <Avatar src={`https://github.com/${process.env.NEXT_PUBLIC_REPO_OWNER}.png?size=40`} /> */}
            <Icon>
              <H
                width={16}
                onClick={() => {
                  router.push({
                    pathname: '/',
                  })
                }}
              />
            </Icon>
            <Icon>
              <MP width={16} onClick={handleCreateIssue} />
            </Icon>
            <div className="omcs-chevron-group" onClick={() => setOpen((prev) => !prev)}>
              {collapsedTransitions((props, item) => {
                return item ? (
                  <Icon>
                    <animated.i className="chevron-left" style={props as any}>
                      <CL width={16} />
                    </animated.i>
                  </Icon>
                ) : (
                  <Icon>
                    <animated.i className="chevron-right" style={props as any}>
                      <CR width={16} />
                    </animated.i>
                  </Icon>
                )
              })}
            </div>
          </div>
        }
      />
      <SideBar open={open} />
      <MayumiLayout.Main>
        <div className="omcs-layout-content">{children}</div>
      </MayumiLayout.Main>
      <Notification />
    </Container>
  )
}

export default Layout
