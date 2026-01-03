import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    // If there's a hash (anchor), try to scroll to the element; otherwise scroll to top
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'auto' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
