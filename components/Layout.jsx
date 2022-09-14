import styled from 'styled-components'
import Navigation from './Navigation'

export default function Layout({ children, type }) {
  const renderContent = () => {
    switch (type) {
      case 'auth':
        return <AuthContent>{children}</AuthContent>
      case 'map':
        return <DashboardContent>{children}</DashboardContent>
      // return <MapContent>{children}</MapContent>
      case 'dashboard':
      default:
        return <DashboardContent>{children}</DashboardContent>
    }
  }
  return (
    <Wrapper>
      <Navigation />
      {renderContent()}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const AuthContent = styled.div`
  flex-grow: 1;
  background: url('/auth-back.png') center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`
const DefaultContent = styled.div`
  flex-grow: 1;
`

const MapContent = styled.div`
  padding: 30px;
  min-height: calc(100vh - 80px);
  background: #eceff7;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 550px 1fr;
  /* grid-template-columns: 1fr 2fr; */
  grid-template-rows: 528px 184px auto;
  /* grid-template-rows: calc(100vh - 184px - 160px) 184px; */
  grid-template-areas:
    'filter map'
    'filter details';
  column-gap: 40px;
  row-gap: 20px;
`

const DashboardContent = styled.div`
  padding: 30px;
  min-height: calc(100vh - 80px);
  background: #eceff7;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: 600px) {
    padding: 20px 20px 80px;
  }
`
