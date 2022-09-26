import '../styles/globals.css'
import { useEffect } from 'react'
import { Auth as store } from '../store'
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.browser) store.relog()
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
