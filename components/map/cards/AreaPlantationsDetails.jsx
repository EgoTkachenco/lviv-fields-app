import { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Card, H5, Spacer, Box, Button } from '../../common'
import { useAPIVarieties } from '../../../hooks'
import { useClickOutside } from '@mantine/hooks'
import { CardField, Column } from './elements/CardField'

const AreaPlantationsDetails = ({ isEditable, area, onAreaDetailsUpdate }) => {
  const [isRead, setIsRead] = useState(true)
  const [activeSector, setActiveSector] = useState(null)
  const [schema, setSchema] = useState({})
  const [info, setInfo] = useState({})
  const { varieties } = useAPIVarieties()

  const getValue = useCallback(
    (id) => varieties.find((el) => el.id === id),
    [varieties]
  )

  const usedVarieties = useMemo(() => {
    if (!schema) return []

    const allRows = Object.values(schema).reduce(
      (acc, el) => [...acc, ...Object.values(el)],
      []
    )
    return [...new Set(allRows)].filter((el) => !!el).map(getValue)
  }, [schema, getValue])

  useEffect(() => {
    if (area && area?.plantation_schema) {
      setSchema({ ...area?.plantation_schema })
      setInfo({ ...area?.plantation_info })
      setActiveSector(Object.keys(area?.plantation_schema)[0])
    }
  }, [area])

  const onSchemaChange = (sector, row, variety) => {
    const newSchema = { ...schema }
    newSchema[sector][row] = variety

    const isNewVariety =
      usedVarieties.findIndex((el) => el.id === variety) === -1

    if (isNewVariety) onInfoChange(variety)

    setSchema(newSchema)
  }

  const onInfoChange = (variety, data) => {
    const newInfo = { ...info }
    if (newInfo[variety]) newInfo[variety] = { ...newInfo[variety], ...data }
    else newInfo[variety] = { size: 0, capacity: 0, ...data }
    setInfo(newInfo)
  }

  if (!area || !area?.plantation_schema) return null

  const areaPlantations = Object.keys(schema)

  const toggleSave = () => {
    if (isRead) {
      setIsRead(false)
    } else {
      onAreaDetailsUpdate({ plantation_schema: schema, plantation_info: info })
      setIsRead(true)
    }
  }

  return (
    <Card>
      <Box justify="space-between">
        <H5>Інформація про насадження:</H5>
        {isEditable && (
          <Button width="100px" size="small" onClick={toggleSave}>
            {isRead ? 'Редагувати' : 'Зберегти'}
          </Button>
        )}
      </Box>
      <Spacer vertical size="20px" />
      <H5>Загальна інформація:</H5>
      <Row cols={3}>
        <HeaderLabel>Сорт</HeaderLabel>
        <HeaderLabel>Площа (га)</HeaderLabel>
        <HeaderLabel>Врожайність (кг)</HeaderLabel>
      </Row>
      {usedVarieties.map((variety) => (
        <Row cols={3} key={variety.id}>
          <InputLabel value={variety.name} readOnly />
          <InputLabel
            value={info[variety.id]?.size || ''}
            onChange={(e) => onInfoChange(variety.id, { size: e.target.value })}
            readOnly={isRead}
          />
          <InputLabel
            value={info[variety.id]?.capacity || ''}
            onChange={(e) =>
              onInfoChange(variety.id, { capacity: e.target.value })
            }
            readOnly={isRead}
          />
        </Row>
      ))}
      <H5>Інформація по рядам:</H5>
      <Box direction="column" gap="12px">
        <Box>
          {areaPlantations.map((sector, i) => (
            <TabLabel
              key={sector}
              active={sector === activeSector}
              onClick={() => setActiveSector(sector)}
            >
              Сектор {i + 1}
            </TabLabel>
          ))}
        </Box>
        {activeSector && (
          <AreaPlantationSector
            isRead={isRead}
            schema={schema[activeSector]}
            getValue={getValue}
            onSchemaChange={(row, value) =>
              onSchemaChange(activeSector, row, value)
            }
          />
        )}
      </Box>
    </Card>
  )
}

