import { useState } from 'react'
import styled from 'styled-components'
import { InputMask, useMask } from '@react-input/mask'

export default function PhoneInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  tip,
  rightSlot,
  size,
  type,
  validate = () => true,
  isRead,
  style = {},
}) {
  const [focus, setFocus] = useState(false)
  const inputRef = useMask({
    mask: '+__ ___ ___-__-__',
    replacement: { _: /\d/ },
  })

  return (
    <Wrapper style={style}>
      <InputField
        ref={inputRef}
        id={id}
        name={name}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value
          if (!newValue) return onChange('')
          const isValid = newValue && validate(newValue)
          if (newValue && isValid && onChange) {
            onChange(newValue)
          } else {
            e.target.value = value || ''
          }
        }}
        placeholder={placeholder}
        size={size}
        type={type === 'date' ? (focus ? type : 'text') : type}
        readonly={isRead}
        onFocus={() => type === 'date' && setFocus(true)}
        onBlur={() => type === 'date' && setFocus(false)}
      />

      <InputFieldRightSlot>{rightSlot}</InputFieldRightSlot>

      {tip && <InputTip>{tip}</InputTip>}
      <InputError show={!!error}>{error}</InputError>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const InputField = styled.input`
  width: 100%;
  height: ${(props) => (props.size === 'large' ? '60px' : '48px')};
  padding: 0 24px;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  transition: all 0.3s;

  border-radius: 1000px;
  border: 1px solid #e6e6e6;
  background: #fff;

  &:first-child {
    color: #313536 !important;
  }

  &::placeholder {
    color: rgba(49, 53, 54 0.5);
  }

  &:focus {
    border-color: #313536;
    outline: none;
  }
`

const InputTip = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #313536;
  right: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`

const InputFieldRightSlot = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`

const InputError = styled.div`
  font-size: 12px;
  color: red;
  transition: all 0.3s;
  padding: ${({ show }) => (show ? '4px 0 0 20px' : '0 0 0 20px')};
  max-height: ${({ show }) => (show ? '32px' : '0')};
  opacity: (${({ show }) => (show ? '1' : '0')});
`
