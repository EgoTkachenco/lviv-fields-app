import { useState } from 'react'
import styled from 'styled-components'
import { Card, H5, Spacer, Box, Table, Button } from '../../common'
import OwnerModal from '../../modals/OwnerModal'

const OwnersDetails = ({ data, isRead, onUpdate, onCreate, onDelete }) => {
  const [modal, setModal] = useState({ show: false, data: null })
  const openModal = (data = null) => setModal({ show: true, data })
  const closeModal = () => setModal({ show: false, data: null })
  const owners = data.owners
    .map((owner, i) => ({
      ...owner,
      order: i + 1,
      surname: owner.full_name && owner.full_name.split(' ')[0],
      first_name: owner.full_name && owner.full_name.split(' ')[1],
      patronymic: owner.full_name && owner.full_name.split(' ')[2],
    }))
    .sort((a, b) => b.isCurrentOwner - a.isCurrentOwner)
  // const isCurrentOwner = owners.reduce(
  //   (acc, el) => acc || el.isCurrentOwner,
  //   false
  // )
  return (
    <StyledCard>
      <Box justify="space-between" align="center">
        <H5>Історія власників земельної ділянки</H5>

        {!isRead && (
          <Button width="auto" onClick={() => openModal()}>
            Додати
          </Button>
        )}
      </Box>

      <Spacer vertical size="25px" />

      <TableContainer>
        <Table
          model={model}
          data={owners}
          sizes={sizes}
          isRead={isRead}
          onChange={(index, key, value) => {
            if (key === 'delete') onDelete(index)
            if (key === 'update')
              openModal({
                ...owners[index],
                index,
                // isCurrentOwnerDisabled:
                //   isCurrentOwner && !owners[index].isCurrentOwner,
              })
          }}
          renderContent={(children) => <TableContent>{children}</TableContent>}
          isEdit
          isDelete
          withEvenOdd={false}
          isActive={(row) => row.isCurrentOwner}
        />
      </TableContainer>

      {modal.show && (
        <OwnerModal
          data={modal.data}
          // isCurrentOwnerDisabled={
          //   modal.data ? modal.data.isCurrentOwnerDisabled : isCurrentOwner
          // }
          onConfirm={(data) => {
            if (modal.data) onUpdate(data)
            else onCreate(data)
            closeModal()
          }}
          onCancel={() => {
            closeModal()
          }}
        />
      )}
    </StyledCard>
  )
}

export default OwnersDetails

const StyledCard = styled(Card)`
  flex-grow: 1;
`
const TableContent = styled.div`
  width: 100%;
`
const TableContainer = styled.div`
  max-width: 100%;
  overflow: auto;
  min-height: calc(100% - 48px);
  max-height: calc(100% - 48px);

  table {
    width: 100%;
    th,
    td {
      padding: 12px 8px;
    }
  }
`

const model = [
  { id: 'order', name: '№' },
  // { id: 'full_name', name: 'ПІБ' },
  { id: 'surname', name: 'Прізвище' },
  { id: 'first_name', name: 'Імʼя' },
  { id: 'patronymic', name: 'По-батькові' },
  { id: 'birth_date', name: 'Дата народження', type: 'date' },
  { id: 'address', name: 'Адреса' },
  { id: 'phone', name: 'Контактний телефон', type: 'phone' },
  { id: 'email', name: 'Електронна пошта' },
  { id: 'note', name: 'Примітка до власника' },
]
const sizes = [
  '40px',
  '100px',
  '120px',
  '120px',
  '160px',
  '250px',
  '180px',
  '170px',
  '200px',
  '100%',
]
