import styled from 'styled-components'

const Box = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  align-items: ${(props) => props.align || 'flex-start'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  gap: ${(props) => props.gap || '0'};
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : 'unset')};
  width: ${(props) => props.width || 'auto'};

  @media (max-width: 768px) {
    flex-direction: ${(props) =>
      props['direction-sm'] || props.direction || 'row'};
    gap: ${(props) => props['gap-sm'] || props.gap || '0'};
    align-items: ${(props) => props['align-sm'] || props.align || 'flex-start'};
    justify-content: ${(props) =>
      props['justify-sm'] || props.justify || 'flex-start'};
  }
`

export default Box
