import styled from 'styled-components'
import { Button } from '../common'

const BackLink = ({ action }) => {
  return (
    <CustomButton type="text" onClick={action}>
      Повернутися на головну
    </CustomButton>
  )
}

const CustomButton = styled(Button)`
  position: absolute;
  z-index: 99;
  bottom: 32px;
  left: 32px;
  background: #eceff7;
  width: auto;
  border-radius: 4px;
  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px 16px;
    height: auto;
  }
`

export default BackLink
