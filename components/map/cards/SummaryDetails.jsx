import styled from 'styled-components'
import { Card, H5, Spacer, Box, Chip, Button, Input } from '../../common'
import { useState, useEffect } from 'react'
import { CardField } from './elements/CardField'

const SummaryDetails = ({
  isEditable,
  data,
  onMapDetailsUpdate,
  onAreaDetailsUpdate,
}) => {
  const [isRead, setIsRead] = useState(true)
  const [plantationSize, setPlantationSize] = useState(0)

  useEffect(() => {
    if (!data) return

    setIsRead(true)
    if (data.area) {
      setPlantationSize(data.area.plantation_size || 0)
    } else if (data.mapInfo) {
      setPlantationSize(data.mapInfo.plantation_size || 0)
    } else {
      setPlantationSize(0)
    }
  }, [data])

  if (!data) return

  const toggleSave = () => {
    if (isRead) {
      setIsRead(false)
    } else {
      if (data.area) {
        onAreaDetailsUpdate({ plantation_size: plantationSize })
      } else {
        onMapDetailsUpdate({ plantation_size: plantationSize })
      }
      setIsRead(true)
    }
  }

  return (
    <Card>
      <Box justify="space-between">
        <H5>
          Загальна площа земельних ділянок:{' '}
          <Chip color="black" type="large">
            {data.all.toFixed(4) || 0} гектарів
          </Chip>
        </H5>
        {isEditable && (
          <Button width="100px" size="small" onClick={toggleSave}>
            {isRead ? 'Редагувати' : 'Зберегти'}
          </Button>
        )}
      </Box>
      <Spacer vertical size="20px" />
      <Box wrap="true" gap="20px 50px">
        <CardField
          styledBox={Column}
          isRead={true}
          label="Площа ділянок в оренді"
          value={(data.rented?.toFixed(2) || 0) + ' гектарів'}
        />
        <CardField
          styledBox={Column}
          isRead={true}
          label="Площа власних ділянок"
          value={(data.owned?.toFixed(2) || 0) + ' гектарів'}
        />
        <CardField
          styledBox={Column}
          isRead={true}
          label="Площа інших ділянок"
          value={
            (((data.all || 0) - (data.rented || 0)).toFixed(2) || 0) +
            ' гектарів'
          }
        />
        <CardField
          styledBox={Column}
          isRead={isRead}
          label="Площа під насадження"
          value={plantationSize + ' гектарів'}
          editableSlot={
            <Input
              type="number"
              value={plantationSize}
              onChange={(value) => setPlantationSize(value)}
            />
          }
        />
        {/* <Column gap="4px">
          <Text>Площа ділянок в оренді: </Text>
          <Chip color="primary">{data.rented?.toFixed(2) || 0} гектарів</Chip>
        </Column> */}
        {/* <Column gap="4px">
          <Text>Площа власних ділянок:</Text>
          <Chip color="primary">{data.owned?.toFixed(2) || 0} гектарів</Chip>
        </Column> */}
        {/* <Column gap="4px">
          <Text>Площа інших ділянок: </Text>
          <Chip color="primary">
            {((data.all || 0) - (data.rented || 0)).toFixed(2) || 0} гектарів
          </Chip>
        </Column> */}
        {/* <Column gap="4px">
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
        </Column> */}
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
