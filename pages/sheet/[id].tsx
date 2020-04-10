import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import markdownit from 'markdown-it'
import prism from 'prismjs'

import { api, Github } from '~/api'

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
    <div className="flex flex-col h-full w-full contianer items-center bg-gray-100 overflow-scroll theme-default-content">
      <h3 className="text-6xl text-gray-800">{router.query.id}</h3>
      <div className="w-3/4">
        {data?.map(v => {
          return (
            <div className="w-2/4 pr-4 pb-4" style={{ float: 'left' }} key={v.title}>
              <p className="text-blue-600 mb-4">{v.title}</p>
              <div
                className="shadow p-4 w-full rounded overflow-hidden"
                key={v.title}
                dangerouslySetInnerHTML={{ __html: MarkdownIt.render(v.body || '') }}
              />
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
