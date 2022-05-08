import Markdownit from 'markdown-it'
import prism from 'prismjs'
import todo from 'markdown-it-todo'

export const quoteInlineCode = (md: markdownit) => {
  const defaultInlineCode = md.renderer.rules.code_inline
  md.renderer.rules.code_inline = function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    token.content = `\`${token.content}\``
    return defaultInlineCode(tokens, idx, options, env, self)
  }
}

const md = new Markdownit()
const maps: { [key: string]: string } = {}
let MarkdownIt: markdownit

export const createMarkdownRenderer = () => {
  if (MarkdownIt) {
    return MarkdownIt
  }
  MarkdownIt = new Markdownit({
    /**
     * @see diff-hightlight {@link https://prismjs.com/plugins/diff-highlight/}
     */
    highlight(str, lang) {
      const language = maps[lang] || lang
      if (prism.languages[language]) {
        const code = prism.highlight(str, prism.languages[language], `diff-${language}`)
        return `<pre class="language-${lang} diff-highlight"><code class="language-${lang} diff-highlight">${code}</code></pre>`
      }

      return `<pre class="language-${lang} diff-highlight"><code class="language-${lang} diff-highlight">${md.utils.escapeHtml(
        str,
      )}</code></pre>`
    },
  })
  // enable native lazy loading image
  MarkdownIt.use(quoteInlineCode)
  MarkdownIt.use(todo)
  return MarkdownIt
}

export const renderer = createMarkdownRenderer()
