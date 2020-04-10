import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import markdownit from 'markdown-it'
import prism from 'prismjs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { api, Github } from '~/api'

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

const Cheetsheet: NextPage<{ data: Github.Issue[] }> = ({ data }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col h-full w-full contianer items-center bg-gray-100 overflow-scroll">
      <h3 className="label text-4xl text-gray-700 my-20">
        {router.query.id} <span className="text-gray-500">{'cheetsheet'}</span>
      </h3>
      <div className="w-3/4">
        {data?.map(v => {
          return (
            <div className="w-2/4 pr-4 pb-4" style={{ float: 'left' }} key={v.title}>
              <p className="mb-4 flex items-center">
                <a className="text-blue-600 " href={v.html_url} target="_blank">
                  {v.title}
                </a>
                {v.state === 'open' ? (
                  <p className="rounded-lg bg-green-300 w-2 h-2 ml-2" />
                ) : (
                  <p className="rounded-lg bg-red-300 w-2 h-2 ml-2" />
                )}
              </p>
              <div
                className="shadow w-full bg-white rounded overflow-hidden theme-default-content"
                key={v.title}
                dangerouslySetInnerHTML={{ __html: MarkdownIt.render(v.body || '') }}
              />
              <div className="flex italic justify-end text-xs text-gray-600 mt-2">
                <time>{dayjs(v.updated_at).from(dayjs())}</time>
                <span className="mx-2">/</span>
                <time>{dayjs(v.created_at).format('YYYY-MM-DD')}</time>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

Cheetsheet.getInitialProps = async (ctx: NextPageContext) => {
  const data = await api.github.issues(
    typeof ctx.query.id === 'string' ? [ctx.query.id] : ctx.query.id,
  )
  return { data }
}

export default Cheetsheet
