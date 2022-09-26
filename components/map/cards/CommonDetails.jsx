import { Card, Text, H5, Spacer, Box } from '../../common'

const CommonDetails = () => {
  return (
    <Card>
      <H5>Параметри земельної ділянки:</H5>
      <Spacer vertical size="20px" />
      <Box gap="4px" wrap>
        <Text>Кадастровий номер:</Text>
        <Text color="grey">4623087600:10:000:0114</Text>
      </Box>
      <Spacer vertical size="20px" />

      <Box gap="4px" wrap>
        <Text>Площа: </Text>
        <Text color="grey">0,257га</Text>
      </Box>
      <Spacer vertical size="20px" />
      <Box gap="4px" wrap>
        <Text>Розташування:</Text>
        <Text color="grey">поле №7, ряди 10 - 13</Text>
      </Box>
    </Card>
  )
}

export default CommonDetails
