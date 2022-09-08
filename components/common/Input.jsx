import styled from 'styled-components'

export default function Input({
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
}) {
  return (
    <Wrapper>
      <InputField
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size={size}
        type={type}
      />

      <InputFieldRightSlot>{rightSlot}</InputFieldRightSlot>

      {tip && <InputTip>{tip}</InputTip>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

const InputField = styled.input`
  width: 100%;
  height: ${(props) => (props.size === 'large' ? '60px' : '48px')};
  border: 1px solid #e9edf2;
  border-radius: 30px;
  padding: 0 20px;
  font-family: 'Lato';
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #464f60;
  transition: all 0.3s;
  background: #ffffff;

  &::placeholder {
    color: #bbc0cd;
  }

  &:focus {
    border-color: #464f60;
    outline: none;
  }
`

const InputTip = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  background-color: #ffffff;
`

const InputFieldRightSlot = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
`
