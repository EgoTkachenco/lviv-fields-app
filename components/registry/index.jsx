import styled from 'styled-components'
import { Table, Input, Spacer, Icon } from '../common'
const Registry = () => {
  return (
    <>
      <Search>
        <Input placeholder="Пошук" rightSlot={<Icon icon="search" />} />
      </Search>
      <Spacer vertical size="30px" />
      <Wrapper>
        <Table model={model} data={data} sizes={sizes} />
      </Wrapper>
    </>
  )
}

export default Registry

const Wrapper = styled.div`
  max-width: calc(100vw - 40px);
  overflow: auto;
`
const Search = styled.div`
  max-width: 470px;
`

const data = new Array(20).fill({
  id: '11',
  name: 'Білявська Олександра Миколаївна',
  cadastr: '4621087600:10:000:0114',
  area: '0,5195',
  date: '25.12.2021',
  rentedYears: '49',
  rentedYearsOwner: '28',
  percent: '5',
  colision: 'Остра Ольга Михайлівна',
  note: 'Зміна власника',
  suborend_1: '№2 від 06.06.2016',
  suborend_2: '№2 від 06.06.2016',
  register_date: '25.12.2021',
  register_check_date: '25.12.2021',
  sum: '5846,01',
})
const model = [
  { id: 'id', name: '№ поля' },
  { id: 'name', name: 'Орендодавець згідно Публічної кадастрової карти' },
  { id: 'cadastr', name: 'Кадастровий номер' },
  { id: 'area', name: 'Площа змельної ділянки, га' },
  { id: 'date', name: 'Дата договору' },
  { id: 'rentedYears', name: 'Строк оренди, років' },
  { id: 'renterYearsOwner', name: 'Строк оренди у договорі орендодавця' },
  { id: 'percent', name: '%' },
  { id: 'colision', name: 'Не співпадає власник згідно державного акту' },
  { id: 'note', name: 'Примітки' },
  {
    id: 'suborend_1',
    name: 'Договір суборенди ТОВ "МРІЯ ФАРМІНГ ЛЬВІВ"до 06.06.2021 (7 років)',
  },
  { id: 'suborend_2', name: 'Договір суборенди Колодій Микола Іванович' },
  { id: 'register_date', name: 'Дата державної реєстрації права' },
  {
    id: 'register_check_date',
    name: 'Дата оцінки ділянки, згідно Держгеокадастру',
  },
  { id: 'sum', name: 'Сума, грн' },
]
const sizes = [
  '90px',
  '370px',
  '205px',
  '220px',
  '136px',
  '172px',
  '292px',
  '52px',
  '340px',
  '140px',
  '360px',
  '208px',
  '250px',
  '100px',
  '100px',
]
