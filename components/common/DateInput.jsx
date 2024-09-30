import { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { formatDate } from '../../utils'
import { format } from 'date-fns'

export default function DateInput({
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

  return (
    <Wrapper style={style}>
      <InputField
        id={id}
        locale="uk"
        name={name}
        value={value && format(value, 'dd/MM/yyyy')}
        selected={value}
        onChange={(value) => {
          debugger
          const newValue = value
          if (!newValue) return onChange('')
          const isValid = newValue && validate(newValue)
          if (newValue && isValid && onChange) {
            onChange(newValue)
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

const InputField = styled(DatePicker)`
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
