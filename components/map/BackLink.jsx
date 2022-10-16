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
  bottom: 16px;
  left: 32px;
  background: #eceff7;
  width: auto;
  border-radius: 4px;
  height: 32px;
  font-size: 14px;
  padding: 4px 8px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export default BackLink
