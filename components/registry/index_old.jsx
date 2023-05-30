import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Input, Spacer, Icon, Button, Box, PageLoader } from '../common'
import { Registry as store } from '../../store'
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
  sizes,
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
  const [activeTab, setActiveTab] = useState(tabs[0].value)
  const { loadOwners, loadOwnersCount, loadFields, loadFieldsCount } = store

  const router = useRouter()
  const isRead = store.mode === 'read'
  const isShowOnMap = store.search || Object.keys(store.filter).length > 0
  const handleCellClick = (key, index, value) => {
    if (key === 'cadastr') {
      store.showOnMap(value)
      router.push('/map')
    }
  }
  const filters = { search: store.search, ...store.filter }
  const exportData = () => {
    switch (activeTab) {
      case 'owner':
        store.exportOwners()
        break
      case 'field':
        store.exportFields()
        break
      case 'plantation':
        store.exportPlantations()
        break
    }
  }
  return (
    <>
      <PageLoader isLoading={store.isFetch} />
      {/* <EditButton isMobile={true} /> */}
      <Box wrap="true" gap="16px 16px" align="center">
        <Search>
          <Input
            value={store.search}
            onChange={(value) => store.updateSearch(value)}
            placeholder="Пошук"
            rightSlot={<Icon icon="search" />}
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
      <TabsExportContainer>
        <TabsWrapper>
          {tabs.map((tab) => (
            <TabButton
              key={tab.value}
              active={tab.value === activeTab}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.name}
            </TabButton>
          ))}
        </TabsWrapper>
        <Icon icon="print" size="32px" onClick={exportData} />
      </TabsExportContainer>
      <Spacer vertical size="30px" />
      <Wrapper>
        {activeTab === 'owner' && (
          <Table
            model={owner_model}
            load={loadOwners}
            loadCount={loadOwnersCount}
            filters={filters}
            sizes={owner_sizes}
            isRead={true}
            formatData={formatOwner}
            onCellClick={handleCellClick}
          />
        )}
        {activeTab === 'field' && (
          <Table
            model={field_model}
            load={loadFields}
            loadCount={loadFieldsCount}
            filters={filters}
            sizes={field_sizes}
            isRead={true}
            formatData={formatField}
            onCellClick={handleCellClick}
          />
        )}
        {activeTab === 'plantation' && (
          <Table
            model={plantation_model}
            load={loadFields}
            loadCount={loadFieldsCount}
            filters={filters}
            sizes={plantation_sizes}
            isRead={true}
            formatData={formatPlantation}
            // onChange={(index, key, value) =>
            //   store.updateTableRow(index, key, value)
            // }
            onCellClick={handleCellClick}
          />
        )}
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
const TabsWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #d7dce1;
  border-radius: 30px;
  display: flex;
  align-items: center;
  width: fit-content;
`
const TabButton = styled.button`
  background: ${({ active }) => (active ? '#407cff' : '#ffffff')};
  color: ${({ active }) => (active ? '#ffffff' : '#464F60')};
  border-radius: 30px;
  padding: 0 20px;
  height: 40px;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  border: none;
  outline: none;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const TabsExportContainer = styled(Box)`
  align-items: center;
  gap: 16px;
`
