import styled from 'styled-components'

export default function Checkbox({ value, onChange, label, color }) {
  return (
    <Wrapper onClick={() => onChange(!value)}>
      <Box>
        <Value active={!!value} color={color} />
      </Box>
      <Label>{label}</Label>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`
const Box = styled.div`
  border: 1px solid #d7dce1;
  border-radius: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  cursor: pointer;
`
const Value = styled.div`
  width: 14px;
  height: 14px;
  background: ${({ active, color }) =>
    active ? color || '#407cff' : 'transparent'};
  border-radius: 4px;
  transition: all 0.3s;
`
const Label = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: #464f60;
`
