import { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Card, Text, H5, Spacer, Box } from '../../common'

const PlantationsDetails = ({ data, isRead, onChange }) => {
  const onNewPlantation = () => onChange('new-plantation')
  const [value, setValue] = useState(null)
  return (
    <Card>
      <H5>Інформація про насадження:</H5>
      <Spacer vertical size="20px" />
      <Box gap="4px 4px" wrap="true">
        <HeaderLabel title="Сорт">Сорт</HeaderLabel>
        <HeaderLabel title="Кількість насаджень">
          Кількість насаджень
        </HeaderLabel>
        {data.plantations.map((plantation, i) => (
          <Fragment key={plantation.id || i}>
            <InputLabel value={plantation.variety.name} readOnly={isRead} />
            <InputLabel value={plantation.size} readOnly={isRead} />
          </Fragment>
        ))}

        {!isRead && <LabelButton onClick={onNewPlantation}>Додати</LabelButton>}
      </Box>
    </Card>
  )
}

export default PlantationsDetails

const LabelStyles = `
	flex: 0 1 calc(50% - 2px);
	padding: 11px 15px;
	background: #EDF1F8
	border-radius: 0;
	font-weight: 400;
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

const HeaderLabel = styled.div`
  ${LabelStyles}
  background: #CCD1E0;
  border-radius: 0;
  font-weight: 600;
`

const Label = styled.div`
  ${LabelStyles}
  background: '#EDF1F8';
`

const InputLabel = styled.input`
  ${LabelStyles}
  outline: none;
  border: 1px solid #edf1f8;
  font-weight: 400;
  &:read-only {
    cursor: default;
    border-color: transparent;
    background: #edf1f8;
  }
`

const LabelButton = styled.button`
  ${LabelStyles}
  flex: 0 1 100%;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
  border: none;
  &:hover {
    background: #ccd1e0;
  }
`
