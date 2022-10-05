import styled from 'styled-components'
import { useEffect } from 'react'
import { Table, Input, Spacer, Icon, Button, Box } from '../common'
import { Registry as store } from '../../store'
import { observer } from 'mobx-react-lite'

const Registry = observer(() => {
  useEffect(() => {
    store.loadData()
  }, [])
  const isRead = store.mode === 'read'
  return (
    <>
      <Box justify="space-between" wrap="true" gap="16px 16px">
        <Search>
          <Input
            value={store.search}
            onChange={(value) => store.updateSearch(value)}
            placeholder="Пошук"
            rightSlot={<Icon icon="search" />}
          />
        </Search>
        {!isRead && (
          <Button
            variant="primary"
            width="200px"
            onClick={() => store.createNew()}
          >
            Створити
          </Button>
        )}
      </Box>
      <Spacer vertical size="30px" />
      <Wrapper>
        <Table
          model={model}
          data={store.data}
          sizes={sizes}
          isRead={isRead}
          onChange={(index, key, value) =>
            store.updateTableRow(index, key, value)
          }
        />
      </Wrapper>
    </>
  )
})

export default Registry

const Wrapper = styled.div`
  /* max-width: calc(100vh - 40px); */
  overflow: auto;
`
const Search = styled.div`
  max-width: 470px;
  width: 100%;
`

const model = [
  { id: 'field', name: '№ поля' },
  {
    id: 'landlord_by_public_cadastral',
    name: 'Орендодавець згідно Публічної кадастрової карти',
  },
  { id: 'cadastr', name: 'Кадастровий номер' },
  { id: 'size', name: 'Площа змельної ділянки, га' },
  { id: 'contract_date', name: 'Дата договору', type: 'date' },
  { id: 'lease_term', name: 'Строк оренди, років' },
  { id: 'lease_term_in_contract', name: 'Строк оренди у договорі орендодавця' },
  { id: 'percent', name: '%' },
  { id: 'owner_dismatch', name: 'Не співпадає власник згідно державного акту' },
  { id: 'note', name: 'Примітки' },
  {
    id: 'sublease_MRIA_FARMING',
    name: 'Договір суборенди ТОВ "МРІЯ ФАРМІНГ ЛЬВІВ"до 06.06.2021 (7 років)',
  },
  {
    id: 'sublease_Colodiy_Mykola',
    name: 'Договір суборенди Колодій Микола Іванович',
  },
  {
    id: 'state_registration_date',
    name: 'Дата державної реєстрації права',
    type: 'date',
  },
  {
    id: 'assessment_date',
    name: 'Дата оцінки ділянки, згідно Держгеокадастру',
    type: 'date',
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
