import styled from 'styled-components'
import { Card, Text, H5, Spacer, Box } from '../../common'

const SummaryDetails = ({ data }) => {
  if (!data) return
  return (
    <Card>
      <H5>Загальна площа земельних ділянок: {data.all || 0} гектарів</H5>
      <Spacer vertical size="20px" />
      <Box wrap="true" gap="20px 0">
        <Column gap="4px">
          <Text>Площа власних земель:</Text>
          <Text color="grey">{data.owned || 0} гектарів</Text>
        </Column>
        <Column gap="4px">
          <Text>Площа ризикових земель: </Text>
          <Text color="grey">{data.risk || 0} гектарів</Text>
        </Column>
        <Column gap="4px">
          <Text>Площа орендованих земель: </Text>
          <Text color="grey">{data.rented || 0} гектарів</Text>
        </Column>
        <Column gap="4px">
          <Text>Площа насаджень сорту: </Text>
          <Text color="grey">-- гектарів</Text>
          <Box>
            <Text color="grey">(</Text>
            <Text color="primary">оберіть сорт</Text>
            <Text color="grey">)</Text>
          </Box>
        </Column>
      </Box>
    </Card>
  )
}

export default SummaryDetails

const Column = styled(Box)`
  min-width: 400px;
  width: 40%;

  @media (max-width: 1200px) {
    width: calc(50% - 16px);
    min-width: unset;
    flex-wrap: wrap;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`
