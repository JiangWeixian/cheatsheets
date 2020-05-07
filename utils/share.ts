import copy from 'copy-to-clipboard'

export const share = (
  _id: string,
  _label: string,
  title: string = document.title,
  text: string = document.title,
) => {
  if ((navigator as any).share) {
    ;(navigator as any).share({
      title,
      text,
      url: `https://jiangweixian-cheatsheets.now.sh/sheet/${_label}?_id=${_id}`,
    })
    return
  }
  copy(`https://jiangweixian-cheatsheets.now.sh/sheet/${_label}?_id=${_id}`)
  window.alert('复制成功')
}
