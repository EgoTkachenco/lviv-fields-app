import { Text, Box } from '../../common'
import styled from 'styled-components'
export const CardField = ({
  isRead,
  label,
  value,
  editableSlot,
  styledBox = Box,
}) => {
  const StyledBox = styledBox
  if (isRead)
    return (
      <StyledBox gap="16px 4px" wrap>
        <Text>{label}:</Text>
        <Text color="grey">{value || 'немає'}</Text>
      </StyledBox>
    )

  return (
    <StyledBox align="center" gap="16px 4px" justify="space-between" wrap>
      <Text>{label}:</Text>
      {editableSlot}
    </StyledBox>
  )
}

export const Column = styled(Box)`
  width: 35%;
  @media (max-width: 1200px) {
    width: calc(50% - 16px);
  }
  @media (max-width: 800px) {
    width: 100%;
    flex-wrap: wrap;
  }
`
