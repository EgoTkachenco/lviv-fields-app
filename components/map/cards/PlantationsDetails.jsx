import { useState } from 'react'
import styled from 'styled-components'
import { Card, Select, H5, Spacer, Box, Icon } from '../../common'
import { useAPIVarieties } from '../../../hooks'
import { useClickOutside } from '@mantine/hooks'

const YEARS_OPTIONS = new Array(20)
  .fill(null)
  .map((_, i) => new Date().getFullYear() - i)

const PlantationsDetails = ({ data, isRead, onChange }) => {
  const onNewPlantation = () => onChange('new-plantation')

  return (
    <Card>
      <H5>Інформація про насадження:</H5>
      <Spacer vertical size="20px" />
      <Box wrap="true">
        <Row>
          <HeaderLabel title="Сорт">Сорт</HeaderLabel>
          <HeaderLabel title="Кількість насаджень">
            Кількість насаджень
          </HeaderLabel>
          <HeaderLabel title="Кількість насаджень">Рік насаджень</HeaderLabel>
        </Row>
        <ScrollContent>
          {data.plantations.map((plantation, i) => (
            <Row key={plantation.id || i}>
              <Autocomplete
                value={plantation.variety}
                onChange={(value) =>
                  onChange('plantation-variety', { value, index: i })
                }
                isRead={isRead}
              />
              <InputLabel
                value={plantation.size}
                readOnly={isRead}
                onChange={(e) =>
                  onChange('plantation-size', {
                    value: e.target.value,
                    index: i,
                  })
                }
              />
              <Select
                value={plantation.year}
                onChange={(value) =>
                  onChange('plantation-year', { value, index: i })
                }
                isRead={isRead}
                options={YEARS_OPTIONS}
              />
              {!isRead && (
                <CloseButton
                  onClick={() => onChange('delete-plantation', i)}
                  title="Видалити"
                >
                  <Icon icon="close" size="12px" />
                </CloseButton>
              )}
            </Row>
          ))}
        </ScrollContent>

        {!isRead && (
          <LabelButton
            onClick={onNewPlantation}
            title="Створити нову плантацію"
          >
            Додати
          </LabelButton>
        )}
      </Box>
    </Card>
  )
}

export default PlantationsDetails

const LabelStyles = `
	width: calc(100% / 3);
	max-width: calc(100% / 3);
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
  display: flex;
  justify-content: stretch;
  width: 100%;
  position: relative;
  gap: 0;
  background: rgba(116, 140, 142, 0.2);

  & input {
    border: none;
  }

  & > * {
    margin: 2px 0;
    flex: 1 1 calc(100% / 3);
  }

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

const CloseButton = styled.button`
  right: -8px;
  top: 50%;
  transform: translate(100%, -50%);
  position: absolute;
  border: none;
  background: none;
  cursor: pointer;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  path {
    fill: #464f60;
  }
`

const Autocomplete = ({ value, onChange, isRead }) => {
  const [isFocused, setFocused] = useState(false)
  const ref = useClickOutside(() => handleFocus(false))
  const { varieties, search, onCreate, onSearch } = useAPIVarieties()

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
  & > div {
    max-width: unset;
    width: 100%;
    min-height: 41px;
  }
`
