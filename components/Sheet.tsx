import React from 'react'
import cx from 'classnames'
import { useRouter } from 'next/router'
import markdownit from 'markdown-it'
import prism from 'prismjs'
import { Link } from 'styled-cssgg'
import copy from 'copy-to-clipboard'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Github } from '~/api'
import { getId } from '~/utils/sheet'

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

type SheetProps = {
  v?: Github.Issue
  className?: string
}

const EMPTY = {} as Github.Issue

export const Sheet = ({ v = EMPTY, ...props }: SheetProps) => {
  const router = useRouter()
  const id = router.query._id
  return (
    <div
      className={cx('lg:w-2/4 w-full', props.className)}
      style={{ float: 'left' }}
      key={v.title}
      id={`${router.query.id}-${v.id}`}
    >
      <p className="mb-4 flex items-center">
        <a className="text-blue-600 " href={v.html_url} target="_blank">
          {v.title}
          {v.state === 'open' ? (
            <span className="rounded-lg inline-block bg-green-300 w-2 h-2 ml-2" />
          ) : (
            <span className="rounded-lg inline-block bg-red-300 w-2 h-2 ml-2" />
          )}
        </a>
      </p>
      <div
        className={cx('shadow w-full bg-white rounded overflow-hidden theme-default-content', {
          'shadow-outline': `${router.query.id}-${v.id}` === id,
        })}
        key={v.title}
        dangerouslySetInnerHTML={{ __html: MarkdownIt.render(v.body || '') }}
      />
      <div className="flex italic justify-between items-center text-xs text-gray-600 mt-2">
        <Link
          style={{ '--ggs': 0.7 } as any}
          className="cursor-pointer"
          onClick={() => {
            copy(
              `https://jiangweixian-cheatsheets.now.sh/sheet/${router.query.id}?_id=${getId(
                router.query.id as string,
                v,
              )}`,
            )
            window.alert('复制成功')
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
