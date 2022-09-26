import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import store from '../../store/map-store'
import {
  Filter,
  OwnerDetails,
  ContractDetails,
  AreaDetails,
  CommonDetails,
  PlantationsDetails,
} from './cards'

import Map from './fields-map/Map'
import BackLink from './BackLink'
import { Spacer } from '../common'

const MapPage = observer(() => {
  const { area, field, mode } = store
  const isRead = mode === 'read'
  return (
    <>
      <Wrapper>
        <Side>
          {!field ? (
            <Filter />
          ) : (
            <>
              <CommonDetails isRead={isRead} />
              <Spacer vertical size="40px" />
              <PlantationsDetails isRead={isRead} />
            </>
          )}
        </Side>
        <Content>
          <Map
            area={area}
            field={field}
            onOpenArea={(v) => store.openArea(v)}
            onOpenField={(v) => store.openField(v)}
            onClose={() => store.closeField()}
          />
          {!field && <AreaDetails />}
        </Content>
      </Wrapper>
      {field && (
        <Bottom>
          <OwnerDetails />
          <ContractDetails />
        </Bottom>
      )}

      {area && <BackLink action={() => store.closeField()} />}
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
