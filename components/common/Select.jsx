import styled from 'styled-components'
import { useState } from 'react'
import _ from 'lodash'
import { useClickOutside } from '@mantine/hooks'

const Select = ({ value, onChange, placeholder, options, isRead }) => {
  const [show, setShow] = useState()
  const handleClick = (option) => {
    onChange(option)
    setShow(false)
  }
  const ref = useClickOutside(() => setShow(false))

  return (
    <Container ref={ref}>
      <InputLabel
        value={value}
        title={value}
        readOnly
        placeholder={placeholder}
        onClick={() => !isRead && setShow(!show)}
      />
      <Menu show={show}>
        {options &&
          options.map((option, i) => (
            <Label
              key={option + i}
              onClick={() => handleClick(option)}
              title={option}
            >
              {option}
            </Label>
          ))}
      </Menu>
    </Container>
  )
}

export default Select

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 0 1 calc(100% / 3 - 4px);
  /* width: 300px; */
`

const Menu = styled.div`
  position: absolute;
  width: 100%;
  max-width: 100%;
  top: calc(100% + 2px);
  left: 0;
  z-index: 100;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 2px;
  background-color: white;
  max-height: 200px;
  overflow: auto;
`

const LabelStyles = `
	width: 100%;
	padding: 11px 15px;
	background: #EDF1F8;
	border-radius: 0;
	font-weight: 400;
	font-size: 16px;
	line-height: 19px;
	color: #464f60;
	text-overflow: ellipsis;
	white-space: nowrap;

	@media (max-width: 800px) {
		font-size: 12px;
		line-height: 16px;
	}
`

const Label = styled.div`
  ${LabelStyles}
  background: #EDF1F8;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  min-height: 40px;

  &:hover {
    background: #ccd1e0;
  }
`

const InputLabel = styled.input`
  ${LabelStyles}
  outline: none;
  border: 1px solid #edf1f8;
  font-weight: 400;
  cursor: pointer;
`
