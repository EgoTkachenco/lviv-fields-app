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
  DocumentsDetails,
  OwnersDetails,
} from './cards'

import Map from './fields-map/Map'
import EditButton from '../navigation/EditButton'
import { Spacer, PageLoader } from '../common'

const MapPage = observer(() => {
  const { area, field, mode, filter, summary, areas } = store
  const isRead = mode === 'read'
  const onChange = (key, value) => store.updateFieldDetails(key, value)
  const onFilterChange = (key, value) => store.updateFilter(key, value)
  const onSubmitFilter = () => store.getSummary()
  const onClearFilter = () => store.clearFilter()
  const areaLabel =
    store.areaLabel === null
      ? null
      : areas.find((area) => area.path === store.areaLabel)

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
              <Spacer vertical size="40px" />
              <ContractDetails
                data={field}
                isRead={isRead}
                onChange={onChange}
              />
              <Spacer vertical size="40px" />
              <DocumentsDetails
                data={field}
                isRead={isRead}
                onChange={onChange}
              />
            </>
          )}
        </Side>
        <Content>
          <Map
            areaLabel={areaLabel}
            area={area}
            field={field && field.pathname}
            onOpenArea={(v) => store.openArea(v)}
            onOpenField={(v) => store.openField(v)}
            onClose={() => store.closeField()}
            summary={summary}
            areas={areas}
            filter={filter}
          />
          {!field && <SummaryDetails data={summary} />}
          {field && (
            <OwnersDetails
              data={field}
              isRead={isRead}
              onCreate={(data) => onChange('owners-new', data)}
              onUpdate={(data) => onChange('owners-update', data)}
              onDelete={(data) => onChange('owners-delete', data)}
            />
          )}
        </Content>
      </Wrapper>
      {/* {field && (
        <Bottom>
          <OwnerDetails data={field} isRead={isRead} onChange={onChange} />
        </Bottom>
      )} */}
    </>
  )
})

export default MapPage

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-grow: 1;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`
const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* max-height: 100%; */
  max-height: calc(100vh - 80px - 60px);
  max-width: calc(100vw - 550px - 40px - 60px);
  @media (max-width: 1200px) {
    max-width: unset;
  }
`
const Side = styled.div`
  min-width: 550px;
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
