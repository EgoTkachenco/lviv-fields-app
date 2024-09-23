import styled from 'styled-components'
import Icon from './Icon'

export default function Checkbox({
  value,
  onChange,
  label,
  color,
  disabled = false,
}) {
  const onClick = (event) => {
    event.preventDefault()
    if (disabled) return
    onChange(!value)
  }

  return (
    <Wrapper onClick={onClick} disabled={disabled}>
      <Box color={color} active={!!value}>
        <Icon icon="check" />
      </Box>
      <Label>{label}</Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-grow: 1;
  opacity: ${({ disabled }) => (disabled ? 0.75 : 1)};
`

const Box = styled.div`
  border: 1px solid #313536;
  border-radius: 3px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  background: ${({ color }) => color || '#ffffff'};

  & > * {
    cursor: pointer;
    opacity: ${({ active }) => (active ? 1 : 0)};
  }
`

const Label = styled.div`
  font-size: 14px;
  line-height: normal;
  color: #313536;
`
