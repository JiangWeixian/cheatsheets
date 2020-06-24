import React, { useEffect } from 'react'
import cx from 'classnames'
import { useRouter } from 'next/router'
import markdownit from 'markdown-it'
import prism from 'prismjs'
import { Link } from 'styled-cssgg'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { doHighlight } from '@lotips/core'
import lazyimage from 'markdown-it-image-lazy-loading'
import zoom from 'medium-zoom'

import { Github } from '~/interface/github'
import { getId } from '~/utils/sheet'
import { share } from '~/utils/share'

dayjs.extend(relativeTime)
const md = new markdownit()
const maps: { [key: string]: string } = {}
const MarkdownIt = new markdownit({
  highlight: function(str, lang) {
    const language = maps[lang] || lang
    if (prism.languages[language]) {
      const code = prism.highlight(str, prism.languages[language], language)
      return `<pre class="language-${lang}"><code>${code}</code></pre>`
    }

    return `<pre class="language-${lang}"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})
MarkdownIt.use(lazyimage)

type SheetProps = {
  v?: Github.Issue
  label?: string
  highlight?: string
  className?: string
  style?: React.CSSProperties
}

const EMPTY = {} as Github.Issue

export const Sheet = ({ v = EMPTY, highlight = '', label = '', ...props }: SheetProps) => {
  const router = useRouter()
  const _label = label || v.labels[0].name
  const queryId = router.query._id
  const idcard = getId(_label, v)
  useEffect(() => {
    zoom(Array.prototype.slice.call(document.images), { background: 'rgba(255, 255, 255, 0.6)' })
  }, [])
  return (
    <div className={props.className} style={props.style} key={v.title} id={idcard}>
      <p className="mb-4 flex items-center font-bold">
        <a className="text-indigo-600 " href={v.html_url} target="_blank">
          <span
            dangerouslySetInnerHTML={{
              __html: doHighlight(`<span>${v.title || ''}</span>`, highlight),
            }}
          />
          {v.state === 'open' ? (
            <span className="rounded-lg inline-block bg-green-300 w-2 h-2 ml-2" />
          ) : (
            <span className="rounded-lg inline-block bg-red-300 w-2 h-2 ml-2" />
          )}
        </a>
      </p>
      <div
        className={cx('shadow w-full bg-white rounded overflow-hidden theme-default-content', {
          'shadow-outline': idcard === queryId,
        })}
        key={v.title}
        dangerouslySetInnerHTML={{
          __html: doHighlight(MarkdownIt.render(v.body || ''), highlight),
        }}
      />
      <div className="flex italic justify-between items-center text-sm text-gray-600 mt-2">
        <Link
          style={{ '--ggs': 0.7 } as any}
          className="cursor-pointer"
          onClick={() => {
            share(idcard, _label, v.title, v.body)
          }}
        />
        <div>
          <time>{dayjs(v.updated_at).from(dayjs())}</time>
          <span className="mx-2">/</span>
          <time>{dayjs(v.created_at).format('YYYY-MM-DD')}</time>
        </div>
      </div>
    </div>
  )
}
