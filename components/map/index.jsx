import styled from 'styled-components'
import Filter from './Filter'
import { observer } from 'mobx-react-lite'
import store from '../../store/map-store'
import FieldDetails from './FieldDetails'
import OwnerDetails from './OwnerDetails'
import ContractDetails from './ContractDetails'
import AreaDetails from './AreaDetails'
import Map from './Map'

const MapPage = observer(() => {
  const { area, field, details } = store

  return (
    <>
      <Wrapper>
        <Side>{!details ? <Filter /> : <FieldDetails />}</Side>
        <Content>
          <Map
            area={area}
            field={field}
            onOpenArea={(v) => store.openArea(v)}
            onOpenField={(v) => store.openField(v)}
            onClose={() => store.closeField()}
          />
          {!details && <AreaDetails />}
        </Content>
      </Wrapper>
      {details && (
        <Bottom>
          <OwnerDetails />
          <ContractDetails />
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
  max-width: 550px;
  /* width: 29.5%; */

  @media (max-width: 1200px) {
    max-width: 100%;
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
