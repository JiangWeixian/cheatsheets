import React, { useCallback, useState } from 'react'
import cx from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { doHighlight } from '@lotips/core'
import { Dot } from 'mayumi/dot'
import { Box } from 'mayumi/box'
import { Separator } from 'mayumi/separator'
import { Text } from 'mayumi/text'
import { Notification } from 'mayumi/notification'
import { styled } from 'mayumi/theme'
import { Issue } from '@omcs/request/types'
import { Icon } from 'mayumi/icons'

import { share } from '~/utils/share'
import { renderer } from '~/utils/md'
import { Label } from '~/components/Label'
import ImageSvg from '../assets/image.svg'
import LinkSvg from '../assets/link.svg'

// typo issue related next-images
const Link: any = LinkSvg
const Image: any = ImageSvg

let Html2Canvas: typeof import('html2canvas')['default']
import('html2canvas').then((module) => (Html2Canvas = module.default as any))

dayjs.extend(relativeTime)

type SheetProps = {
  v?: Issue
  highlight?: string
  className?: string
  style?: React.CSSProperties
  onClickTitle?: (v: Issue) => void
  onShare?: (notify?: boolean) => void
  isShared?: boolean
}

const Container = styled(Box, {
  boxShadow: '$lg',
  w: '$full',
  rounded: '$lg',
  overflow: 'hidden',
  text: '$sm',
  flexDirection: 'column',
  alignItems: 'flex-start',
  p: '$0',
  '.mayumi-separator': {
    mb: '$0',
  },
  '.omcs-sheet-operations': {
    display: 'flex',
    gap: '$4',
    alignItems: 'center',
  },
  '.omcs-sheet-operation': {
    cursor: 'pointer',
    p: '$4',
    m: '-$4',
    '&.loading': {
      cursor: 'not-allowed',
    },
  },
  '.omcs-sheet-title': {
    p: '$4',
    pb: '$0',
  },
  '.omcs-sheet-label': {
    pr: '$2',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    text: '$sm',
    gap: '$2',
  },
  '.omcs-sheet-subtitle': {
    m: '$0',
    mb: '$1',
    cursor: 'pointer',
  },
  '.mayumi-dot': {
    ml: '$2',
  },
  '.omcs-sheet-info': {
    display: 'flex',
    fontStyle: 'italic',
    justifyContent: 'space-between',
    alignItems: 'center',
    text: '$sm',
    p: '$4',
    w: '$full',
    time: {
      mx: '$2',
    },
  },
})

const Controls = styled(Box, {
  shadow: '$md',
  w: '$1-2',
  mt: '$4',
  color: '$textColor',
  rounded: '$md',
  display: 'flex',
  justifyContent: 'flex-start',
  '.omcs-sheet-operations': {
    display: 'flex',
    gap: '$4',
    alignItems: 'center',
    p: '$2',
  },
})

const EMPTY = {} as Issue

export const Sheet = ({ v = EMPTY, highlight = '', ...props }: SheetProps) => {
  const label = v.labels?.[0]?.name
  const idcard = v.id
  const [copyLoading, setCopyLoading] = useState(false)
  const handleCopyImage = useCallback(() => {
    const sheet = document.querySelector(`[id="${idcard}"]`)?.cloneNode(true)
    const container = document.querySelector('#SHEET-CONTAINER')
    if (!sheet || !container) {
      return
    }
    setCopyLoading(true)
    container.appendChild(sheet)
    Html2Canvas(container as HTMLElement).then((canvas: HTMLCanvasElement) => {
      canvas.toBlob((blob: any) => {
        if (!blob) {
          return
        }
        const item = new ClipboardItem({ 'image/png': blob })
        ;(navigator.clipboard as any).write([item])
        container.removeChild(sheet)
        setCopyLoading(false)
        // TODO: should we include image in description?
        Notification.info({
          title: 'Copied success!',
          description: 'Share your cheatsheet with image',
        })
      })
    })
  }, [idcard])
  const Operations = (
    <div className="omcs-sheet-operations">
      <Icon
        className="omcs-sheet-operation"
        onClick={() => {
          share(idcard, label, v.title, v.body).then((needNotify) => {
            if (needNotify) {
              Notification.info({
                title: 'Copied success!',
                description: 'Share your cheatsheet with link',
              })
            }
          })
        }}
      >
        <Link width={14} />
      </Icon>
      <Icon
        className={cx('omcs-sheet-operation', {
          loading: copyLoading,
          last: true,
        })}
        onClick={() => {
          handleCopyImage()
        }}
      >
        {copyLoading ? <i className="gg-spinner" /> : <Image width={14} />}
      </Icon>
    </div>
  )
  return (
    <>
      <Container
        className={cx('omcs-sheet', props.className)}
        style={props.style}
        key={v.title}
        id={idcard}
      >
        <div className="omcs-sheet-title">
          <Text className="omcs-sheet-subtitle" h3={true}>
            <a target="_blank" rel="noreferrer">
              <span
                dangerouslySetInnerHTML={{
                  __html: doHighlight(`${v.title || ''}`, highlight),
                }}
                onClick={() => props.onClickTitle?.(v)}
              />
              {v.state === 'OPEN' ? <Dot type="success" /> : <Dot type="danger" />}
            </a>
          </Text>
          {v.labels?.map((label) => {
            return <Label key={label.id} {...label} />
          })}
        </div>
        <Separator type="horizontal" />
        <div
          key={v.title}
          className="markdown-body"
          dangerouslySetInnerHTML={{
            __html: doHighlight(renderer.render(v.body || ''), highlight),
          }}
        />
        {!props.isShared ? (
          <div className="omcs-sheet-info">
            {Operations}
            <div>
              <time>{dayjs(v.updatedAt).from(dayjs())}</time>
              <time>{dayjs(v.createdAt).format('YYYY-MM-DD')}</time>
            </div>
          </div>
        ) : null}
      </Container>
      {props.isShared ? <Controls css={{ glass: '$2' }}>{Operations}</Controls> : null}
    </>
  )
}
