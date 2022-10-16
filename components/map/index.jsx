import { useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import store from '../../store/map-store'
import {
  Filter,
  OwnerDetails,
  ContractDetails,
  SummaryDetails,
  CommonDetails,
  PlantationsDetails,
} from './cards'

import Map from './fields-map/Map'
import EditButton from '../navigation/EditButton'
import { Spacer, PageLoader } from '../common'

const MapPage = observer(() => {
  const { area, field, mode, filter, summary } = store
  const isRead = mode === 'read'
  const onChange = (key, value) => store.updateFieldDetails(key, value)
  const onFilterChange = (key, value) => store.updateFilter(key, value)
  const onSubmitFilter = () => store.getSummary()
  const onClearFilter = () => store.clearFilter()

  useEffect(() => {
    store.getSummary()
    return () => {
      store.reset()
    }
  }, [])
  return (
    <>
      <Wrapper>
        <PageLoader isLoading={store.isFetch} />
        <Side>
          <EditButton isMobile={true} />

          {!field && (
            <Filter
              filter={filter}
              onChange={onFilterChange}
              onSubmit={onSubmitFilter}
              onClear={onClearFilter}
            />
          )}
          {field && (
            <>
              <CommonDetails data={field} isRead={isRead} onChange={onChange} />
              <Spacer vertical size="40px" />
              <PlantationsDetails
                data={field}
                isRead={isRead}
                onChange={onChange}
              />
            </>
          )}
        </Side>
        <Content>
          <Map
            area={area}
            field={field && field.pathname}
            onOpenArea={(v) => store.openArea(v)}
            onOpenField={(v) => store.openField(v)}
            onClose={() => store.closeField()}
            summary={summary}
          />
          {!field && <SummaryDetails data={summary} />}
        </Content>
      </Wrapper>
      {field && (
        <Bottom>
          <OwnerDetails data={field} isRead={isRead} onChange={onChange} />
          <ContractDetails data={field} isRead={isRead} onChange={onChange} />
        </Bottom>
      )}
    </>
  )
})

export default MapPage

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  min-height: 100%;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`
const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 100%;
`
const Side = styled.div`
  min-width: 350px;
  max-width: 550px;
  /* width: 29.5%; */

  @media (max-width: 1200px) {
    max-width: 100%;
    min-width: unset;
  }
`
const Bottom = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 40px;

  @media (max-width: 1600px) {
    flex-direction: column;
  }
`
