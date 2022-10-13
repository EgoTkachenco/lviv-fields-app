import styled from 'styled-components'
import { useEffect } from 'react'
import { Table, Input, Spacer, Icon, Button, Box, PageLoader } from '../common'
import { Registry as store } from '../../store'
import { observer } from 'mobx-react-lite'
import EditButton from '../navigation/EditButton'

const Registry = observer(() => {
  useEffect(() => {
    store.loadData()
  }, [])
  const isRead = store.mode === 'read'
  return (
    <>
      <PageLoader isLoading={store.isFetch} />
      <EditButton isMobile={true} />
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
  { id: 'identifier', name: '№ п/п' },
  { id: 'area', name: 'Районування' },
  { id: 'field', name: '№ поля' },
  { id: 'plant_year', name: 'рік посадки поля' },
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

  { id: 'state_act_number', name: 'Серія, номер державного акту' },
  { id: 'state_act_date', name: 'Дата видачі державного акту', type: 'date' },
  { id: 'field_type', name: 'Тип землі' },
  { id: 'passport', name: 'Паспорт' },
  { id: 'passport_who', name: 'Виданий ким' },

  { id: 'passport_date', name: 'Виданий, дата', type: 'date' },
  { id: 'identifier_code', name: 'Ідентифікаційний номер' },
  { id: 'phone', name: 'телефон' },
  { id: 'note_2', name: 'примітка' },
  { id: 'additional_relation', name: "Родинний зв'язок" },
  { id: 'additional_name', name: 'ПІБ' },
  { id: 'additional_passport', name: 'паспорт' },
  { id: 'additional_code', name: 'ідентифікаційний код' },
  { id: 'additional_phone', name: 'телефон' },
]
const sizes = [
  '60px',
  '120px',
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

  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
  '100px',
]
