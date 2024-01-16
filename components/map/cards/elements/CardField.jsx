import { Text, Box, Chip, H6 } from '../../../common'
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
      <StyledBox gap="16px 10px" align="center" wrap="true">
        <H6>{label}:</H6>
        <Chip color="primary">{value || 'немає'}</Chip>
      </StyledBox>
    )

  return (
    <StyledBox
      align="center"
      gap="16px 4px"
      justify="space-between"
      wrap="true"
    >
      <H6>{label}:</H6>
      {editableSlot}
    </StyledBox>
  )
}

export const Column = styled(Box)`
  width: 100%;

  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`

export const SmallColumn = styled(Column)`
  width: 35%;
  min-width: 400px;
  @media (max-width: 1700px) {
    width: calc(50% - 16px);
    min-width: unset;
  }

  @media (max-width: 800px) {
    width: 100%;
    flex-wrap: wrap;
    min-width: unset;
  }
`
