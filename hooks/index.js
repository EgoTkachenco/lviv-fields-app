import { useEffect } from 'react'

export const useNoBodyScroll = (open) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])
}
