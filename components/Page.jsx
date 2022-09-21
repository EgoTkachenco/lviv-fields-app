import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getToken } from '../store/help/axios'
const Page = ({ children, isProtected = false }) => {
  const router = useRouter()
  const [inited, setInited] = useState(false)
  useEffect(() => {
    const isToken = getToken()
    if (isProtected && !isToken) {
      router.push('/login')
      return
    } else if (!isProtected && isToken) {
      router.push('/')
      return
    }
    setInited(true)
  }, [])

  return inited ? children : 'loading'
}

export default Page
