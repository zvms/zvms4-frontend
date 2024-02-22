import DOMPurify from 'dompurify';

export default function (text: string, removeLink: boolean = true) {
  const clean = DOMPurify.sanitize(text)
  // If `removeLink` is true, replace all hrefs with `#`.
  if (removeLink) {
    const dom = new DOMParser().parseFromString(clean, 'text/html')
    const links = dom.querySelectorAll('a')
    links.forEach(link => {
      link.setAttribute('href', '#')
    })
    const frames = dom.querySelectorAll('iframe')
    frames.forEach(frame => {
      frame.setAttribute('src', '#')
    })
    const embeds = dom.querySelectorAll('embed')
    embeds.forEach(embed => {
      embed.setAttribute('src', '#')
    })
    const scripts = dom.querySelectorAll('script')
    scripts.forEach(script => {
      script.remove()
    })
    const styles = dom.querySelectorAll('style')
    styles.forEach(style => {
      style.remove()
    })
    const meta = dom.querySelectorAll('meta')
    meta.forEach(meta => {
      meta.remove()
    })
    return dom.body.innerHTML
  }
  return clean
}
