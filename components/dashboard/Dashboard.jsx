import { Spacer } from '../common'
import Currencies from './Currencies'
import Links from './Links'
import Info from './Info'

export default function Dashboard() {
  return (
    <>
      <Currencies />
      <Spacer size="90px" vertical />
      <Info />
      <Spacer size="90px" vertical />
      <Links />
    </>
  )
}
