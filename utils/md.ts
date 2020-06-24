import markdownit from 'markdown-it'
import prism from 'prismjs'
import lazyimage from 'markdown-it-image-lazy-loading'

export const quoteInlineCode = (md: markdownit) => {
  const defaultInlineCode = md.renderer.rules['code_inline']
  md.renderer.rules['code_inline'] = function(tokens, idx, options, env, self) {
    const token = tokens[idx]
    token.content = `\`${token.content}\``
    return defaultInlineCode(tokens, idx, options, env, self)
  }
}

const md = new markdownit()
const maps: { [key: string]: string } = {}
let MarkdownIt: markdownit

export const createMarkdownRenderer = () => {
  if (MarkdownIt) {
    return MarkdownIt
  }
  MarkdownIt = new markdownit({
    highlight: function(str, lang) {
      const language = maps[lang] || lang
      if (prism.languages[language]) {
        const code = prism.highlight(str, prism.languages[language], language)
        return `<pre class="language-${lang}"><code>${code}</code></pre>`
      }

      return `<pre class="language-${lang}"><code>${md.utils.escapeHtml(str)}</code></pre>`
    },
  })
  // enable native lazy loading image
  MarkdownIt.use(lazyimage)
  MarkdownIt.use(quoteInlineCode)
  return MarkdownIt
}
