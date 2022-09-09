import { useState } from 'react'
import styled from 'styled-components'
import { Card, H5, Spacer, Box, Input, Checkbox, Button, Icon } from '../common'

const Filter = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <FilterButton type="success" onClick={() => setOpen(!open)}>
        Фiльтр
      </FilterButton>
      <FilterCard open={open}>
        <FilterCloseButton onClick={() => setOpen(false)}>
          <Icon icon="close" />
        </FilterCloseButton>
        <FilterInner>
          <H5>Тип земельної ділянки</H5>
          <Spacer vertical size="20px" />
          <Box gap="20px" wrap="true">
            <Checkbox label="Власні земельні ділянки" />
            <Checkbox label="Орендовані земельні ділянки" />
            <Checkbox label="Ризикові земельні ділянки" />
          </Box>
          <Spacer vertical size="30px" />
          <H5>Клас земельної ділянки</H5>
          <Spacer vertical size="20px" />
          <Box gap="20px" wrap="true">
            <Checkbox label="Вільні ділянки" />
            <Checkbox label="Засаджені ділянки" />
            <Checkbox label="Викорчувані ділянки" />
          </Box>
          <Spacer vertical size="30px" />
          <H5>Сорт насаджень</H5>
          <Spacer vertical size="20px" />
          <Input
            placeholder="Пошук"
            tip={<SearchIcon src="/icons/search.svg" />}
          />
          <Spacer vertical size="20px" />
          <SortsBox gap="20px" direction="column">
            <Checkbox label="Ред" />
            <Checkbox label="Гала" />
            <Checkbox label="Фуджі" />
            <Checkbox label="Ред" />
            <Checkbox label="Гала" />
            <Checkbox label="Фуджі" />
          </SortsBox>
          <Spacer vertical size="30px" />
          <H5>Рік насаджень</H5>
          <Spacer vertical size="20px" />
          <Box align="center" justify="space-between" gap="16px">
            <Input placeholder="2011" />
            <FilterDelimiter />
            <Input placeholder="2022" />
          </Box>
          <Spacer vertical size="30px" />
          <H5>Термiн дії договору</H5>
          <Spacer vertical size="20px" />
          <Box align="center" justify="space-between" gap="16px">
            <Input placeholder="3" />
            <FilterDelimiter />
            <Input placeholder="10" />
          </Box>
          <Spacer vertical size="30px" />
          <Button type="accent">застосувати</Button>
          <Spacer vertical size-sm="16px" />
          <Button type="text">скинути</Button>
        </FilterInner>
      </FilterCard>
    </>
  )
}

export default Filter

const FilterCard = styled(Card)`
  padding: 40px;

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
    padding: 60px 30px;
    overflow: auto;

    * {
      color: #ffffff !important;
    }
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
    display: block;
  }
`

const FilterInner = styled.div`
  overflow: auto;
  max-height: 100%;
  margin-right: -20px;
  padding-right: 20px;
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

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
`

const SortsBox = styled(Box)`
  max-height: 100px;
  overflow: auto;
`
