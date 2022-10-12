import styled from 'styled-components'

export const PageLoader = styled.div`
  display: ${(props) => (props.isLoading ? 'block' : 'none')};
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: calc(100% - 80px);
  background: rgba(255, 255, 255, 0.75);
  z-index: 999;
`
