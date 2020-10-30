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
      url: `${window.location.origin}/sheet/${_label}?_id=${_id}`,
    })
    return
  }
  copy(`${window.location.origin}/sheet/${_label}?_id=${_id}`)
  window.alert('复制成功')
}
