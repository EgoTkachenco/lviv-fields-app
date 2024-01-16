import styled from 'styled-components'

const Chip = ({ children, color = 'black', type }) => (
  <StyledChip color={color} type="type">
    {children}
  </StyledChip>
)

export default Chip

const COLORS = {
  black: '#000',
  primary: '#748C8E',
}

const getColor = (props) =>
  props.color && COLORS.hasOwnProperty(props.color)
    ? COLORS[props.color]
    : COLORS.black

const StyledChip = styled.div`
  background: ${(props) => getColor(props)};
  min-height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ type }) => (type === 'large' ? '22px' : '18px')};
  font-weight: ${({ type }) => (type === 'large' ? 500 : 400)};
  line-height: 1;
  color: white;
  padding: 10px;
  border-radius: 3px;
  display: inline-block;
`
