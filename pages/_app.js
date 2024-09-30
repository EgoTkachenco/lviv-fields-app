import 'react-datepicker/dist/react-datepicker.css'
import { uk } from 'date-fns/locale'
import { registerLocale } from 'react-datepicker'
registerLocale('uk', uk)

import '../styles/globals.css'
// import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { Auth as store } from '../store'
import AOS from 'aos'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.browser) {
      // AOS.init()
      store.relog()
    }
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
