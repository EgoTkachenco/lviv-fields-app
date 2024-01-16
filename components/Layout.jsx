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
  background: #f3f4f6;
`

const AuthContent = styled.div`
  flex-grow: 1;
  position: relative;
  background: #d5d7e3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/auth-back.png') center center;
    background-size: cover;
  }
`
const DefaultContent = styled.div`
  padding: 30px;
  min-height: calc(100vh - 80px);
  max-height: calc(100vh - 80px);
  background: #f3f4f6;
  display: flex;
  flex-direction: column;
  overflow: auto;

  @media (max-width: 600px) {
    padding: 20px 20px 80px;
  }
`

const DashboardContent = styled.div`
  background: #f3f4f6;
  padding: 30px;
  min-height: calc(100vh - 80px);
  max-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow: auto;

  @media (max-width: 600px) {
    padding: 20px 20px 80px;
  }
`
