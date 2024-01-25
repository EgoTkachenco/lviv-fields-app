import { Spacer } from '../common'
import Currencies from './Currencies'
import Links from './Links'
import Info from './Info'
import styled from 'styled-components'

export default function Dashboard() {
  return (
    <Container>
      <Currencies />
      <Info />
      <Links />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (max-width: 1500px) {
    gap: 32px;
  }

  @media (max-width: 600px) {
    gap: 24px;
  }
`