const AreaPlantationSector = ({
  isRead,
  schema,
  onSchemaChange = () => {},
  getValue,
}) => {
  return (
    <Box direction="column" gap="8px">
      <CardField
        styledBox={Column}
        isRead
        label="Кількість рядів"
        value={Object.keys(schema).length}
      />
      <Row>
        <HeaderLabel>Номер ряду</HeaderLabel>
        <HeaderLabel>Сорт</HeaderLabel>
      </Row>
      <ScrollContent>
        {Object.keys(schema).map((row, i) => (
          <Row key={i}>
            <InputLabel value={row} readOnly />
            <Autocomplete
              value={getValue(schema[row])}
              onChange={(value) => onSchemaChange(row, value.id)}
              isRead={isRead}
            />
          </Row>
        ))}
      </ScrollContent>
    </Box>
  )
}

export default AreaPlantationsDetails

const LabelStyles = `
	padding: 11px 15px;
	border-radius: 0;
	font-weight: 400;
	font-size: 18px;
	line-height: 120%;
	color: #464f60;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;

	@media (max-width: 800px) {
		font-size: 12px;
		line-height: 16px;
	}
`

const HeaderLabel = styled.div`
  ${LabelStyles}
  background: rgba(116, 140, 142, 1);
  border-radius: 0;
  font-weight: 400;
  color: #fff;
`

const TabLabel = styled.div`
  ${LabelStyles}
  border-radius: 0;
  font-weight: 400;
  color: ${({ active }) => (active ? '#fff' : '#000')};
  background: ${({ active }) =>
    active ? 'rgba(116, 140, 142, 1)' : 'rgba(116, 140, 142, 0.25)'};
  cursor: pointer;
  &:hover {
    background: rgba(116, 140, 142, 0.5);
  }
`

const Label = styled.div`
  ${LabelStyles}
  background: #EDF1F8;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #ccd1e0;
  }
`

const InputLabel = styled.input`
  ${LabelStyles}
  outline: none;
  border: 1px solid #edf1f8;
  font-weight: 400;
  max-width: unset;
  &:read-only {
    cursor: default;
    border-color: transparent;
    background: transparent;
  }
`

const LabelButton = styled.button`
  ${LabelStyles}
  max-width: unset;
  width: 100%;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
  border: none;
  &:hover {
    background: transparent;
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: ${({ cols }) =>
    cols == 3 ? '1fr 1fr 1fr' : '1fr 2fr'};
  width: 100%;
  position: relative;
  gap: 0;
  background: rgba(116, 140, 142, 0.2);

  & > :nth-child(2) {
    border-left: 1px solid #748c8e;
    border-right: 1px solid #748c8e;
  }
`

const ScrollContent = styled.div`
  width: 100%;
  min-height: 150px;
  height: calc(100vh - 80px - 60px - 525px);
  max-height: calc(100vh - 80px - 60px - 525px);
  overflow: auto;
`

const Autocomplete = ({ value, onChange, isRead }) => {
  const [isFocused, setFocused] = useState(false)
  // const [varieties, setVarieties] = useState([])

  const { varieties, search, onCreate, onSearch } = useAPIVarieties()

  const ref = useClickOutside(() => handleFocus(false))

  const input_value = isFocused ? search : value ? value.name : ''
  const handleFocus = (isFocused) => {
    if (!isRead) {
      setFocused(isFocused)
      if (isFocused) onSearch('')
    }
  }
  const handleNewVariant = async () => {
    const newVariant = await onCreate()
    onChange(newVariant)
    setFocused(false)
  }
  return (
    <Container ref={ref}>
      <InputLabel
        value={input_value}
        readOnly={isRead}
        onFocus={() => handleFocus(true)}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Menu show={isFocused}>
        {varieties &&
          varieties.map((variant) => (
            <Label
              key={variant.id}
              onClick={() => {
                setFocused(false)
                onChange(variant)
              }}
            >
              {variant.name}
            </Label>
          ))}
        {varieties.length === 0 && (
          <LabelButton
            onClick={handleNewVariant}
            title="Створити новий тип насадження"
          >
            Додати до списку
          </LabelButton>
        )}
      </Menu>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  flex: 0 1 calc(100% / 3 - 4px);
  max-height: 150px;
  width: 100%;
  & > input {
    flex: 1 1 100%;
    width: 100%;
  }
`

const Menu = styled.div`
  position: absolute;
  width: 100%;
  top: calc(100% + 2px);
  left: 0;
  z-index: 100;
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 2px;
  background-color: white;
  max-height: 200px;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  & > div {
    max-width: unset;
    width: 100%;
    min-height: 41px;
  }
`
