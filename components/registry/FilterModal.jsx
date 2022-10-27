import { useState } from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  Modal,
  InputLabel,
  Select,
  Text,
  Spacer,
  Label,
  Icon,
} from '../common'
import { model } from './util'

const FIELD_OPTIONS = model.map((f) => f.name)
const TYPE_OPTIONS = {
  Рівно: '',
  Більше: '_gt',
  'Більше рівно': '_gte',
  Менше: '_lt',
  'Менше рівно': '_lte',
  Містить: '_contains',
}
const TYPED_OPTIONS = {
  number: {
    Рівно: '',
    Більше: '_gt',
    'Більше рівно': '_gte',
    Менше: '_lt',
    'Менше рівно': '_lte',
  },
  date: {
    Рівно: '',
    Більше: '_gt',
    'Більше рівно': '_gte',
    Менше: '_lt',
    'Менше рівно': '_lte',
  },
  text: {
    Рівно: '',
    Містить: '_contains',
  },
}

const FilterModal = ({ filters, onFilterChange }) => {
  const [show, setShow] = useState(false)
  const count = Object.keys(filters).length

  const onCreate = (field, type, value) => {
    const model_field = model.find((f) => f.name === field)
    const model_type = model_field.type || 'text'
    const key = model_field.id + TYPED_OPTIONS[model_type][type]
    onFilterChange(key, value)
    setShow(false)
  }
  const onRemove = (key) => {
    onFilterChange(key, null)
    setShow(false)
  }

  return (
    <>
      <Modal title="Фільтри" close={() => setShow(false)} show={show}>
        <Text>Новий фільтр: </Text>
        <Spacer vertical size="16px" />
        <NewFilterForm onCreate={onCreate} />
        <Spacer vertical size="32px" />
        <FilterList>
          {count ? (
            Object.keys(filters).map((key) => {
              let { type, field } = getFilterType(key)
              const value = filters[key]
              field = model.find((f) => f.id === field).name
              return (
                <Row key={key} width="100%" gap="8px">
                  <Label>{field}</Label>
                  <Label>{type}</Label>
                  <Label>{value}</Label>
                  <CloseButton onClick={() => onRemove(key)} title="Видалити">
                    <Icon icon="close" size="12px" />
                  </CloseButton>
                </Row>
              )
            })
          ) : (
            <Text align="center">Немає застосованих фільтрів</Text>
          )}
        </FilterList>
      </Modal>

      <Button
        style={{ marginLeft: 'auto' }}
        width="auto"
        variant={count ? 'success' : 'primary'}
        onClick={() => setShow(true)}
        size="small"
      >
        Фільтри {count ? `(${count})` : ''}
      </Button>
    </>
  )
}

const NewFilterForm = ({ onCreate }) => {
  const [state, setState] = useState({ field: '', type: '', value: '' })
  const isAllowAdd = state.field && state.type && state.value

  const createFilter = () => {
    onCreate(state.field, state.type, state.value)
    setState({ field: '', type: '', value: '' })
  }
  const fieldType = model.find((f) => f.name === state.field)?.type || 'text'
  return (
    <NewFilterFormContainer
      gap="8px"
      wrap-sm
      direction-sm="column"
      align-sm="center"
    >
      <Select
        value={state.field}
        onChange={(v) => setState({ ...state, field: v })}
        placeholder="Поле"
        options={FIELD_OPTIONS}
      />
      <Select
        isRead={!state.field}
        value={state.type}
        onChange={(v) => setState({ ...state, type: v })}
        placeholder="Тип"
        options={Object.keys(TYPED_OPTIONS[fieldType])}
      />
      <InputLabel
        disabled={!state.type}
        value={state.value}
        type={fieldType}
        onChange={(v) => setState({ ...state, value: v.target.value })}
        placeholder="Значення"
      />
      <Button
        width="auto"
        variant="success"
        disabled={!isAllowAdd}
        onClick={createFilter}
      >
        Додати
      </Button>
    </NewFilterFormContainer>
  )
}

export default FilterModal

const FilterList = styled.div`
  min-height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const NewFilterFormContainer = styled(Box)`
  @media (max-width: 768px) {
    & > * {
      flex-grow: 1;
      width: 100%;
    }
  }
`

const Row = styled(Box)`
  position: relative;
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

function getFilterType(key) {
  for (let i = 0; i < Object.keys(TYPE_OPTIONS).length; i++) {
    const type = Object.values(TYPE_OPTIONS)[i]
    if (!type) break
    if (key.search(type) !== -1)
      return {
        type: Object.keys(TYPE_OPTIONS)[i],
        field: key.replace(type, ''),
      }
  }

  return { type: 'Рівно', field: key }
}
