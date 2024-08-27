import styled from 'styled-components'

const Layout = styled.div`
  display: flex;
  gap: 40px;
  flex-grow: 1;
  min-height: 600px;
  max-height: calc(100vh - 80px - 60px);

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

export default Layout

Layout.Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* max-height: 100%; */
  max-height: calc(100vh - 80px - 60px);
  max-width: calc(100vw - 550px - 40px - 60px);

  @media (max-width: 1500px) {
    max-width: calc(100vw - 450px - 40px - 60px);
  }

  @media (max-width: 1200px) {
    max-width: unset;
    max-height: unset;
  }
`
Layout.Side = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 550px;
  max-width: 550px;

  @media (max-width: 1500px) {
    min-width: 450px;
    max-width: 450px;
  }

  @media (max-width: 1200px) {
    max-width: 100%;
    min-width: unset;
  }
`
