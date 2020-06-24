export const quoteInlineCode = (md: markdownit) => {
  const defaultInlineCode = md.renderer.rules['code_inline']
  md.renderer.rules['code_inline'] = function(tokens, idx, options, env, self) {
    const token = tokens[idx]
    token.content = `\`${token.content}\``
    return defaultInlineCode(tokens, idx, options, env, self)
  }
}
