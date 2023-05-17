import styled from 'styled-components'
import Navigation from './navigation/Navigation'

export default function Layout({ children, type }) {
  const renderContent = () => {
    switch (type) {
      case 'auth':
        return <AuthContent>{children}</AuthContent>
      case 'dashboard':
        return <DashboardContent>{children}</DashboardContent>
      default:
        return <DefaultContent>{children}</DefaultContent>
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
  /* background: url('/auth-back.png') center center;
  background-size: cover; */
  background: #eceff7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`
const DefaultContent = styled.div`
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

const DashboardContent = styled.div`
  /* background: url('/back.png') center center; */
  background: url('/background.jpg') center center;
  background-size: cover;
  padding: 30px;
  /* min-height: calc(100vh - 80px); */
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: 600px) {
    padding: 20px 20px 80px;
  }
`
