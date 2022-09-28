import { Card, H5, Spacer, Input, Checkbox, Box } from '../../common'
import { CardField } from './elements'
import { FIELD_TYPES, FIELD_CATEGORIES } from '../../../store/help/constants'

const CommonDetails = ({ data, isRead, onChange }) => {
  return (
    <Card>
      <H5>Параметри земельної ділянки:</H5>
      <Spacer vertical size="20px" />
      <CardField
        isRead={isRead}
        label="Кадастровий номер"
        value={data.cadastr}
        editableSlot={
          <Input
            value={data.cadastr}
            onChange={(value) => onChange('cadastr', value)}
          />
        }
      />
      <Spacer vertical size="20px" />
      <CardField
        isRead={isRead}
        label="Площа"
        value={data.size + ' га'}
        editableSlot={
          <Input
            value={data.size}
            onChange={(value) => onChange('size', value)}
            rightSlot="га"
          />
        }
      />
      <Spacer vertical size="20px" />
      <CardField
        isRead={isRead}
        label="Розташування"
        value={data.location}
        editableSlot={
          <Input
            value={data.location}
            onChange={(value) => onChange('location', value)}
          />
        }
      />

      {!isRead && (
        <>
          <Spacer vertical size="20px" />
          <CardField
            isRead={isRead}
            label="Тип земельної ділянки"
            value={data.type && FIELD_TYPES[data.type]}
            editableSlot={
              <Box gap="20px" wrap="true">
                {Object.keys(FIELD_TYPES).map((type) => (
                  <Checkbox
                    key={type}
                    label={FIELD_TYPES[type]}
                    value={data.type === type}
                    onChange={() => onChange('type', type)}
                  />
                ))}
              </Box>
            }
          />
          <Spacer vertical size="20px" />
          <CardField
            isRead={isRead}
            label="Клас земельної ділянки"
            value={data.category && FIELD_CATEGORIES[data.category]}
            editableSlot={
              <Box gap="20px" wrap="true">
                {Object.keys(FIELD_CATEGORIES).map((category) => (
                  <Checkbox
                    key={category}
                    label={FIELD_CATEGORIES[category]}
                    value={data.category === category}
                    onChange={() => onChange('category', category)}
                  />
                ))}
              </Box>
            }
          />
          {/* <Box gap="20px" wrap="true">
            <Checkbox label="Орендовані земельні ділянки" />
            <Checkbox label="Ризикові земельні ділянки" />
          </Box> */}
          {/* <Spacer vertical size="30px" /> */}
          {/* <H5>Клас земельної ділянки</H5>
          <Spacer vertical size="20px" />
          <Box gap="20px" wrap="true">
            <Checkbox label="Вільні ділянки" />
            <Checkbox label="Засаджені ділянки" />
            <Checkbox label="Викорчувані ділянки" />
          </Box> */}
        </>
      )}
    </Card>
  )
}

export default CommonDetails
