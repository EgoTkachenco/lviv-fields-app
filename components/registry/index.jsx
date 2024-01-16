import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Input, Spacer, Icon, Button, Box, PageLoader } from '../common'
import store from '../../store/registry/main.js'
import { observer } from 'mobx-react-lite'
import EditButton from '../navigation/EditButton'
import FilterModal from './FilterModal'
import {
  owner_model,
  field_model,
  plantation_model,
  owner_sizes,
  field_sizes,
  plantation_sizes,
  formatOwner,
  formatField,
  formatPlantation,
} from './util'
import { useRouter } from 'next/router'
import Table from './RegistryTable'
// import OwnerModal from '../modals/OwnerModal'

const tabs = [
  { name: 'Реєстр орендодавців', value: 'owner' },
  { name: 'Реєстр земельних ділянок', value: 'field' },
  { name: 'Реєстр врожаю', value: 'plantation' },
]

const Registry = observer(() => {
  const { ownersStore, fieldsStore, plantationsStore, search, mode, isFetch } =
    store
  const stores = {
    owner: ownersStore,
    field: fieldsStore,
    plantation: plantationsStore,
  }
  const models = {
    owner: owner_model,
    field: field_model,
    plantation: plantation_model,
  }
  const [activeTab, setActiveTab] = useState(tabs[0].value)

  const filter = stores[activeTab].filter
  const [filters, setFilters] = useState({})
  useEffect(() => {
    const filters = { search, ...filter }
    setFilters(filters)
  }, [filter, search])

  const router = useRouter()
  const isRead = mode === 'read'
  const handleCellClick = (key, index, value) => {
    if (key === 'cadastr') {
      store.showOnMap(value)
      router.push('/map')
    }
  }
  const exportData = () => {
    switch (activeTab) {
      case 'owner':
        ownersStore.exportData()
        break
      case 'field':
        fieldsStore.exportData()
        break
      case 'plantation':
        plantationsStore.exportData()
        break
    }
  }

  // const filters = filter
  // filters.search = search
  const isShowOnMap = Object.values(filters).filter((v) => v).length > 0

  return (
    <>
      <PageLoader isLoading={isFetch} />
      <EditButton isMobile={true} />
      <Box wrap="true" gap="16px 16px" align="center">
        <Search>
          <Input
            value={search}
            onChange={(value) => store.updateSearch(value)}
            placeholder="Пошук"
            tip={
              <SearchIcon>
                <Icon icon="search" size="20px" />
              </SearchIcon>
            }
            size="large"
          />
        </Search>

        {/* {!isRead && activeTab === 'owner' && (
          <Button
            variant="primary"
            size="small"
            width="150px"
            onClick={() => setModal({ name: 'owner', data: null })}
          >
            Створити
          </Button>
        )} */}

        <FilterModal
          model={models[activeTab]}
          filters={stores[activeTab].filter}
          onFilterChange={(key, value) =>
            stores[activeTab].onFilterChange(key, value)
          }
        />
        {isShowOnMap && (
          <Button
            variant="primary"
            width="250px"
            size="large"
            onClick={() => {
              store.loadFieldIds(filter).then(() => router.push('/map'))
            }}
          >
            Показати на мапі
          </Button>
        )}
      </Box>
      <Spacer vertical size="30px" />
      <TabsExportContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab.value}
            active={tab.value === activeTab}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.name}
          </TabButton>
        ))}
        <Icon icon="print" size="32px" onClick={exportData} />
      </TabsExportContainer>
      <Spacer vertical size="30px" />
      <Wrapper>
        <Table
          show={activeTab === 'owner'}
          model={owner_model}
          filters={ownersStore.getFilter}
          sizes={owner_sizes}
          isRead={isRead}
          onCellClick={handleCellClick}
          data={ownersStore.data}
          limit={ownersStore.limit}
          loadData={ownersStore.loadData}
          loadDataCount={ownersStore.loadDataCount}
          onChange={ownersStore.onTableChange}
        />
        <Table
          show={activeTab === 'field'}
          model={field_model}
          filters={fieldsStore.getFilter}
          sizes={field_sizes}
          isRead={isRead}
          onCellClick={handleCellClick}
          data={fieldsStore.data}
          limit={fieldsStore.limit}
          loadData={fieldsStore.loadData}
          loadDataCount={fieldsStore.loadDataCount}
          onChange={fieldsStore.onTableChange}
        />
        <Table
          show={activeTab === 'plantation'}
          model={plantation_model}
          filters={plantationsStore.getFilter}
          sizes={plantation_sizes}
          isRead={isRead}
          onCellClick={handleCellClick}
          data={plantationsStore.data}
          limit={plantationsStore.limit}
          loadData={plantationsStore.loadData}
          loadDataCount={plantationsStore.loadDataCount}
          onChange={plantationsStore.onTableChange}
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

const TabButton = styled.button`
  background: ${({ active }) => (active ? '#748C8E' : '#ffffff')};
  color: ${({ active }) => (active ? '#ffffff' : '#313536')};
  border: 1px solid ${({ active }) => (active ? '#464F60' : '#313536')};
  border-radius: 50px;
  padding: 0 20px;
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const TabsExportContainer = styled(Box)`
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;

    & > :last-child {
      margin-left: 8px;
    }
  }
`

const SearchIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #313536;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -20px;
`
