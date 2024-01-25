import styled from 'styled-components'
import { Button, Icon } from '../common'

const BackLink = ({ action }) => {
  return (
    <CustomButton variant="primary" onClick={action}>
      <Icon icon="chevron" size="6px" />
      Повернутися на головну
    </CustomButton>
  )
}

const CustomButton = styled(Button)`
  width: 200px;
  /* margin-top: 24px; */
  position: absolute;
  z-index: 99;
  bottom: 16px;
  left: 16px;
  /* background: #eceff7; */
  /* width: auto; */
  /* border-radius: 4px; */
  height: 32px;
  font-size: 12px;
  padding: 4px 8px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export default BackLink
