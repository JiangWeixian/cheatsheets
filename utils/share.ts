import copy from 'copy-to-clipboard'

export const share = async (
  id: string,
  _label: string,
  title: string = document.title,
  text: string = document.title,
) => {
  if ((navigator as any).share) {
    ;(navigator as any).share({
      title,
      text,
      url: `${window.location.origin}/sheet/id/${id}`,
    })
    return false
  }
  copy(`${window.location.origin}/sheet/id/${id}`)
  return true
}
