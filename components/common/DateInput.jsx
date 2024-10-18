import React, { useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { formatDate } from '../../utils'

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
  validate = () => true,
  isRead,
  style = {},
  unstyled = false,
  disabled = false,
}) {
  const [focus, setFocus] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const datepickerRef = useRef()

  const handleChangeRaw = (event) => {
    let inputValue = event.target.value

    if (!inputValue) {
      onChange(null)
      setInputValue('')
      return
    }

    if (inputValue.length === 10) {
      const [day, month, year] = inputValue.split('.')
      const newDate = new Date([month, day, year].join('/'))
      const isValid = newDate.toString() !== 'Invalid Date'
      if (!isValid) {
        setInputValue(inputValue)
        return
      }

      onChange(newDate)
      setInputValue('')
      setFocus(false)
      datepickerRef.current.setOpen(false)
    } else {
      setInputValue(inputValue)
    }
  }

  const DateInputComponent = unstyled ? DatePicker : InputField

  const selectedDate = useMemo(() => {
    if (!value) return undefined
    const date = new Date(value)
    if (date.toString() === 'Invalid Date') return undefined
    return value
  }, [value])

  return (
    <Wrapper style={style}>
      <ErrorBoundary>
        <DateInputComponent
          ref={datepickerRef}
          id={id}
          locale="uk"
          name={name}
          value={focus ? inputValue : value ? formatDate(value) : ''}
          selected={selectedDate}
          // selected={value}
          onSelect={(value) => {
            const newValue = value
            if (!newValue) return onChange('')
            const isValid = newValue && validate(newValue)
            if (newValue && isValid && onChange) {
              onChange(newValue)
              setFocus(false)
            }
          }}
          onChangeRaw={handleChangeRaw}
          placeholderText={placeholder}
          size={size}
          type="date"
          readonly={isRead}
          disabled={disabled}
          format="dd.MM.yyyy"
          onFocus={() => {
            setFocus(true)
            if (!inputValue) setInputValue(value ? formatDate(value) : '')
          }}
          onBlur={() => {
            setFocus(false)
            setInputValue('')
          }}
        />
      </ErrorBoundary>

      <InputFieldRightSlot>{rightSlot}</InputFieldRightSlot>

      {tip && <InputTip>{tip}</InputTip>}
      <InputError show={!!error}>{error}</InputError>
    </Wrapper>
  )
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
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
