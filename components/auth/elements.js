import styled from 'styled-components'
import { Text } from '../common'

export const AuthCard = styled.form`
  background: #ffffff;
  border-radius: 30px;
  max-width: 566px;
  width: 100%;
  padding: 36px 40px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0;
    height: ${(props) => (!!props.loading ? '4px' : '0')};
    border-radius: 4px;
    background: #748c8e;
    animation: 2s topLoader linear infinite;
    z-index: 100;
  }

  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${(props) => (props.loading ? '100%' : '0')};
    background: rgba(255, 255, 255, 0.6);
    z-index: 100;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
  @media (max-width: 500px) {
    padding: 30px 24px;
  }

  .expand-icon {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 18px;
    height: 18px;
    background: url('/icons/expand.svg');
  }
`

export const ButtonText = styled(Text)`
  position: relative;
  display: block;
  text-align: center;
  margin: 12px 0;
`
