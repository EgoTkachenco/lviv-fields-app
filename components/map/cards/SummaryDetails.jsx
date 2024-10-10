import styled from 'styled-components'
import { Card, Text, H5, Spacer, Box, Chip } from '../../common'
import { Fragment } from 'react'

const SummaryDetails = ({ data }) => {
  if (!data) return
  return (
    <Card>
      <H5>
        Загальна площа земельних ділянок:{' '}
        <Chip color="black" type="large">
          {data.all.toFixed(4) || 0} гектарів
        </Chip>
      </H5>
      <Spacer vertical size="20px" />
      <Box wrap="true" gap="20px 50px">
        <Column gap="4px">
          <Text>Площа ділянок в оренді: </Text>
          <Chip color="primary">{data.rented?.toFixed(2) || 0} гектарів</Chip>
        </Column>
        <Column gap="4px">
          <Text>Площа власних ділянок:</Text>
          <Chip color="primary">{data.owned?.toFixed(2) || 0} гектарів</Chip>
        </Column>
        <Column gap="4px">
          <Text>Площа інших ділянок: </Text>
          <Chip color="primary">
            {((data.all || 0) - (data.rented || 0)).toFixed(2) || 0} гектарів
          </Chip>
        </Column>
        <Column gap="4px">
          <Text>Площа насаджень сорту: </Text>

          {Object.keys(data.varieties).length > 0 ? (
            Object.keys(data.varieties).map((variety) => (
              <Fragment key={variety}>
                <Text color="grey">
                  {data.varieties[variety]?.toFixed(2) || 0} Га
                </Text>
                <Box>
                  <Text color="grey">(</Text>
                  <Text color="primary">{variety}</Text>
                  <Text color="grey">)</Text>
                </Box>
              </Fragment>
            ))
          ) : (
            <>
              <Text color="grey">-- гектарів</Text>
              <Box>
                <Text color="grey">(</Text>
                <Text color="primary">оберіть сорт</Text>
                <Text color="grey">)</Text>
              </Box>
            </>
          )}
        </Column>
      </Box>
    </Card>
  )
}

export default SummaryDetails

const Column = styled(Box)`
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 1200px) {
    width: calc(50% - 16px);
    min-width: unset;
    flex-wrap: wrap;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`
