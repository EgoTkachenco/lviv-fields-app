import styled from 'styled-components'
import { Button, ConfirmationModal, DateInput } from '../common'
import { format, useMask } from '@react-input/mask'
import DatePicker from 'react-datepicker'
import { formatDate } from 'date-fns'

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
  withEvenOdd = true,
}) => {
  if (!data) return

  const renderCell = (field, row, index) => {
    const props = {
      value: row[field.id] || '',
      readOnly: field.isRead || isRead || !onChange,
      onChange: (e) => onChange(index, field.id, e.target.value),
      onClick: (e) => onCellClick(field.id, index, e.target.value),
    }
    if (field.type === 'phone') {
      return (
        <PhoneCell
          {...props}
          value={format(props.value, {
            mask: '+38 (___) ___-__-__',
            replacement: { _: /\d/ },
          })}
        />
      )
    }
    if (field.type === 'date')
      return <DateCell {...props} readOnly={props.readOnly || isEdit} />

    if (props.readOnly) return props.value || ''

    return <input type={field.type || 'text'} {...props} />
  }
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
            <TableRow key={i} active={isActive(row)} withEvenOdd={withEvenOdd}>
              {model.map((field, j) => (
                <TableCell
                  width={sizes ? sizes[j] : 'auto'}
                  key={i + ' ' + j}
                  onClick={(e) => onCellClick(field.id, i, row[field.id] || '')}
                  isRead={field.isRead || isRead}
                >
                  {renderCell(field, row, i)}
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
  border-radius: 10px;
  border: 1px solid #000;
  background: #fff;
  overflow: hidden;
`
const TableRow = styled.tr`
  border-bottom: 1px solid #e9edf5;
  background: ${({ active }) => (active ? '#b8dcab80' : '#ffffff')};
  transition: all 0.3s;
  width: 100%;

  ${({ withEvenOdd }) =>
    withEvenOdd
      ? ` &:nth-child(even) {
						background: rgba(227, 232, 232, 0.5);
					}
					&:nth-child(odd) {
						background: transparent;
					}`
      : ''}

  &:hover {
    background: #f4f6fa;
  }
`
const TableHeaderCell = styled.th`
  padding: 10px 20px;
  min-width: ${(props) => props.width};
  /* max-width: ${(props) => props.width}; */
  background: #748c8e;
  font-size: 13px;
  font-weight: 600;
  line-height: normal;
  color: #ffffff;
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
  font-size: 13px;
  font-weight: 400;
  line-height: normal;
  color: #313536;
  padding: 8px 20px;

  background: ${({ isRead }) => (isRead ? 'transparent' : 'white')};

  input {
    font-weight: 400;
    font-size: 13px;
    line-height: normal;
    color: #313536;
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

const PhoneCell = (props) => {
  const ref = useMask({
    mask: '+__ (___) ___-__-__',
    replacement: { _: /\d/ },
  })

  return <input ref={ref} {...props} />
}

const DateCell = (props) => {
  return (
    <DatePicker
      {...props}
      value={props.value && formatDate(props.value, 'dd/MM/yyyy')}
      selected={props.value}
      onChange={(value) => {
        debugger
        props.onChange({ target: { value } })
      }}
      locale="uk"
      format="dd/MM/yyyy"
      disabled={props.readOnly}
    />
  )
}
