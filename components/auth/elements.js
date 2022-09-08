import styled from 'styled-components'
import { Card, Text } from '../common'

export const AuthCard = styled(Card)`
  max-width: 549px;
  width: 100%;
  padding: 40px;

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
