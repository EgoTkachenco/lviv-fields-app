import styled from 'styled-components'
import { Card, H5, Box, Spacer, Text } from './common'

const Details = () => {
  return (
    <DetailsCard>
      <H5>Загальна площа земельних ділянок: 5,6704 гектарів</H5>
      <Spacer vertical size="20px" />
      <Box wrap="true" gap="20px 0">
        <Column gap="4px">
          <Text>Площа власних земель:</Text>
          <Text color="grey">15 гектарів</Text>
        </Column>
        <Column gap="4px">
          <Text>Площа ризикових земель: </Text>
          <Text color="grey">5 гектарів</Text>
        </Column>
        <Column gap="4px">
          <Text>Площа орендованих земель: </Text>
          <Text color="grey">30 гектарів</Text>
        </Column>
        <Column gap="4px">
          <Text>Площа насаджень сорту: </Text>
          <Text color="grey">13 гектарів</Text>
          <Text>(</Text>
          <Text color="primary">оберіть сорт</Text>
          <Text>)</Text>
        </Column>
      </Box>
    </DetailsCard>
  )
}

export default Details

const DetailsCard = styled(Card)`
  grid-area: details;
  padding: 40px;
`

const Column = styled(Box)`
  min-width: 400px;
  width: 40%;
`
