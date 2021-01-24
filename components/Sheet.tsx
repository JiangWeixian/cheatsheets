import React, { useCallback, useState } from 'react'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { Image, Link, Spinner } from 'styled-cssgg'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { doHighlight } from '@lotips/core'

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
    <div
      className={cx(
        'shadow w-full bg-white rounded-lg overflow-hidden theme-default-content text-sm',
        {
          'shadow-outline': idcard === queryId,
        },
        props.className,
      )}
      style={props.style}
      key={v.title}
      id={idcard}
    >
      <div className="border-b p-4">
        <h1 className="flex items-center font-medium text-xl">
          <a className="text-indigo-600 " href={v.html_url} target="_blank">
            <span
              dangerouslySetInnerHTML={{
                __html: doHighlight(`<span>${v.title || ''}</span>`, highlight),
              }}
            />
            {v.state === 'open' ? (
              <span className="rounded-full inline-block bg-green-300 w-2 h-2 ml-2" />
            ) : (
              <span className="rounded-full inline-block bg-red-300 w-2 h-2 ml-2" />
            )}
          </a>
        </h1>
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
      </div>
      <div
        key={v.title}
        dangerouslySetInnerHTML={{
          __html: doHighlight(MarkdownIt.render(v.body || ''), highlight),
        }}
      />
      <div className="flex italic justify-between items-center text-sm text-gray-600 p-4 bg-gray-100 w-full">
        <div className="flex justify-between items-center text-sm">
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
          <span className="mx-2">/</span>
          <time>{dayjs(v.created_at).format('YYYY-MM-DD')}</time>
        </div>
      </div>
    </div>
  )
}
