import styled from 'styled-components'

const Table = ({ model, data, sizes }) => {
  return (
    <TableWrapper>
      <TableContent>
        <TableRow>
          {model.map((field, i) => (
            <TableHeaderCell key={i}>{field.name}</TableHeaderCell>
          ))}
        </TableRow>
        {data.map((row, i) => (
          <TableRow key={i}>
            {model.map((field, j) => (
              <TableCell width={sizes[i]} key={i + ' ' + j}>
                {row[field.id]}
              </TableCell>
            ))}
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
  padding: 12px 20px;
  white-space: nowrap;
  border-right: 1px solid #e9edf5;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #687182;

  &:last-child {
    border-right: none;
  }
`

export default Table
