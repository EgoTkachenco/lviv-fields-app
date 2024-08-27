import styled from 'styled-components'
import { MAP_TYPES } from '../../../store/help/constants'

const MapType = ({ type, onChange }) => {
  return (
    <Container>
      <Button
        isActive={type === 'registry'}
        onClick={() => onChange('registry')}
      >
        {MAP_TYPES.registry}
      </Button>
      <Button
        isActive={type === 'plantation'}
        onClick={() => onChange('plantation')}
      >
        {MAP_TYPES.plantation}
      </Button>
    </Container>
  )
}

export default MapType

const Container = styled.div`
  display: flex;
  margin-bottom: 16px;
`

const Button = styled.button`
  flex-grow: 1;
  color: ${({ isActive }) => (isActive ? '#748c8e' : '#000')};
  font-weight: ${({ isActive }) => (isActive ? 500 : 400)};
  border: none;
  background: transparent;
  border-bottom: 1px solid
    ${({ isActive }) => (isActive ? '#748c8e' : '#e6e6e6')};
  height: 32px;
  cursor: pointer;
  transition: all 0.3s;
`
