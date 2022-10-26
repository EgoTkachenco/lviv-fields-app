import styled from 'styled-components'
import Box from './Box'
import Button from './Button'
import { Text } from './Text'

const Pagination = ({ page, max, onChange }) => {
  const pages = getPagesButtons(page, max)
  console.log(pages)
  return (
    <Wrapper gap="8px">
      {max &&
        pages.map((p, i) =>
          p ? (
            <PaginationButton
              key={i}
              variant={p === page ? 'primary' : 'white'}
              onClick={() => onChange(p)}
            >
              {p}
            </PaginationButton>
          ) : (
            <Text key={i}>...</Text>
          )
        )}
    </Wrapper>
  )
}

export default Pagination

const Wrapper = styled(Box)`
  justify-content: flex-end;
`

const PaginationButton = styled(Button)`
  display: inline-flex;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  padding: 0;
`

function getPagesButtons(page, max) {
  if (!max) return []
  if (page === 1) return [1, 2, 3, null, max]
  if (page === 2) return [1, 2, 3, null, max]
  if (page === 3) return [1, 2, 3, 4, null, max]

  if (page > 3 && page < max - 2)
    return [1, null, page - 1, page, page + 1, null, max]

  if (page === max - 2) return [1, null, page - 1, page, page + 1, max]
  if (page === max - 1) return [1, null, page - 1, page, max]
  if (page === max) return [1, null, page - 1, max]
}
