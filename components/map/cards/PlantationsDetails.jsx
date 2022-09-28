import { Fragment } from 'react'
import styled from 'styled-components'
import { Card, Text, H5, Spacer, Box } from '../../common'

const PlantationsDetails = ({ data, isRead, onChange }) => {
  console.log('Plantations: ', data.plantations)
  return (
    <Card>
      <H5>Інформація про насадження:</H5>
      <Spacer vertical size="20px" />
      <Box gap="4px 4px" wrap>
        <Label type="header" title="Сорт">
          Сорт
        </Label>
        <Label type="header" title="Кількість насаджень">
          Кількість насаджень
        </Label>
        {data.plantations.map((plantation, i) => (
          <Fragment key={plantation.id || i}>
            <Label title={plantation.variety.name}>
              {plantation.variety.name}
            </Label>
            <Label>{plantation.size}</Label>
          </Fragment>
        ))}
      </Box>
    </Card>
  )
}

export default PlantationsDetails

const Label = styled(Card)`
  flex: 0 1 calc(50% - 2px);
  padding: 11px 15px;
  background: ${(props) => (props.type === 'header' ? '#CCD1E0' : '#EDF1F8')};
  border-radius: 0;
  font-weight: ${(props) => (props.type === 'header' ? '600' : '400')};
  font-size: 16px;
  line-height: 19px;
  color: #464f60;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media (max-width: 800px) {
    font-size: 12px;
    line-height: 16px;
  }
`