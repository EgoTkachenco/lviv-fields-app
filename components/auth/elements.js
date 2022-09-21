import styled from 'styled-components'
import { Text } from '../common'

export const AuthCard = styled.form`
  background: #ffffff;
  box-shadow: 0px 20px 40px rgba(197, 206, 231, 0.25);
  border-radius: 30px;
  max-width: 549px;
  width: 100%;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 30px;
  }
  @media (max-width: 500px) {
    padding: 30px 24px;
  }
`

export const ButtonText = styled(Text)`
  position: relative;
  display: block;
  text-align: center;
  margin: 16px 0;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background: #e9edf2;
    height: 1px;
    width: calc(50% - 32px);
  }
  &:before {
    top: 50%;
    left: 0;
  }
  &:after {
    top: 50%;
    right: 0;
  }
`
