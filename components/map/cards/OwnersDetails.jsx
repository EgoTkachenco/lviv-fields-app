import { useState } from 'react'
import styled from 'styled-components'
import { Card, H5, Spacer, Box, Table, Button } from '../../common'
import OwnerModal from '../../modals/OwnerModal'

const OwnersDetails = ({ data, isRead, onUpdate, onCreate, onDelete }) => {
  const [modal, setModal] = useState({ show: false, data: null })
  const openModal = (data = null) => setModal({ show: true, data })
  const closeModal = () => setModal({ show: false, data: null })
  const owners = data.owners.map((owner, i) => ({ ...owner, order: i + 1 }))
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
            if (key === 'update') openModal({ ...owners[index], index })
          }}
          renderContent={(children) => <TableContent>{children}</TableContent>}
          isEdit
          isDelete
          isActive={(row) => row.isCurrentOwner}
        />
      </TableContainer>

      {modal.show && (
        <OwnerModal
          data={modal.data}
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
  /* flex-grow: 1; */
`
const TableContent = styled.div`
  max-height: 300px;
  width: 100%;
  overflow: auto;
`
const TableContainer = styled.div`
  max-width: 100%;
  overflow: auto;
  min-height: 200px;
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
  { id: 'full_name', name: 'ПІБ' },
  { id: 'birth_date', name: 'Дата народження' },
  { id: 'address', name: 'Адреса' },
  { id: 'phone', name: 'Контактний телефон' },
  { id: 'email', name: 'Електронна пошта' },
  { id: 'note', name: 'Примітки' },
]
const sizes = [
  '40px',
  '120px',
  '160px',
  '250px',
  '180px',
  '170px',
  '200px',
  '150px',
]
