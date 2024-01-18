import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Card,
  H5,
  Text,
  Spacer,
  Box,
  Input,
  Checkbox,
  Button,
  Icon,
} from '../../common'
import { useNoBodyScroll, useAPIVarieties } from '../../../hooks'
import {
  FIELD_TYPES,
  FIELD_CATEGORIES,
  FIELD_TYPES_COLORS,
} from '../../../store/help/constants'

const Filter = ({ filter, onChange, onSubmit, onClear }) => {
  const [open, setOpen] = useState(false)
  useNoBodyScroll(open)
  const { search, varieties, onSearch: onSearchVarieties } = useAPIVarieties()

  const clearFilter = () => {
    onClear()
    onSearchVarieties('')
  }

  const handleSubmit = () => {
    onSubmit()
    setOpen(false)
  }

  if (filter.cadastrs.length > 0)
    return (
      <>
        <FilterButton variant="success" onClick={() => setOpen(!open)}>
          Фiльтр
        </FilterButton>
        <FilterCard open={open}>
          <FilterCloseButton onClick={() => setOpen(false)}>
            <Icon icon="close" />
          </FilterCloseButton>
          <FilterInner>
            <H5 align="center">Застосовано фільтр з реєстру</H5>
            <Spacer vertical size="48px" />
            <Button variant="text" onClick={clearFilter}>
              скинути
            </Button>
          </FilterInner>
        </FilterCard>
      </>
    )

  return (
    <>
      <FilterButton variant="success" onClick={() => setOpen(!open)}>
        Фiльтр
      </FilterButton>
      <FilterCard open={open}>
        <FilterCloseButton onClick={() => setOpen(false)}>
          <Icon icon="close" />
        </FilterCloseButton>
        <FilterInner>
          <H5>Тип земельної ділянки</H5>
          <Spacer vertical size="12px" />
          <Box gap="16px" direction="column">
            {Object.keys(FIELD_TYPES).map((type) => (
              <Checkbox
                key={type}
                label={FIELD_TYPES[type]}
                value={filter.type.includes(type)}
                onChange={() => onChange('type', type)}
                color={FIELD_TYPES_COLORS[type]}
              />
            ))}
          </Box>
          <Spacer vertical size="20px" />
          <H5>Клас земельної ділянки</H5>
          <Spacer vertical size="12px" />
          <Box gap="16px" direction="column">
            {Object.keys(FIELD_CATEGORIES).map((category) => (
              <Checkbox
                key={category}
                label={FIELD_CATEGORIES[category]}
                value={filter.category.includes(category)}
                onChange={() => onChange('category', category)}
              />
            ))}
          </Box>
          <Spacer vertical size="20px" />
          <H5>Сорт насаджень</H5>
          <Spacer vertical size="12px" />
          <Input
            value={search}
            onChange={onSearchVarieties}
            placeholder="Пошук"
            name="search"
            tip={
              <SearchIcon>
                <Icon icon="search" size="20px" />
              </SearchIcon>
            }
            size="large"
          />
          <Spacer vertical size="20px" />
          <SortsBox gap="16px" direction="column">
            {varieties.length > 0 ? (
              varieties.map((variety) => (
                <Checkbox
                  key={variety.id}
                  label={variety.name}
                  value={filter.varieties.includes(variety.id)}
                  onChange={() => onChange('varieties', variety.id)}
                />
              ))
            ) : (
              <Text align="center">Немає результатів</Text>
            )}
          </SortsBox>
          <Spacer vertical size="20px" />
          <RangeBox>
            <div>
              <H5>Рік насаджень</H5>
              <Spacer vertical size="12px" />
              <Box align="center" justify="space-between" gap="16px">
                <Input
                  value={filter.year.start}
                  validate={(v) => !isNaN(Number(v)) && v > 0 && v < 3000}
                  placeholder="2011"
                  onChange={(val) => onChange('year-start', val)}
                />
                <FilterDelimiter />
                <Input
                  value={filter.year.end}
                  validate={(v) => !isNaN(Number(v)) && v > 0 && v < 3000}
                  placeholder="2022"
                  onChange={(val) => onChange('year-end', val)}
                />
              </Box>
            </div>
            <Spacer size="24px" />
            <div>
              <H5>Термiн дії договору</H5>
              <Spacer vertical size="12px" />
              <DateBox align="center" justify="space-between" gap="8px">
                <Input
                  value={filter.term.start}
                  type="date"
                  // validate={(v) => !isNaN(Number(v)) && v > 0 && v < 100}
                  placeholder="3"
                  onChange={(val) => onChange('term-start', val)}
                />
                <FilterDelimiter />
                <Input
                  value={filter.term.end}
                  type="date"
                  // validate={(v) => !isNaN(Number(v)) && v > 0 && v < 100}
                  placeholder="10"
                  onChange={(val) => onChange('term-end', val)}
                />
              </DateBox>
            </div>
          </RangeBox>
        </FilterInner>
        <Spacer vertical size="24px" style={{ marginTop: 'auto' }} />
        <Button variant="success" onClick={handleSubmit}>
          Застосувати
        </Button>
        <Spacer vertical size-sm="16px" />
        <Button variant="success-text" onClick={clearFilter}>
          Скинути
        </Button>
      </FilterCard>
    </>
  )
}

export default Filter

const FilterCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
  max-height: calc(100vh - 80px - 60px);
  border-radius: 18px;
  border: 1px solid #000;

  @media (max-width: 1200px) {
    display: ${(props) => (props.open ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    background: #2e3548;
    border-radius: 0;
    max-height: 100vh;
    padding: 60px 30px 80px;
    overflow: auto;

    * {
      color: #ffffff !important;
    }
  }
`

const DateBox = styled(Box)`
  & > :nth-child(1),
  & > :nth-child(3) {
    width: calc((100% - 20px - 16px) / 2);
  }
`

const RangeBox = styled(Box)`
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`

const FilterCloseButton = styled.button`
  position: absolute;
  display: none;
  background: none;
  border: none;
  padding: 0;
  top: 30px;
  right: 30px;
  cursor: pointer;
  @media (max-width: 1200px) {
    display: block;
  }
`

const FilterButton = styled(Button)`
  display: none;
  @media (max-width: 1200px) {
    display: flex;
  }
`

const FilterInner = styled.div`
  overflow: auto;
  width: 100%;
  height: 100%;
  max-height: 100%;
  margin-right: -20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    max-width: 315px;
    overflow: auto;
    max-height: unset;
    margin: 0 auto;
    padding-right: 0;
  }
`

const FilterDelimiter = styled.div`
  background: #d7dce1;
  height: 1px;
  width: 20px;
`

const SearchIcon = styled.div`
  width: 55px;
  height: 55px;
  background: #313536;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -20px;
`

const SortsBox = styled(Box)`
  min-height: 105px;
  flex-grow: 1;
  /* max-height: 65px; */
  overflow: auto;
  & > * {
    flex-grow: 0;
    width: 100%;
  }
`
