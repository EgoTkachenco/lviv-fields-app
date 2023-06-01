import styled from 'styled-components'
import { Button, ConfirmationModal } from '../common'

const Table = ({
  model,
  data,
  sizes,
  isRead,
  onChange,
  onCellClick = () => {},
  renderContent = (children) => children,
  isEdit = false,
  isDelete = false,
  isActive = () => false,
}) => {
  if (!data) return
  return (
    <TableWrapper>
      <TableContent>
        <TableRow>
          {model.map((field, i) => (
            <TableHeaderCell key={i} width={sizes ? sizes[i] : 'auto'}>
              {field.name}
            </TableHeaderCell>
          ))}
          {!isRead && (isEdit || isDelete) && (
            <TableHeaderCell width={sizes ? sizes[model.length] : 'auto'} />
          )}
        </TableRow>
        {renderContent(
          data.map((row, i) => (
            <TableRow key={i} active={isActive(row)}>
              {model.map((field, j) => (
                <TableCell
                  width={sizes ? sizes[j] : 'auto'}
                  key={i + ' ' + j}
                  onClick={(e) => onCellClick(field.id, i, row[field.id] || '')}
                  isRead={field.isRead || isRead}
                >
                  {field.isRead || isRead ? (
                    row[field.id] || ''
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={row[field.id] || ''}
                      readOnly={isRead}
                      onChange={(e) => onChange(i, field.id, e.target.value)}
                      onClick={(e) => onCellClick(field.id, i, e.target.value)}
                    />
                  )}
                </TableCell>
              ))}
              {!isRead && (isEdit || isDelete) && (
                <TableCell width={sizes ? sizes[model.length] : 'auto'}>
                  {isEdit && (
                    <Button
                      onClick={() => onChange(i, 'update', null)}
                      size="small"
                    >
                      Редагувати
                    </Button>
                  )}
                  {isDelete && (
                    <ConfirmationModal
                      title="Видалення"
                      text="Ви впевнені шо хочете видалити запис?"
                      onConfirm={() => onChange(i, 'delete', null)}
                    >
                      <Button size="small">Видалити</Button>
                    </ConfirmationModal>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableContent>
    </TableWrapper>
  )
}

const TableWrapper = styled.table`
  border-radius: 20px;
  border-collapse: collapse;
  width: calc(100% - 16px);
`
const TableContent = styled.tbody`
  display: block;
`
const TableRow = styled.tr`
  border-bottom: 1px solid #e9edf5;
  background: ${({ active }) => (active ? '#EDF9ED' : '#ffffff')};
  transition: all 0.3s;

  &:hover {
    background: #f4f6fa;
  }
`
const TableHeaderCell = styled.th`
  padding: 12px 20px;
  min-width: ${(props) => props.width};
  /* max-width: ${(props) => props.width}; */
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
  /* white-space: nowrap; */
  border-right: 1px solid #e9edf5;
  min-width: ${(props) => props.width};
  /* max-width: ${(props) => props.width}; */
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #687182;
  padding: 12px 20px;

  background: ${({ isRead }) => (isRead ? 'transparent' : 'white')};

  input {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #687182;
    background: none;
    border: none;
    outline: none;
    width: 100%;
    max-width: 100%;
    transition: all 0.3s;
    cursor: pointer;

    /* &:focus {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      background-color: #fff;
      min-width: 300px;
    } */

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
