import React, { useCallback, useState } from 'react'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { Image, Link, Spinner } from 'styled-cssgg'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { doHighlight } from '@lotips/core'
import { Box, Divider, Typography, Dot } from 'granen'
import styled from 'styled-components'

import { Github } from '~/interface/github'
import { getId } from '~/utils/sheet'
import { share } from '~/utils/share'
import { createMarkdownRenderer } from '~/utils/md'

let Html2Canvas: typeof import('html2canvas')['default']
import('html2canvas').then(module => (Html2Canvas = module.default as any))

dayjs.extend(relativeTime)
const MarkdownIt = createMarkdownRenderer()

type SheetProps = {
  v?: Github.Issue
  highlight?: string
  className?: string
  style?: React.CSSProperties
}

const SubTitle = styled(Typography.SubTitle)`
  @apply m-0 mb-2;

  [data-role='dot'] {
    @apply ml-2 w-2 h-2;
  }
`

const Info = styled.div`
  @apply box-border flex italic justify-between items-center text-sm text-gray-600 p-4 w-full;

  [data-role='info-operations'] {
    @apply flex justify-between items-center text-sm;
  }

  time {
    @apply mx-2;
  }
`

const EMPTY = {} as Github.Issue

export const Sheet = ({ v = EMPTY, highlight = '', ...props }: SheetProps) => {
  const router = useRouter()
  const label = v.labels?.[0]?.name
  const queryId = router.query._id
  const idcard = getId(v)
  console.log(idcard, queryId)
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
      canvas.toBlob(blob => {
        if (!blob) {
          return
        }
        const item = new ClipboardItem({ 'image/png': blob })
        ;(navigator.clipboard as any).write([item])
        container.removeChild(sheet)
        setCopyLoading(false)
      })
    })
  }, [idcard])
  return (
    <Box
      className={cx(
        'shadow w-full rounded-lg overflow-hidden text-sm',
        {
          'shadow-outline': idcard === queryId,
        },
        props.className,
      )}
      style={props.style}
      key={v.title}
      id={idcard}
    >
      <div className="p-4">
        <SubTitle h2={true}>
          <a className="text-indigo-600 " href={v.html_url} target="_blank" rel="noreferrer">
            <span
              dangerouslySetInnerHTML={{
                __html: doHighlight(`<span>${v.title || ''}</span>`, highlight),
              }}
            />
            {v.state === 'open' ? <Dot type="success" /> : <Dot type="danger" />}
          </a>
        </SubTitle>
        {v.labels.map(label => {
          return (
            <div
              key={label.id}
              className="pr-2 w-min cursor-pointer inline-flex items-center text-sm text-gray-700"
              onClick={() => router.push(`/sheet/${label.name}`)}
            >
              <span style={{ color: `#${label.color}` }} className="mr-1">
                #
              </span>
              <span>{label.name}</span>
            </div>
          )
        })}
        <Divider type="horizontal" />
      </div>
      <div
        key={v.title}
        className="theme-default-content"
        dangerouslySetInnerHTML={{
          __html: doHighlight(MarkdownIt.render(v.body || ''), highlight),
        }}
      />
      <Info>
        <div data-role="info-operations">
          <div
            className="cursor-pointer p-4 -m-4"
            onClick={() => {
              share(idcard, label, v.title, v.body)
            }}
          >
            <Link style={{ '--ggs': 0.7 } as any} />
          </div>
          <div
            className={cx(
              {
                'cursor-pointer': !copyLoading,
                'cursor-not-allowed': copyLoading,
              },
              'p-4',
              '-m-4',
              'ml-4',
            )}
            onClick={() => {
              handleCopyImage()
            }}
          >
            {copyLoading ? (
              <Spinner style={{ '--ggs': 0.7 } as any} />
            ) : (
              <Image style={{ '--ggs': 0.7 } as any} />
            )}
          </div>
        </div>
        <div>
          <time>{dayjs(v.updated_at).from(dayjs())}</time>
          <time>{dayjs(v.created_at).format('YYYY-MM-DD')}</time>
        </div>
      </Info>
    </Box>
  )
}
