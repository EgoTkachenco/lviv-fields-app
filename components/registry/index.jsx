import styled from 'styled-components'
import { useEffect } from 'react'
import {
  Table,
  Input,
  Spacer,
  Icon,
  Button,
  Box,
  PageLoader,
  Pagination,
} from '../common'
import { Registry as store } from '../../store'
import { observer } from 'mobx-react-lite'
import EditButton from '../navigation/EditButton'
import FilterModal from './FilterModal'
import { model, sizes } from './util'
import { useRouter } from 'next/router'

const Registry = observer(() => {
  useEffect(() => {
    store.init()
  }, [])
  const router = useRouter()
  const isRead = store.mode === 'read'
  const isShowOnMap = store.search || Object.keys(store.filter).length > 0
  const handleCellClick = (key, index, value) => {
    if (key === 'cadastr') {
      store.showOnMap(value)
      router.push('/map')
    }
  }
  return (
    <>
      <PageLoader isLoading={store.isFetch} />
      <EditButton isMobile={true} />
      <Box wrap="true" gap="16px 16px" align="center">
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
            size="small"
            width="150px"
            onClick={() => store.createNew()}
          >
            Створити
          </Button>
        )}

        <FilterModal
          filters={store.filter}
          onFilterChange={(key, value) => store.onFilterChange(key, value)}
        />
        {isShowOnMap && (
          <Button
            variant="primary"
            width="200px"
            size="small"
            onClick={() => {
              store.loadFieldIds().then(() => router.push('/map'))
            }}
          >
            Показати на мапі
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
          onCellClick={handleCellClick}
        />
      </Wrapper>
      <Spacer vertical size="32px" />
      <Pagination
        page={store.page}
        max={store.max}
        onChange={(page) => store.changePage(page)}
      />
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
