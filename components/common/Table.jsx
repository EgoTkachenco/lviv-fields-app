import styled from 'styled-components'
import { Button, ConfirmationModal } from '../common'

const Table = ({ model, data, sizes, isRead, onChange }) => {
  if (!data) return
  return (
    <TableWrapper>
      <TableContent>
        <TableRow>
          {model.map((field, i) => (
            <TableHeaderCell key={i} width={sizes[i]}>
              {field.name}
            </TableHeaderCell>
          ))}
          {!isRead && <TableHeaderCell></TableHeaderCell>}
        </TableRow>
        {data.map((row, i) => (
          <TableRow key={i}>
            {model.map((field, j) => (
              <TableCell width={sizes[j]} key={i + ' ' + j}>
                <input
                  type={field.type || 'text'}
                  value={row[field.id] || ''}
                  readOnly={isRead}
                  onChange={(e) => onChange(i, field.id, e.target.value)}
                />
              </TableCell>
            ))}
            {!isRead && (
              <TableCell>
                <ConfirmationModal
                  title="Видалення"
                  text="Ви впевнені шо хочете видалити запис?"
                  onConfirm={() => onChange(i, 'delete', null)}
                >
                  <Button size="small">Видалити</Button>
                </ConfirmationModal>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableContent>
    </TableWrapper>
  )
}

const TableWrapper = styled.table`
  border-radius: 20px;
  border-collapse: collapse;
`
const TableContent = styled.tbody`
  display: block;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 225px);

  @media (max-width: 768px) {
    max-height: calc(100vh - 201px);
  }
`
const TableRow = styled.tr`
  border-bottom: 1px solid #e9edf5;
  background: #ffffff;
  transition: all 0.3s;

  &:hover {
    background: #f4f6fa;
  }
`
const TableHeaderCell = styled.th`
  padding: 12px 20px;
  white-space: nowrap;
  min-width: ${(props) => props.width};
  background: #f4f6fa;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #687182;
  border-right: 1px solid #e9edf5;
  text-align: left;

  &:last-child {
    border-right: none;
  }
`
const TableCell = styled.td`
  position: relative;
  white-space: nowrap;
  border-right: 1px solid #e9edf5;
  min-width: ${(props) => props.width};
  input {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #687182;
    padding: 12px 20px;
    background: none;
    border: none;
    outline: none;
    width: 100%;
    transition: all 0.3s;

    &:focus {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      background-color: #fff;
      min-width: 300px;
    }

    &:read-only {
      &:focus {
        position: static;
        top: unset;
        left: unset;
        z-index: 10;
        background-color: transparent;
        min-width: unset;
      }
    }
  }

  &:last-child {
    border-right: none;
  }
`

export default Table
