import React from 'react'
import styled from 'styled-components'

const ButtonCore = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.3s;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: ${(props) => props.fontSize};
  line-height: 120%;
  font-family: 'TT Fors Trial';
  padding: ${(props) => props.padding};
  border: 1px solid transparent;
  path {
    transition: all 0.3s;
  }

  &:disabled {
    opacity: 0.8;
    cursor: default;
  }
`

const PrimaryButton = styled(ButtonCore)`
  border-radius: 1000px;
  border: 1px solid #313536;
  background: white;
  color: #313536;
  font-weight: 500;
  &:hover {
    /* background: #ffffff;
    color: #407cff;
    border-color: #407cff;

    path {
      fill: #407cff;
    } */
  }
`
const GreyButton = styled(ButtonCore)`
  background: #94a5d0;
  box-shadow: 0px 20px 40px rgba(197, 206, 231, 0.25);
  border-radius: 30px;
  color: #ffffff;
  text-transform: unset;
`
const PrimaryOutlineButton = styled(ButtonCore)`
  border-radius: 30px;
  border-color: #407cff;
  color: #407cff;
  background: #ffff;
  font-weight: 600;

  &:hover {
    background: #407cff;
    color: #ffffff;

    path {
      fill: #ffffff;
    }
  }
`

const SuccessButton = styled(ButtonCore)`
  border-radius: 1000px;
  background: #748c8e;
  color: #ffffff;
  font-weight: 500;
`

const WhiteButton = styled(ButtonCore)`
  border-radius: 30px;
  background: #ffffff;
  color: #407cff;
  font-size: 16px;
  line-height: 19px;
  color: #464f60;
  text-transform: unset;

  &:hover {
    background: #94a5d0;
    color: #ffffff;

    path {
      fill: #ffffff;
    }
  }
`

const TextButton = styled(ButtonCore)`
  background: transparent;
  border-radius: none;
  color: #313536 !important;
  font-weight: 400;
  font-size: 14px;
  padding: 12px 16px;
  height: auto;
`

const SuccessTextButton = styled(ButtonCore)`
  background: transparent;
  color: #748c8e !important;
  font-size: 18px;
  line-height: normal;
  font-weight: 500;
`

const AccentButton = styled(ButtonCore)`
  border-radius: 30px;
  background: radial-gradient(
    96.86% 382.9% at 97.29% 3.14%,
    #407cff 0%,
    #7073e6 50.52%,
    #b976fc 100%
  );
  color: #ffffff;
  font-weight: 600;

  &:hover {
    background: radial-gradient(
      96.86% 382.9% at 97.29% 3.14%,
      #407cff 0%,
      #407cff 50.52%,
      #407cff 100%
    );
  }
`
const variants = {
  primary: PrimaryButton,
  'primary-outline': PrimaryOutlineButton,
  success: SuccessButton,
  grey: GreyButton,
  accent: AccentButton,
  white: WhiteButton,
  text: TextButton,
  'success-text': SuccessTextButton,
}
const getVariant = (variant) => variants[variant] || TextButton

const sizes = {
  small: { height: '32px', padding: '8px 16px', fontSize: '12px' },
  medium: { height: '46px', padding: '20px 24px', fontSize: '18px' },
}
const getSize = (size = 'medium') => sizes[size] || sizes['medium']

const Button = React.forwardRef(function Button(
  { variant = 'primary', children, ...props },
  ref
) {
  const sizesProps = getSize(props.size)
  delete props.size
  return (
    <ButtonCore
      as={getVariant(variant)}
      {...props}
      {...sizesProps}
      type={props.type || 'button'}
    >
      {children}
    </ButtonCore>
  )
})

export default Button
