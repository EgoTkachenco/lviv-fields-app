import { useEffect } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import store from '../../store/map-store'
import AuthStore from '../../store/auth-store'
import {
  Filter,
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
import AreaPlantationsDetails from './cards/AreaPlantationsDetails'

const MapPage = observer(() => {
  const { area, field, mode, filter, summary, areas, type } = store
  const isRead = mode === 'read'
  const isAdmin = AuthStore?.user?.role.name === 'Admin'

  const onChange = (key, value) => store.updateFieldDetails(key, value)
  const onFilterChange = (key, value) => store.updateFilter(key, value)
  const onSubmitFilter = () => store.getSummary()
  const onClearFilter = () => store.clearFilter()
  const onTypeChange = (type) => store.changeType(type)
  const areaLabel =
    store.areaLabel === null || !areas
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
              type={type}
              onTypeChange={onTypeChange}
            />
          )}
          {field && (
            <>
              <CommonDetails data={field} isRead={isRead} onChange={onChange} />
              <Spacer vertical size="40px" />
              <ContractDetails
                data={field}
                isRead={isRead}
                onChange={onChange}
              />
              {/* <PlantationsDetails
                data={field}
                isRead={isRead}
                onChange={onChange}
              /> */}
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
            type={type}
          />
          {!field && <SummaryDetails data={summary} />}
          {area && !field && (
            <AreaPlantationsDetails
              isEditable={isAdmin}
              area={summary.area}
              onAreaDetailsUpdate={(data) => store.updateArea(data)}
            />
          )}
        </Content>
      </Wrapper>

      {field && (
        <Wrapper style={{ marginTop: '40px' }}>
          <Side>
            {/* <ContractDetails data={field} isRead={isRead} onChange={onChange} />
            <Spacer vertical size="40px" /> */}
            <DocumentsDetails
              data={field}
              isRead={isRead}
              onChange={onChange}
            />
          </Side>
          <Content>
            <OwnersDetails
              data={field}
              isRead={isRead}
              onCreate={(data) => onChange('owners-new', data)}
              onUpdate={(data) => onChange('owners-update', data)}
              onDelete={(data) => onChange('owners-delete', data)}
            />
          </Content>
        </Wrapper>
      )}
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

  @media (max-width: 1500px) {
    max-width: calc(100vw - 450px - 40px - 60px);
  }

  @media (max-width: 1200px) {
    max-width: unset;
    max-height: unset;
  }
`
const Side = styled.div`
  min-width: 550px;
  max-width: 550px;

  @media (max-width: 1500px) {
    min-width: 450px;
    max-width: 450px;
  }

  @media (max-width: 1200px) {
    max-width: 100%;
    min-width: unset;
  }
`
