import styled from 'styled-components'

export const BlockInner = styled.div`
  margin: auto;
  padding: 72px 0;
  max-width: 1128px;

  @media (max-width: 1200px) {
    padding: 72px 24px;
  }

  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`

export const BlockWrapper = styled.div`
  max-width: 100%;
  overflow: hidden;
`
