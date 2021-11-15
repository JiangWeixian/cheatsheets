/**
 * @todo ugly css style
 */
import React, { useCallback, useState } from 'react'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { Image, Link, Spinner } from 'styled-cssgg'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { doHighlight } from '@lotips/core'
import { Box, Divider, Typography, Dot, Notification } from 'granen'
import styled from 'styled-components'
import { Issue } from '@omcs/request/types'

import { share } from '~/utils/share'
import { createMarkdownRenderer } from '~/utils/md'
import { Icon } from '~/components/Icon'

let Html2Canvas: typeof import('html2canvas')['default']
import('html2canvas').then((module) => (Html2Canvas = module.default as any))

dayjs.extend(relativeTime)
const MarkdownIt = createMarkdownRenderer()

type SheetProps = {
  v?: Issue
  highlight?: string
  className?: string
  style?: React.CSSProperties
  onClickTitle?: (v: Issue) => void
  onShare?: (notify?: boolean) => void
  isShared?: boolean
}

const Container = styled(Box)`
  @apply shadow w-full rounded-lg overflow-hidden text-sm;

  && {
    background-color: var(--active-bg-color);
  }

  [data-role='divider'] {
    @apply mb-0;
  }

  .operations {
    @apply flex gap-4 items-center;
  }

  .operation {
    @apply cursor-pointer p-4 -m-4 cursor-pointer;

    &.loading {
      @apply cursor-not-allowed;
    }
  }

  .sheet-title {
    @apply p-4 pb-0;

    .label {
      @apply pr-2 cursor-pointer inline-flex items-center text-sm text-gray-700 gap-2;
    }
  }

  .sheet-subtitle {
    @apply m-0 mb-1 cursor-pointer;

    [data-role='dot'] {
      @apply ml-2 w-2 h-2;
    }
  }

  .info {
    @apply box-border flex italic justify-between items-center text-sm text-gray-500 p-4 w-full;

    time {
      @apply mx-2;
    }
  }
`

const Controls = styled(Box)`
  @apply shadow-2xl w-1/2 text-gray-500 mt-4 rounded-md;


  .operations {
    @apply flex gap-4 items-center p-4;
  }
`

const EMPTY = {} as Issue

export const Sheet = ({ v = EMPTY, highlight = '', ...props }: SheetProps) => {
  const router = useRouter()
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
    <div className="operations">
      <Icon
        className="operation"
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
        <Link style={{ '--ggs': 0.7 } as any} />
      </Icon>
      <Icon
        className={cx('operation', {
          loading: copyLoading,
          last: true,
        })}
        onClick={() => {
          handleCopyImage()
        }}
      >
        {copyLoading ? (
          <Spinner style={{ '--ggs': 0.7 } as any} />
        ) : (
          <Image style={{ '--ggs': 0.7 } as any} />
        )}
      </Icon>
    </div>
  )
  return (
    <>
      <Container
        borderless="true"
        className={props.className}
        style={props.style}
        key={v.title}
        id={idcard}
      >
        <div className="sheet-title">
          <Typography.SubTitle className="sheet-subtitle" h2={true}>
            <a target="_blank" rel="noreferrer">
              <span
                dangerouslySetInnerHTML={{
                  __html: doHighlight(`<span>${v.title || ''}</span>`, highlight),
                }}
                onClick={() => props.onClickTitle?.(v)}
              />
              {v.state === 'OPEN' ? <Dot type="success" /> : <Dot type="danger" />}
            </a>
          </Typography.SubTitle>
          {v.labels?.map((label) => {
            return (
              <div
                key={label.id}
                className="label"
                style={{ color: `#${label.color}` }}
                onClick={() => router.push(`/sheet/label/${label.id}`)}
              >
                # {label.name}
              </div>
            )
          })}
        </div>
        <Divider type="horizontal" />
        <div
          key={v.title}
          className="markdown-body"
          dangerouslySetInnerHTML={{
            __html: doHighlight(MarkdownIt.render(v.body || ''), highlight),
          }}
        />
        {!props.isShared ? (
          <div className="info">
            {Operations}
            <div>
              <time>{dayjs(v.updatedAt).from(dayjs())}</time>
              <time>{dayjs(v.createdAt).format('YYYY-MM-DD')}</time>
            </div>
          </div>
        ) : null}
      </Container>
      {props.isShared ? <Controls>{Operations}</Controls> : null}
    </>
  )
}
